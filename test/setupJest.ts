/* eslint-disable jest/require-top-level-describe */

import {mockServer} from '../src/mocks/server';

// eslint-disable-next-line no-process-env
process.env = {
  ...process.env, // eslint-disable-line no-process-env
  NEXT_PUBLIC_API_MOCKING_ENABLED: '1',
  NEXT_PUBLIC_GRAPHQL_ENDPOINT: 'http://localhost:4000/graphql',
};

beforeAll(() => mockServer.listen());

afterEach(() => mockServer.resetHandlers());

afterAll(() => mockServer.close());
