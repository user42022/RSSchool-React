// @vitest-environment jsdom

import { it, expect, describe } from 'vitest';

import {  render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { setupStore } from '../../store/store';
import { Provider } from 'react-redux';

import { charactersSlice } from '../../store/reducers/CharactersSlice';
import SearchForm from './SearchForm';

describe('Search form pagination component', () => {
  it('Should navigate to the first page on change page size', async () => {
    window.location.search = '?pageNumber=4&characterName=some-name';
    const store = setupStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchForm />
        </BrowserRouter>
      </Provider>
    );

    const pageSizeInput = screen.getByPlaceholderText(/pageSize/);
    await userEvent.type(pageSizeInput, '1');
    const params = new URL(window.location.href);
    expect(params.searchParams.get('pageNumber')).toBe('1');
  });
  it('Should navigate to the next page on click "Next"', async () => {
    window.location.search = '?pageNumber=4&characterName=some-name';
    const store = setupStore();
    const { actions } = charactersSlice;
    store.dispatch(actions.updateFromURL({ pageNumber: '4' }));
    store.dispatch(
      actions.updateCharacters({
        data: [],
        meta: {
          pagination: {
            current: 4,
            records: 100,
          },
        },
      })
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchForm />
        </BrowserRouter>
      </Provider>
    );

    const nextPageButton = screen.getByText(/Next/);
    await userEvent.click(nextPageButton);
    const params = new URL(window.location.href);

    expect(params.searchParams.get('pageNumber')).toBe('5');
  });
  it('Should be disabled "Next" button when the current page is the last', () => {
    window.location.search = '?pageNumber=4&characterName=some-name';
    const store = setupStore();
    const { actions } = charactersSlice;
    store.dispatch(actions.updateFromURL({ pageNumber: '4' }));
    store.dispatch(
      actions.updateCharacters({
        data: [],
        meta: {
          pagination: {
            current: 4,
            records: 40,
          },
        },
      })
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchForm />
        </BrowserRouter>
      </Provider>
    );

    const nextPageButton = screen.getByText(/Next/);
    expect(nextPageButton).toBeDisabled();
  });

  it('Should navigate to the prev page on click "Prev"', async () => {
    window.location.search = '?pageNumber=4&characterName=some-name';
    const store = setupStore();
    const { actions } = charactersSlice;
    store.dispatch(actions.updateFromURL({ pageNumber: '4' }));
    store.dispatch(
      actions.updateCharacters({
        data: [],
        meta: {
          pagination: {
            current: 4,
            records: 100,
          },
        },
      })
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchForm />
        </BrowserRouter>
      </Provider>
    );

    const prevPageButton = screen.getByText(/Prev/);
    await userEvent.click(prevPageButton);
    const params = new URL(window.location.href);

    expect(params.searchParams.get('pageNumber')).toBe('3');
  });
  it('Should be disabled "Prev" button when the current page is the first', () => {
    window.location.search = '?pageNumber=1&characterName=some-name';
    const store = setupStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchForm />
        </BrowserRouter>
      </Provider>
    );

    const prevPageButton = screen.getByText(/Prev/);
    expect(prevPageButton).toBeDisabled();
  });
});
