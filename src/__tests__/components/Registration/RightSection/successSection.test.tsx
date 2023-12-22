import { describe, test } from '@jest/globals';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import SuccessSection from '../../../../components/Registration/RightSection/successSection';

describe('<SuccessSection />', () => {
  test('Should render success section successfully', () => {
    const { getByText } = render(
      <MemoryRouter>
        <SuccessSection />
      </MemoryRouter>,
    );

    expect(getByText('Thank you for your Registration with us.')).toBeInTheDocument();
  });
});
