import { test, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BottomSectionContent from '../../../../components/Layout/BottomSection/Content';
import UserVerification from '../../../../pages/UserVerification';

describe('<BottomSectionContent />', () => {
  test('Should render bottom section with content', () => {
    const { getByTestId, getByText } = render(
      <BottomSectionContent expanded>
        <MemoryRouter>
          <UserVerification />
        </MemoryRouter>
        ,
      </BottomSectionContent>,
    );

    expect(getByTestId('content-main')).toBeInTheDocument();
    expect(getByText('New User Validation')).toBeInTheDocument();
  });
});
