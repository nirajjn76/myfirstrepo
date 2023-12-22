import { test, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddPort from '../../pages/AddPort';

describe('<AddPort />', () => {
  test('Should render add port page properly', () => {
    const { container } = render(
      <MemoryRouter>
        <AddPort />
      </MemoryRouter>,
    );
    expect(container.firstChild).toHaveClass('add-port-root');
  });
});
