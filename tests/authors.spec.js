import { test, expect } from '@playwright/test';
import { getAuthors, getAuthorById, createAuthor, getAuthorsByBookId } from '../api/api.js';
import { logResponse } from '../utils/logger.js';

test.describe('Authors API tests', () => {

  test('GET all authors', async () => {
    const response = await getAuthors();

    //logResponse(response);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('GET author by valid ID', async () => {
    const response = await getAuthorById(1);

    logResponse(response);

    expect(response.status).toBe(200);
    expect(response.data.id).toBe(1);
  });

  test('POST author with valid data', async () => {
    const response = await createAuthor({
      id: 101,
      idBook: 10,
      firstName: 'Amer',
      lastName: 'Civic',
    });

    logResponse(response);

    expect(response.status).toBe(200);
    expect(response.data.firstName).toBe('Amer');
    expect(response.data.lastName).toBe('Civic');
  });

  test('GET authors by book ID', async () => {
    const response = await getAuthorsByBookId(10);

    logResponse(response);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);

    response.data.forEach((author) => {
      expect(author.idBook).toBe(10);
    });
  });
 test('BUG - author should not accept missing lastName', async () => {
  const response = await createAuthor({
    id: 12345,
    idBook: 10,
    firstName: 'Test'
    // lastName empty
  });

  logResponse(response);

  expect(response.status).toBe(400);
});
});