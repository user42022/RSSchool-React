import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './src/tests/mocks/node';
import '@testing-library/jest-dom/vitest';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
