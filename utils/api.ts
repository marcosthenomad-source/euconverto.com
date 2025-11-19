import { projectId, publicAnonKey } from './supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-12d56551`;

// Helper to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

// Helper to make authenticated requests
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : `Bearer ${publicAnonKey}`,
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP error ${response.status}`);
  }

  return response.json();
}

// ==================== AUTH ====================

export const auth = {
  async signup(email: string, password: string, name: string, plan: string = 'starter') {
    const response = await fetchWithAuth('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, plan }),
    });
    return response;
  },

  async signin(email: string, password: string) {
    const response = await fetchWithAuth('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.success && response.accessToken) {
      localStorage.setItem('access_token', response.accessToken);
      localStorage.setItem('user_id', response.userId);
    }
    
    return response;
  },

  signout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
  },

  isAuthenticated() {
    return !!getAuthToken();
  },

  getUserId() {
    return localStorage.getItem('user_id');
  }
};

// ==================== USER ====================

export const user = {
  async getProfile() {
    return fetchWithAuth('/user');
  }
};

// ==================== ASSISTANT ====================

export const assistant = {
  async get() {
    return fetchWithAuth('/assistant');
  },

  async update(config: any) {
    return fetchWithAuth('/assistant', {
      method: 'PUT',
      body: JSON.stringify(config),
    });
  }
};

// ==================== LEADS ====================

export const leads = {
  async getAll() {
    return fetchWithAuth('/leads');
  },

  async create(data: { clientId: string; name: string; email: string; phone: string; service: string }) {
    return fetchWithAuth('/leads', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(leadId: string, data: any) {
    return fetchWithAuth(`/leads/${leadId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete(leadId: string) {
    return fetchWithAuth(`/leads/${leadId}`, {
      method: 'DELETE',
    });
  }
};

// ==================== EVENTS ====================

export const events = {
  async getAll() {
    return fetchWithAuth('/events');
  },

  async create(data: any) {
    return fetchWithAuth('/events', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(eventId: string, data: any) {
    return fetchWithAuth(`/events/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete(eventId: string) {
    return fetchWithAuth(`/events/${eventId}`, {
      method: 'DELETE',
    });
  }
};

// ==================== TAGS ====================

export const tags = {
  async getAll() {
    return fetchWithAuth('/tags');
  },

  async create(data: { name: string; color: string }) {
    return fetchWithAuth('/tags', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
};

// ==================== FEEDBACK ====================

export const feedback = {
  async send(data: { type: string; title: string; message: string }) {
    return fetchWithAuth('/feedback', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
};