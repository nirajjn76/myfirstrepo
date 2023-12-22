import { test, describe } from '@jest/globals';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BottomSection from '../../../../components/Layout/BottomSection';
import UserVerification from '../../../../pages/UserVerification';

describe('<BottomSection />', () => {
  test('Should render bottom section', () => {
    const { getByTestId, getByText } = render(
      <BottomSection>
        <UserVerification />
      </BottomSection>,
    );

    expect(getByTestId('bottom-main')).toBeInTheDocument();
    expect(getByTestId('collapsed-sidebar')).toBeInTheDocument();
    expect(getByText('New User Validation')).toBeInTheDocument();
  });

  test('Should render bottom section with expanded sidebar on hover', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <BottomSection>
          <UserVerification />
        </BottomSection>
      </MemoryRouter>,
    );

    await waitFor(() => {
      const sidebar = getByTestId('sidebar-main');
      fireEvent.mouseOver(sidebar);

      expect(getByTestId('expanded-sidebar')).toBeInTheDocument();
    });
  });
});
