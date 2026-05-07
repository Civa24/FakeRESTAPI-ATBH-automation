import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { getActivities, getActivityById, createActivity } from '../api/api.js';
import { logResponse } from '../utils/logger.js';

test.describe('Activities API tests', () => {
  test('GET all activities', async () => {
    const response = await getActivities();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('GET activity by valid ID', async ({}, testInfo) => {
    const response = await getActivityById(1);

    logResponse(testInfo.title, response);

    expect(response.status).toBe(200);
    expect(response.data.id).toBe(1);
  });

  test('POST activity with valid data', async ({}, testInfo) => {
    const activity = {
      id: faker.number.int({ min: 500, max: 10000 }),
      title: faker.lorem.words(3),
      dueDate: new Date().toISOString(),
      completed: faker.datatype.boolean(),
    };

    const response = await createActivity(activity);

    logResponse(testInfo.title, response);

    expect(response.status).toBe(200);
    expect(response.data.title).toBe(activity.title);
    expect(response.data.completed).toBe(activity.completed);
  });

  test.afterEach(async ({}, testInfo) => {
    console.log(`Finished "${testInfo.title}" with status: ${testInfo.status}`);
  });
});