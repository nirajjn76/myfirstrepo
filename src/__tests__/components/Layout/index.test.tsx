import { describe, test } from '@jest/globals';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../../../components/Layout';
import PortVerification from '../../../pages/PortVerification';

describe('<Layout />', () => {
  test('Should render layout properly', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Layout name="Ankur nariya">
          <PortVerification />
        </Layout>
      </MemoryRouter>,
    );

    expect(getByText('Ankur nariya')).toBeInTheDocument();
  });
});
