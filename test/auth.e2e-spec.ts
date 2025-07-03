/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ProfileResponseDto } from 'src/modules/auth/dtos/profile.dto';
import * as supertest from 'supertest';
import { JwtResponseDto } from '../src/modules/auth/dtos/jwt-response.dto';
import { app } from './jest.setup';

describe('Authentication & Authorization', () => {
  let jwt = '';

  const mocks = {
    password: 'Nurbek2004!',
    email: 'john.doe@inbox.com',
  };

  it('POST /api/auth/sign-in: failure', async () => {
    const res = await supertest(app.getHttpServer())
      .post('/api/auth/sign-in')
      .send({ email: mocks.email, password: mocks.password })
      .then((res) => res.body as never);

    expect(res).toMatchObject({
      message: expect.any(String),
      timestamp: expect.any(String),
      statusCode: expect.any(Number),
    });
  });

  it('POST /api/auth/sign-up: sucess', async () => {
    const res = await supertest(app.getHttpServer())
      .post('/api/auth/sign-up')
      .send(mocks)
      .then((res) => res.body as JwtResponseDto);

    expect(res).toMatchObject({ access_token: expect.any(String) });
  });

  it('POST /api/auth/sign-up: failure', async () => {
    const res = await supertest(app.getHttpServer())
      .post('/api/auth/sign-up')
      .send(mocks)
      .then((res) => res.body as never);

    expect(res).toMatchObject({
      error: expect.any(String),
      message: expect.any(String),
      statusCode: expect.any(Number),
      timestamp: expect.any(String),
    });
  });

  it('POST /api/auth/sign-in: sucess', async () => {
    const res = await supertest(app.getHttpServer())
      .post('/api/auth/sign-in')
      .send({ email: mocks.email, password: mocks.password })
      .then((res) => res.body as JwtResponseDto);

    expect(res).toMatchObject({ access_token: expect.any(String) });
    jwt = res.access_token;
  });

  it('GET /api/auth/me: sucess', async () => {
    const res = await supertest(app.getHttpServer())
      .get('/api/auth/me')
      .auth(jwt, { type: 'bearer' })
      .then((res) => res.body as ProfileResponseDto);

    expect(res).toMatchObject({
      email: mocks.email,
      holdings: [],
    });
  });

  it('GET /api/auth/me: failure', async () => {
    const res = await supertest(app.getHttpServer())
      .get('/api/auth/me')
      .then((res) => res.body as never);

    expect(res).toMatchObject({
      message: expect.any(String),
      statusCode: expect.any(Number),
      timestamp: expect.any(String),
    });
  });
});
