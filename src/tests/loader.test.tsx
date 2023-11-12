// @vitest-environment jsdom

import { it, expect } from 'vitest';

import { render } from '@testing-library/react';
import Loader from '../components/app/loader/Loader';

it('Should display loader', () => {
  const { container } = render(<Loader />);
  const loader = container.getElementsByClassName('loader');
  expect(loader.length).toBe(1);
});
