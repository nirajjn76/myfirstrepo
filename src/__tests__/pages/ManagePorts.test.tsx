import { test, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ManagePorts from '../../pages/ManagePorts';

describe('<AddBandwidth />', () => {
  test('Should render Manage Ports page properly', () => {
    const { container } = render(
      <MemoryRouter>
        <ManagePorts />
      </MemoryRouter>,
    );
    expect(container);
  });
});
