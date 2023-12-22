import { test, describe } from '@jest/globals';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import TopSection from '../../../../components/Layout/TopSection';
import { NonAuthRoutes } from '../../../../enums';

describe('<TopSection />', () => {
  test('Should render top section properly', () => {
    const { getByText } = render(
      <MemoryRouter>
        <TopSection name="Ankur" />
      </MemoryRouter>,
    );
    expect(getByText('Ankur')).toBeInTheDocument();
  });

  test('Should be able to click logout image', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <TopSection name="Ankur" />
      </BrowserRouter>,
    );

    fireEvent.click(getByTestId('img-logout'));

    const uname = localStorage.getItem('uname');
    expect(uname).toBeNull();

    await waitFor(() => {
      const { pathname } = window.location;

      expect(pathname).toEqual(NonAuthRoutes.login);
    });
  });
});
