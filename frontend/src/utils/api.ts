interface ApiError extends Error {
  status?: number;
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error: ApiError = new Error('API request failed');
    error.status = response.status;
    try {
      const errorData = await response.json();
      error.message = errorData.detail || 'Что-то пошло не так';
    } catch {
      error.message = 'Ошибка сервера';
    }
    throw error;
  }
  return response.json();
};

export const api = {
  async getOffers() {
    const response = await fetch('/offers');
    return handleResponse(response);
  },

  async getOfferById(id: number) {
    const response = await fetch(`/offers/${id}`);
    return handleResponse(response);
  },

  async filterOffers(params: any) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`/offers/filter?${queryString}`);
    return handleResponse(response);
  },

  async createOffer(data: any) {
    const response = await fetch('/offers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  async updateOffer(id: number, data: any) {
    const response = await fetch(`/offers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  async deleteOffer(id: number) {
    const response = await fetch(`/offers/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
}; 