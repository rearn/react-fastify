import app from '@backend/app';

test('2005', async () => {

  const response = await app.inject({
    method: 'GET',
    url: '/api2005'
  });
  expect(response.statusCode).toBe(200);
  expect(JSON.parse(response.body)).toMatchObject([
    { L: 10, H: 1 },
    { L: 10, H: 0 },
    { H: 1, L: 10 },
    { H: 2, L: 3 },
  ]);
});
