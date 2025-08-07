import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

class NotesService {
  async getAllNotes() {
    try {
      const response = await axios.get(`${API_BASE_URL}/notes`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getNoteById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/notes/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createNote(noteData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/notes`, noteData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateNote(id, noteData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/notes/${id}`, noteData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteNote(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/notes/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      // Server responded with error status
      return new Error(error.response.data.message || 'Server error occurred');
    } else if (error.request) {
      // Request was made but no response received
      return new Error('Unable to connect to server. Please check if the backend is running.');
    } else {
      // Something else happened
      return new Error('An unexpected error occurred');
    }
  }
}

export default new NotesService();