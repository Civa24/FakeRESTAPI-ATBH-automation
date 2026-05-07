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

// --------------- USERS ------------------

export const getUsers = () => api.get('/Users');

export const getUserById = (id) => api.get(`/Users/${id}`);

export const createUser = (data) => api.post('/Users', data);

// --------------- ACTIVITIES ------------------

export const getActivities = () => api.get('/Activities');

export const getActivityById = (id) => api.get(`/Activities/${id}`);

export const createActivity = (data) =>  api.post('/Activities', data);

// --------------- COVER PHOTOS ------------------

export const getCoverPhotos = () => api.get('/CoverPhotos');

export const getCoverPhotoById = (id) => api.get(`/CoverPhotos/${id}`);

export const createCoverPhoto = (data) => api.post('/CoverPhotos', data);