import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { getBooks, getBookById, createBook, updateBook, deleteBook } from '../api/api.js';
import { logResponse } from '../utils/logger.js';

test.describe('Books API tests', () => {
  
  test('GET all books', async () => {
    const response = await getBooks();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('GET book by valid ID', async () => {
    const response = await getBookById(1);

    expect(response.status).toBe(200);
    expect(response.data.id).toBe(1);
  });

  test('POST book with valid data', async ({}, testInfo) => {
    const book = {
      id: faker.number.int({ min: 500, max: 10000 }),
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      pageCount: faker.number.int({ min: 50, max: 500 }),
      excerpt: faker.lorem.paragraph(),
      publishDate: new Date().toISOString(),
    };

    const response = await createBook(book);

    logResponse(testInfo.title, response);

    expect(response.status).toBe(200);
    expect(response.data.title).toBe(book.title);
    expect(response.data.pageCount).toBe(book.pageCount);
  });

  test('PUT book update', async ({}, testInfo) => {
    const bookId = 17;

    const updatedBook = {
      id: bookId,
      title: faker.lorem.words(2),
      description: faker.lorem.sentence(),
      pageCount: faker.number.int({ min: 100, max: 500 }),
      excerpt: faker.lorem.paragraph(),
      publishDate: new Date().toISOString(),
    };

    const response = await updateBook(bookId, updatedBook);

    logResponse(testInfo.title, response);

    expect(response.status).toBe(200);
    expect(response.data.title).toBe(updatedBook.title);
  });

  test('DELETE book', async ({}, testInfo) => {
    const bookId = 17;
    const response = await deleteBook(bookId);

    logResponse(testInfo.title, response);

    expect([200, 204]).toContain(response.status);
  });

  test('BUG - book should not accept negative pageCount', async ({}, testInfo) => {
    const invalidBook = {
      id: faker.number.int({ min: 1, max: 100000 }),
      title: faker.lorem.words(2),
      description: faker.lorem.sentence(),
      pageCount: -50,
      excerpt: faker.lorem.paragraph(),
      publishDate: new Date().toISOString(),
    };

    const response = await createBook(invalidBook);

    logResponse(testInfo.title, response);

    expect(response.status).toBe(400);
  });

  test.afterEach(async ({}, testInfo) => {
    console.log(`Finished "${testInfo.title}" with status: ${testInfo.status}`);
  });
});