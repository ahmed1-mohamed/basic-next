export interface Developer {
  id: string | number;
  name: string;
  email?: string;
  phone_number?: string;
  website?: string;
  logo?: string;
  description?: string;
  status?: string;
  is_top?: boolean;
  total_projects?: number;
  country_name?: string;
  cities?: string;
}

export interface DevelopersResponse {
  data: Developer[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

export interface FetchDevelopersParams {
  page?: number;
  perPage?: number;
  search?: string;
  status?: string;
}

export interface CreateDeveloperPayload {
  name: string;
  email?: string;
  phone_number?: string;
  website?: string;
  description?: string;
  status?: string;
  is_top?: boolean;
  logo?: File | string | null;
}

export interface UpdateDeveloperPayload extends Partial<CreateDeveloperPayload> {
  id: string | number;
}
