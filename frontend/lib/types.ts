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

export interface Observation {
  id: number;
  beingId: number;
  date: string;
  municipalityId: string;
  amount?: number;
  habitat?: string;
  behaviour?: string;
  being?: Being;
  municipality?: Municipality;
}

export interface ObservationsResponse {
  observations: Observation[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
