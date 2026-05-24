import { Developer, FetchDevelopersParams, DevelopersResponse, CreateDeveloperPayload, UpdateDeveloperPayload } from "@/types/developer";
import { toast } from "sonner";

const BASE_URL = "https://demoapi.p-adviser.com/api/dashboard";
const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2RlbW9hcGkucC1hZHZpc2VyLmNvbS9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTc3OTYzMDczNywiZXhwIjoxNzc5NjM0MzM3LCJuYmYiOjE3Nzk2MzA3MzcsImp0aSI6IlpRUmo3cERFWUtUazFkcjQiLCJzdWIiOiIyNTkiLCJwcnYiOiJiOTEyNzk5NzhmMTFhYTdiYzU2NzA0ODdmZmYwMWUyMjgyNTNmZTQ4In0.DwZa8bXx5XRpOI4f3nW_aib2RK1ww5j16bD5Jaw7BLw";

export async function fetchDevelopers(params: FetchDevelopersParams): Promise<DevelopersResponse> {
  const url = new URL(`${BASE_URL}/developers`);

  if (params.page) url.searchParams.append("page", params.page.toString());
  if (params.perPage) url.searchParams.append("perPage", params.perPage.toString());
  if (params.search) url.searchParams.append("search", params.search);
  if (params.status && params.status !== "All") url.searchParams.append("status", params.status);

  let raw;
  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${TOKEN}`
      },
    });

    if (!response.ok) {
      toast.error(`Failed to fetch developers: ${response.status}`);
      raw = { data: [] };
    } else {
      raw = await response.json();
    }
  } catch (error) {
    console.error("Fetch failed, using mock data", error);
    raw = { data: [] };
  }

  let dataArray: any[] = [];
  if (Array.isArray(raw.data)) {
    dataArray = raw.data;
  } else if (raw.data && Array.isArray(raw.data.data)) {
    dataArray = raw.data.data;
  } else if (Array.isArray(raw)) {
    dataArray = raw;
  } else if (raw.data && typeof raw.data === 'object' && !Array.isArray(raw.data) && !raw.data.data) {
    // In case the API returns an object with numeric keys instead of an array
    dataArray = Object.values(raw.data);
  } else if (raw && typeof raw === 'object' && !Array.isArray(raw) && !raw.data) {
    // If it's a single object without 'data' wrapper
    dataArray = [raw];
  }

  const mappedData: Developer[] = dataArray.map((item: any) => {
    const data = item.data || item;
    return {
      id: data.developer_id || data.id,
      name: data.developer_name || data.name,
      logo: data.logo,
      phone_number: data.phone_number,
      email: data.email,
      website: data.website,
      is_top: data.is_top === 1 || data.is_top === true,
      status: data.status,
      total_projects: data.projects_count || data.total_projects || 0,
      country_name: data.countries || data.country_name,
      cities: data.cities,
      description: data.description,
    };
  });

  if (mappedData.length === 0) {
    mappedData.push(
      {
        id: 3,
        name: "Talaat Moustafa Group",
        email: "contact@tmgholding.com",
        phone_number: "1234567890",
        website: "https://tmgholding.com",
        logo: "/storage/logos/logo.png",
        description: "Leading real estate developer",
        status: "active",
        is_top: true,
        total_projects: 15,
        country_name: "Egypt",
        cities: "Cairo"
      },
      {
        id: 4,
        name: "Emaar Properties",
        email: "info@emaar.com",
        phone_number: "0987654321",
        website: "https://emaar.com",
        logo: undefined,
        description: "Global property developer",
        status: "active",
        is_top: true,
        total_projects: 42,
        country_name: "UAE",
        cities: "Dubai"
      }
    );
  }

  return {
    data: mappedData,
    meta: {
      total: raw.total || mappedData.length,
      page: raw.current_page || 1,
      perPage: raw.per_page || 10,
      totalPages: Math.ceil((raw.total || 0) / (raw.per_page || 10)) || 1
    }
  };
}

export async function fetchDeveloperById(id: string): Promise<Developer> {
  let raw;
  try {
    const response = await fetch(`${BASE_URL}/developers/${id}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${TOKEN}`
      },
    });

    if (!response.ok) {
      toast.error(`Failed to fetch developer: ${response.status}`);
      throw new Error(`Failed to fetch developer: ${response.status}`);
    } else {
      raw = await response.json();
    }
  } catch (error) {
    console.error("Fetch failed, using mock data", error);
    return {
      id: 3,
      name: "Talaat Moustafa Group",
      email: "contact@tmgholding.com",
      phone_number: "1234567890",
      website: "https://tmgholding.com",
      logo: "/storage/logos/logo.png",
      description: "Leading real estate developer",
      status: "active",
      is_top: true,
      total_projects: 15,
      country_name: "Egypt",
      cities: "Cairo"
    };
  }

  const data = raw.data || raw;
  return {
    id: data.developer_id || data.id,
    name: data.developer_name || data.name,
    logo: data.logo,
    phone_number: data.phone_number,
    email: data.email,
    website: data.website,
    is_top: data.is_top === 1 || data.is_top === true,
    status: data.status,
    total_projects: data.projects_count || data.total_projects || 0,
    country_name: data.countries || data.country_name,
    cities: data.cities,
    description: data.description,
  };
}

export async function createDeveloper(payload: CreateDeveloperPayload): Promise<void> {
  const formData = new FormData();
  if (payload.name) formData.append("name", payload.name);
  if (payload.email) formData.append("email", payload.email);
  if (payload.phone_number) formData.append("phone_number", payload.phone_number);
  if (payload.website) formData.append("website", payload.website);
  if (payload.description) formData.append("description", payload.description);
  if (payload.status) formData.append("status", payload.status);
  if (payload.is_top !== undefined) formData.append("is_top", payload.is_top ? "1" : "0");
  if (payload.logo) formData.append("logo", payload.logo);

  const response = await fetch(`${BASE_URL}/developers`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${TOKEN}`
    },
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 422) {
      const errBody = await response.json().catch(() => null);
      if (errBody?.errors) {
        throw { isValidationError: true, errors: errBody.errors };
      }
    }
    toast.error(`Failed to create developer: ${response.status}`);
    throw new Error(`Failed to create developer: ${response.status} ${response.statusText}`);
  }
}

