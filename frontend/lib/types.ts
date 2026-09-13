export interface Being {
  id: number;
  title: string;
  element: string;
}

export interface Municipality {
  id: string;
  title: string;
  type: string;
}

export interface MunicipalityGroup {
  region: Municipality;
  municipalities: Municipality[];
}

export interface Observation {
  id: number;
  beingId: number;
  date: string;
  municipalityId: string;
  habitat?: string;
  behaviour?: string;
  image?: string;
  being?: Being;
  municipality?: Municipality;
}

export interface NewObservation {
  beingId: number;
  date: Date;
  municipalityId: string;
  habitat?: string;
  behaviour?: string;
  image?: string;
}

export interface ObservationsResponse {
  observations: Observation[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
