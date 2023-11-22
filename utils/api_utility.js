import axios from 'axios';
import qs from 'qs';
import { getToken } from './tokenStorage';
import { API_URL } from '@env';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  },
  transformRequest: [(data, headers) => {
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      return qs.stringify(data);
    }
    return JSON.stringify(data);  // default behavior
  }],
});

export const getUserDetails = async () => {
  const token = await getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  try {
    const response = await axios.get(API_URL + '/user/me', config);
    return response.data.data[0];
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const getVehicles = async () => {
  const token = await getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  try {
    const response = await axios.get(API_URL + '/vehicle', config);
    return response.data.data[0];
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
};

export const getVehicleDetails = async (vehicleId) => {
  const token = await getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  try {
    const response = await axios.get(API_URL + `/vehicle/${vehicleId}`, config);
    return response.data.data[0];
  } catch (error) {
    console.error('Error fetching vehicle details:', error);
    throw error;
  }
};

export const getRecommendations = async () => {
  const token = await getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  try {
    const response = await axios.get(API_URL + '/recommendation/', config);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};

export const getRedeemableItems = async () => {
  const token = await getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  try {
    const response = await axios.get(API_URL + '/redeemable/', config);
    return response.data.data[0]; // Getting the first array from data
  } catch (error) {
    console.error('Error fetching redeemable items:', error);
    throw error;
  }
};

export const getRedeemedItems = async (userId) => {
  const token = await getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  try {
    const response = await axios.get(`${API_URL}/redemption_history/?user_id=${userId}`, config);
    return response.data.data[0];
  } catch (error) {
    console.error('Error fetching redeemed items:', error);
    throw error;
  }
};

export const updateUserOnServer = async (userId, userData) => {
  const token = await getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  };
  try {
    const response = await axios.put(API_URL + `/user/${userId}`, userData, config);
    return response.data;
  } catch (error) {
    console.error('Error updating user details:', error);
    throw error;
  }
};

export const getRides = async (userId) => {
  const token = await getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  try {
    const response = await axios.get(API_URL + `/ride/?user_id=${userId}`, config);
    return response.data.data[0];
  } catch (error) {
    console.error('Error fetching rides:', error);
    throw error;
  }
};

export const redeemItem = async (payload) => {
  const token = await getToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  try {
    const response = await axios.post(API_URL + '/redemption_history/', payload, config);
    return response.data;
  } catch (error) {
    console.error('Error redeeming item:', error);
    throw error;
  }
};
