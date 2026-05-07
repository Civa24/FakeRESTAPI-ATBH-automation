import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { getUsers, getUserById, createUser } from '../api/api.js';
import { logResponse } from '../utils/logger.js';

test.describe('Users API tests', () => {
  test('GET all users', async () => {
    const response = await getUsers();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('GET user by valid ID', async ({}, testInfo) => {
    const response = await getUserById(1);

    logResponse(testInfo.title, response);

    expect(response.status).toBe(200);
    expect(response.data.id).toBe(1);
  });

  test('POST user with valid data', async ({}, testInfo) => {
    const user = {
      id: faker.number.int({ min: 500, max: 10000 }),
      userName: faker.internet.username(),
      password: faker.internet.password(),
    };

    const response = await createUser(user);

    logResponse(testInfo.title, response);

    expect(response.status).toBe(200);
    expect(response.data.userName).toBe(user.userName);
  });

  test.afterEach(async ({}, testInfo) => {
    console.log(`Finished "${testInfo.title}" with status: ${testInfo.status}`);
  });
});