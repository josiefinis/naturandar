const url = require("url");

module.exports = (req, res, next) => {
    // if the request method is POST
    if (req.method === 'POST') {
        const requiredFields = ['title', 'date', 'municipalityId'];
        const missingFields = requiredFields.filter(field => !req.body || !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: `Missing required fields: ${missingFields.join(', ')}`
            });
        }


        // add meta data to the request/new post
        const now = new Date().toISOString();
        req.body.meta = {
            ...req.body.meta,
            createdAt: now,
            updatedAt: now,
        };

        // Generate ID and SKU
        const fs = require('fs');
        const path = require('path');
        const dbPath = path.join(__dirname, 'observations.json');
        const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        const { observations } = dbData;

        // Generate ID
        const lastId = observations.length > 0 ? Math.max(...observations.map(p => p.id)) : 0;
        const newId = lastId + 1;
        req.body.id = newId;


    }

    // we override the res.send() method to add some pagination logic to the response
    const _send = res.send;
    res.send = function (data) {
        // only do this if we use GET and the status code is 200, that is if the response is successful
        if (req.method === "GET" && res.statusCode === 200 && req.url.includes('observations')) {
            try {
                // we use the JSON.parse() method to parse the data from the response
                const parsedData = JSON.parse(data);

                // we check if the parsed data is an array (to avoid pagination on non-array data)
                if (Array.isArray(parsedData)) {
                    const query = url.parse(req.url, true).query;
                    const totalCountHeader = this.getHeader("X-Total-Count");

                    // we use the parseInt() method to parse the total count header and add this, limit and page to the data
                    const total = totalCountHeader ? parseInt(totalCountHeader, 10) : parsedData.length;
                    const limit = query._limit ? parseInt(query._limit, 10) : 0;
                    const page = query._page ? parseInt(query._page, 10) : 1;

                    // total divided by the requested limit or 1
                    const pages = limit > 0 ? Math.ceil(total / limit) : 1;

                    // we use the JSON.stringify() method to convert the data to a string again and return it
                    data = JSON.stringify({
                        observations: parsedData,
                        total,
                        limit,
                        page,
                        pages
                    });
                }
            } catch (e) {
                // fail silently = just ignore the whole thing and just return the original data
            }
        }

        _send.call(this, data);
    };

    next();
};
