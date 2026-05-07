import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { getCoverPhotos, getCoverPhotoById, createCoverPhoto } from '../api/api.js';
import { logResponse } from '../utils/logger.js';

test.describe('Cover Photos API tests', () => {
  test('GET all cover photos', async () => {
    const response = await getCoverPhotos();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('GET cover photo by valid ID', async ({}, testInfo) => {
    const response = await getCoverPhotoById(1);

    logResponse(testInfo.title, response);

    expect(response.status).toBe(200);
    expect(response.data.id).toBe(1);
  });

  test('POST cover photo with valid data', async ({}, testInfo) => {
    const coverPhoto = {
      id: faker.number.int({ min: 500, max: 10000 }),
      idBook: 1,
      url: faker.image.url(),
    };

    const response = await createCoverPhoto(coverPhoto);

    logResponse(testInfo.title, response);

    expect(response.status).toBe(200);
    expect(response.data.idBook).toBe(coverPhoto.idBook);
    expect(response.data.url).toBe(coverPhoto.url);
  });

  test.afterEach(async ({}, testInfo) => {
    console.log(`Finished "${testInfo.title}" with status: ${testInfo.status}`);
  });
});