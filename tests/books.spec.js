import { test, expect } from '@playwright/test';
import { getBooks, getBookById, createBook, updateBook, deleteBook } from '../api/api.js';
import { logResponse } from '../utils/logger.js';

test.describe('Books API tests', () => {

test('GET all books', async () => {
  const response = await getBooks();


      logResponse(response);
  expect(response.status).toBe(200);
  expect(Array.isArray(response.data)).toBe(true);
});

test('GET book by valid ID', async () => {
  const response = await getBookById(1);

    //logResponse(response);
  expect(response.status).toBe(200);
  expect(response.data.id).toBe(1);
});

test('POST book with valid data', async () => {
  const response = await createBook({
    id: 101,
    title: 'API Testing Book',
    description: 'Book created with Axios by Amerko',
    pageCount: 120,
    excerpt: 'Test excerpt',
    publishDate: '2026-04-27T23:00:00',
  });

    logResponse(response);
  expect(response.status).toBe(200);
  expect(response.data.title).toBe('API Testing Book');
  expect(response.data.pageCount).toBe(120);
});

test('PUT book update', async () => {
  const response = await updateBook(17, {
    id: 17,
    title: 'Updated Book by Amerko',
    description: 'Better version of yourself',
    pageCount: 200,
    excerpt: 'Updated excerpt',
    publishDate: '2026-04-28T09:01:36Z'
  });

    logResponse(response);
  expect(response.status).toBe(200);
  expect(response.data.title).toBe('Updated Book by Amerko');
});

test('DELETE book', async () => {
  const response = await deleteBook(17);

    logResponse(response);
  expect([200, 204]).toContain(response.status);
});

test('BUG - book should not accept negative pageCount', async () => {
  const response = await createBook({
    id: Math.floor(Math.random() * 100000),
    title: 'Invalid Book',
    description: 'Test',
    pageCount: -50, // cannot be negative
    excerpt: 'Test excerpt',
    publishDate: new Date().toISOString(),
  });

  logResponse(response);

  expect(response.status).toBe(400); 
});
});