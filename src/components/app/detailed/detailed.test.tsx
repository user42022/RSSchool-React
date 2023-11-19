// @vitest-environment jsdom

import { it, expect, describe } from 'vitest';

import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { setupStore } from '../../store/store';
import { Provider } from 'react-redux';
import Detailed from './Detailed';
import { charactersSlice } from '../../store/reducers/CharactersSlice';
import { createCharacterFromParams } from '../../../tests/mocks/characters';

describe('Detailed component', () => {
  it('Should display character detailed info from store', () => {
    const store = setupStore();
    const { actions } = charactersSlice;
    store.dispatch(
      actions.updateDetailedInfo(createCharacterFromParams('mocked-id'))
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Detailed />
        </BrowserRouter>
      </Provider>
    );

    const name = screen.getByText(/name-mocked-id/);
    const born = screen.getByText(/born-mocked-id/);
    const died = screen.getByText(/died-mocked-id/);
    const bloodStatus = screen.getByText(/blood_status-mocked-id/);
    const jobs = screen.getByText(/jobs-mocked-id/);
    const aliasNames = screen.getByText(/alias_names-mocked-id/);
    const image = screen.getByAltText(/name-mocked-id-image/);

    [name, born, died, bloodStatus, jobs, aliasNames, image].forEach(
      (element) => expect(element).toBeInTheDocument()
    );
  });

  it('Should update characters with provided id from store', async () => {
    const store = setupStore();
    const { actions } = charactersSlice;
    store.dispatch(
      actions.updateDetailedInfo(createCharacterFromParams('mocked-id'))
    );
    store.dispatch(actions.updateFromURL({ detailedId: 'updated-id' }));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Detailed />
        </BrowserRouter>
      </Provider>
    );

    const name = await screen.findByText(/name-updated-id/);
    const born = await screen.findByText(/born-updated-id/);
    const died = await screen.findByText(/died-updated-id/);
    const bloodStatus = await screen.findByText(/blood_status-updated-id/);
    const jobs = await screen.findByText(/jobs-updated-id/);
    const aliasNames = await screen.findByText(/alias_names-updated-id/);
    const image = await screen.findByAltText(/name-updated-id-image/);

    [name, born, died, bloodStatus, jobs, aliasNames, image].forEach(
      (element) => expect(element).toBeInTheDocument()
    );
  });

  it('Should display loader when isLoadingDetailedInfo indicator is truthy', () => {
    const store = setupStore();
    const { actions } = charactersSlice;
    store.dispatch(actions.updateIsLoadingDetailedInfo(true));

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Detailed />
        </BrowserRouter>
      </Provider>
    );

    const [loader] = container.getElementsByClassName('loader');
    expect(loader).toBeInTheDocument();
  });

  it('Should not display loader when isLoadingDetailedInfo indicator is falsy', async () => {
    const store = setupStore();
    const { actions } = charactersSlice;
    store.dispatch(actions.updateIsLoadingDetailedInfo(false));

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Detailed />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(store.getState().charactersReducer.isDetailedInfoLoading).toBe(
        false
      )
    );
    expect(container.getElementsByClassName('loader').length).toEqual(0);
  });

  it('Should delete detailedId in search params and navigate to new route on close button', async () => {
    window.location.search = '?detailedId=some-id';
    const store = setupStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Detailed />
        </BrowserRouter>
      </Provider>
    );
    const closebutton = screen.getByText('close');
    await userEvent.click(closebutton);
    expect(window.location.search).toBe('');
  });
});
