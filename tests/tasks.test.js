const request = require('supertest');
const app = require('../src/app');
const store = require('../src/store');

beforeEach(() => {
  store.users = [];
  store.tasks = [];
});

describe('User registration', () => {
  test('registers a new user successfully', async () => {
    const res = await request(app).post('/api/users/register').send({
      name: 'Alice',
      email: 'alice@example.com',
      password: 'secret123',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe('alice@example.com');
  });

  test('rejects duplicate email', async () => {
    await request(app).post('/api/users/register').send({
      name: 'Alice',
      email: 'alice@example.com',
      password: 'secret123',
    });
    const res = await request(app).post('/api/users/register').send({
      name: 'Alice2',
      email: 'alice@example.com',
      password: 'secret456',
    });
    expect(res.statusCode).toBe(409);
  });
});

describe('Task creation', () => {
  let token;

  beforeEach(async () => {
    await request(app).post('/api/users/register').send({
      name: 'Bob',
      email: 'bob@example.com',
      password: 'pass123',
    });
    const res = await request(app).post('/api/users/login').send({
      email: 'bob@example.com',
      password: 'pass123',
    });
    token = res.body.token;
  });

  test('creates a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Buy groceries' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Buy groceries');
    expect(res.body.completed).toBe(false);
  });

  test('rejects task creation without title', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ description: 'No title here' });

    expect(res.statusCode).toBe(400);
  });
});