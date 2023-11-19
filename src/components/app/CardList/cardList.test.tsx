// @vitest-environment jsdom

import { it, expect, describe } from 'vitest';

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { setupStore } from '../../store/store';
import { Provider } from 'react-redux';
import CardList from './CardList';
import { charactersSlice } from '../../store/reducers/CharactersSlice';
import { createCharacterFromParams } from '../../../tests/mocks/characters';

describe('Card list component', () => {
  it('Should return "Results not found" message if store doesnt contain characters', () => {
    const store = setupStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CardList />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/Results not found/)).toBeInTheDocument();
  });

  it('Should display characters from store', () => {
    const store = setupStore();
    const { actions } = charactersSlice;
    store.dispatch(
      actions.updateCharacters({
        data: Array(5)
          .fill({ 'filter[name_cont]': 'initial-value' })
          .map(createCharacterFromParams),
        meta: {
          pagination: {
            current: 0,
            records: 0,
          },
        },
      })
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CardList />
        </BrowserRouter>
      </Provider>
    );

    const cards = screen.getAllByText(/name-initial-value/);
    expect(cards.length).toBe(5);
  });

  it('Should update characters with provided query from store', async () => {
    const store = setupStore();
    const { actions } = charactersSlice;
    store.dispatch(
      actions.updateCharacters({
        data: Array(5)
          .fill({ 'filter[name_cont]': 'initial-value' })
          .map(createCharacterFromParams),
        meta: {
          pagination: {
            current: 0,
            records: 0,
          },
        },
      })
    );
    store.dispatch(actions.updateFromURL({ characterName: 'updated-value' }));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CardList />
        </BrowserRouter>
      </Provider>
    );

    const cards = await screen.findAllByText(/name-updated-value/);
    expect(cards.length).toBe(10);
  });

  it('Should update characters with provided query from store', async () => {
    const store = setupStore();
    const { actions } = charactersSlice;
    store.dispatch(
      actions.updateCharacters({
        data: Array(5)
          .fill({ 'filter[name_cont]': 'initial-value' })
          .map(createCharacterFromParams),
        meta: {
          pagination: {
            current: 0,
            records: 0,
          },
        },
      })
    );
    store.dispatch(actions.updateFromURL({ characterName: 'updated-value' }));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CardList />
        </BrowserRouter>
      </Provider>
    );

    const cards = await screen.findAllByText(/name-updated-value/);
    expect(cards.length).toBe(10);
  });

  it('Should display loader when IsLoadingCharacters indicator is truthy', () => {
    const store = setupStore();
    const { actions } = charactersSlice;
    store.dispatch(actions.updateIsLoadingCharacters(true));

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CardList />
        </BrowserRouter>
      </Provider>
    );

    const [loader] = container.getElementsByClassName('loader');
    expect(loader).toBeInTheDocument();
  });

  it('Should not display loader when IsLoadingCharacters indicator is falsy', async () => {
    const store = setupStore();
    const { actions } = charactersSlice;
    store.dispatch(actions.updateIsLoadingCharacters(false));

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CardList />
        </BrowserRouter>
      </Provider>
    );
    const [cardList] = container.getElementsByClassName('card-list');
    await userEvent.click(cardList);
    expect(window.location.search).toBe('');
  });
});
