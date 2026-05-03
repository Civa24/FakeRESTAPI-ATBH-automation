import axios from 'axios';

const baseURL = 'https://fakerestapi.azurewebsites.net/api/v1';

const api = axios.create({
  baseURL
});


// --------------- AUTHORS ------------------

export const getAuthors = () => api.get('/Authors');

export const getAuthorById = (id) => api.get(`/Authors/${id}`);

export const createAuthor = (data) => api.post('/Authors', data);

export const getAuthorsByBookId = (idBook) => api.get(`/Authors/authors/books/${idBook}`);


// --------------- BOOKS ------------------

export const getBooks = () => api.get('/Books');

export const getBookById = (id) => api.get(`/Books/${id}`);

export const createBook = (data) => api.post('/Books', data);

export const updateBook = (id, data) =>  api.put(`/Books/${id}`, data);

export const deleteBook = (id) =>  api.delete(`/Books/${id}`);