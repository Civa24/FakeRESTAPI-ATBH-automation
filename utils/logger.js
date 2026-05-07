export const logResponse = (testName, response) => {
  console.log(`Test: ${testName}`);
  console.log(`Status: ${response.status}`);
  console.log('Response data:', response.data);
};