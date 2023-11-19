// @vitest-environment jsdom
// import '@testing-library/jest-dom/vitest';

import { it, expect, describe } from 'vitest';

import { render, screen } from '@testing-library/react';
import Card from './Card';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const { name, status, imageUrl, id } = {
  name: 'super wizard',
  status: 'alive',
  imageUrl:
    'https://static.wikia.nocookie.net/harrypotter/images/9/97/Harry_Potter.jpg',
  id: 'unique-id',
};

describe('Card component', () => {
  it('Should display character name', () => {
    render(
      <BrowserRouter>
        <Card name={name} status={status} imageUrl={imageUrl} id={id} />
      </BrowserRouter>
    );
    expect(screen.getByText(/super wizard/)).toBeInTheDocument;
  });
  it('Should display character status', () => {
    render(
      <BrowserRouter>
        <Card name={name} status={status} imageUrl={imageUrl} id={id} />
      </BrowserRouter>
    );

    expect(screen.getByText(/alive/)).toBeInTheDocument;
  });
  it('Should display character image', () => {
    render(
      <BrowserRouter>
        <Card name={name} status={status} imageUrl={imageUrl} id={id} />
      </BrowserRouter>
    );

    const image = screen.getByRole<HTMLImageElement>('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(imageUrl);
    expect(image.alt).toBe(name + '-image');
    expect(image).toBeInTheDocument();
  });

  it('Should change URL on click', async () => {
    const location = { ...window.location };

    const { container } = render(
      <BrowserRouter>
        <Card name={name} status={status} imageUrl={imageUrl} id={id} />
      </BrowserRouter>
    );

    const [card] = container.getElementsByClassName('card');
    await userEvent.click(card);
    expect(location.href).not.toEqual(window.location.href);
  });
});
