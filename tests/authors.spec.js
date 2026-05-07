import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { getAuthors, getAuthorById, createAuthor, getAuthorsByBookId } from '../api/api.js';
import { logResponse } from '../utils/logger.js';

test.describe('Authors API tests', () => {
  
  test('GET all authors', async () => {
    const response = await getAuthors();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('GET author by valid ID', async ({}, testInfo) => {
    const response = await getAuthorById(1);

    logResponse(testInfo.title, response);

    expect(response.status).toBe(200);
    expect(response.data.id).toBe(1);
  });

  test('POST author with valid data', async ({}, testInfo) => {
    const author = {
      id: faker.number.int({ min: 500, max: 10000 }),
      idBook: 10,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };

    const response = await createAuthor(author);

    logResponse(testInfo.title, response);

    expect(response.status).toBe(200);
    expect(response.data.firstName).toBe(author.firstName);
    expect(response.data.lastName).toBe(author.lastName);
  });

  test('GET authors by book ID', async ({}, testInfo) => {
    const bookId = 10;
    const response = await getAuthorsByBookId(bookId);

    logResponse(testInfo.title, response);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);

    response.data.forEach((author) => {
      expect(author.idBook).toBe(bookId);
    });
  });

  test('BUG - author should not accept missing lastName', async ({}, testInfo) => {
    const invalidAuthor = {
      id: faker.number.int({ min: 600, max: 10000 }),
      idBook: 10,
      firstName: faker.person.firstName(),
    };

    const response = await createAuthor(invalidAuthor);

    logResponse(testInfo.title, response);

    expect(response.status).toBe(400);
  });

  test.afterEach(async ({}, testInfo) => {
    console.log(`Finished "${testInfo.title}" with status: ${testInfo.status}`);
  });
});