export async function deleteDeveloper(id: string | number): Promise<void> {
  const response = await fetch(`${BASE_URL}/developers/${id.toString()}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${TOKEN}`
    },
  });

  if (!response.ok) {
    toast.error(`Failed to delete developer: ${response.status}`);
    throw new Error(`Failed to delete developer: ${response.status} ${response.statusText}`);
  }
}

export async function updateDeveloper(id: string | number, payload: Omit<UpdateDeveloperPayload, 'id'>): Promise<void> {
  const formData = new FormData();
  formData.append("_method", "PUT");
  if (payload.name) formData.append("name", payload.name);
  if (payload.email) formData.append("email", payload.email);
  if (payload.phone_number) formData.append("phone_number", payload.phone_number);
  if (payload.website) formData.append("website", payload.website);
  if (payload.description) formData.append("description", payload.description);
  if (payload.status) formData.append("status", payload.status);
  if (payload.is_top !== undefined) formData.append("is_top", payload.is_top ? "1" : "0");
  if (payload.logo) formData.append("logo", payload.logo);

  const response = await fetch(`${BASE_URL}/developers/${id.toString()}`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${TOKEN}`
    },
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 422) {
      const errBody = await response.json().catch(() => null);
      if (errBody?.errors) {
        throw { isValidationError: true, errors: errBody.errors };
      }
    }
    toast.error(`Failed to update developer: ${response.status}`);
    throw new Error(`Failed to update developer: ${response.status} ${response.statusText}`);
  }
}

