import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './src/tests/mocks/node';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
