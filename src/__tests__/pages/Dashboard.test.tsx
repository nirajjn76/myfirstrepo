import { test } from '@jest/globals';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';

describe('<Dashboard />', () => {
  test('Should render dashboard page properly', () => {
    const { container } = render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );
    expect(container.firstChild).toHaveClass('dashboard-root');
  });
});
