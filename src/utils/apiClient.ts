import axios from 'axios';
import config from '../config';

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
});

export const apiClient = {
  get: async (endpoint: string, params = {}) => {
    const response = await axios.get(`${config.API_DATABASE_URL}${endpoint}`, {
      headers: getAuthHeader(),
      params,
    });
    return response.data;
  },

  post: async (endpoint: string, data = {}) => {
    const response = await axios.post(`${config.API_DATABASE_URL}${endpoint}`, data, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  put: async (endpoint: string, data = {}) => {
    const response = await axios.put(`${config.API_DATABASE_URL}${endpoint}`, data, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  delete: async (endpoint: string, params = {}) => {
    const response = await axios.delete(`${config.API_DATABASE_URL}${endpoint}`, {
      headers: getAuthHeader(),
      data: params
    });
    return response.data;
  },
};

export const todoApi = {
  getTodos: () => apiClient.get('/read', { tableName: 'todos' }),
  
  createTodo: (todo: any) => 
    apiClient.post('/insert', {
      tableName: 'todos',
      records: [todo]
    }),
    
  updateTodo: (id: string, updates: any) => 
    apiClient.put('/update', {
      tableName: 'todos',
      idColumn: '_id',
      idValue: id,
      updates: updates
    }),
    
  deleteTodo: (id: string) => 
    apiClient.delete('/delete', {
      tableName: 'todos',
      idColumn: '_id',
      idValue: id
    })
};
