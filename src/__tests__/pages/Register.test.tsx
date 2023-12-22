import { test } from '@jest/globals';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../../pages/Register';

describe('<Register />', () => {
  test('Should render register page properly', () => {
    const { container } = render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );
    expect(container.firstChild).toHaveClass('register-root');
  });
});
