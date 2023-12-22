import { test } from '@jest/globals';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../pages/Login';

describe('<Login />', () => {
  test('Should render login page properly', () => {
    const { container } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    expect(container.firstChild).toHaveClass('login-root');
  });
});
