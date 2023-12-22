import { test, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddBandwidth from '../../pages/AddBandwidth';

describe('<AddBandwidth />', () => {
  test('Should render add bandwidth page properly', () => {
    const { container } = render(
      <MemoryRouter>
        <AddBandwidth />
      </MemoryRouter>,
    );
    expect(container.firstChild).toHaveClass('add-bandwidth-root');
  });
});
