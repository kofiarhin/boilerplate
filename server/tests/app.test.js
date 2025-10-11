const request = require('supertest');
const app = require('../app');

describe('App routes', () => {
  it('returns welcome payload for root route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: { message: 'hello world' },
      error: null,
    });
  });

  it('returns ok payload for health route', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: { message: 'ok' },
      error: null,
    });
  });

  it('allows access to profile route with requireAuth stub', async () => {
    const response = await request(app).get('/profile');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user).toEqual({
      id: 'local-user',
      email: 'user@example.com',
    });
    expect(response.body.error).toBeNull();
  });
});
