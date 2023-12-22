import { test } from '@jest/globals';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WXPay from '../../pages/WXPay';

describe('<WXPay />', () => {
  test('Should render wx pay page properly', () => {
    const { container } = render(
      <MemoryRouter>
        <WXPay />
      </MemoryRouter>,
    );
    expect(container.firstChild).toHaveClass('wx-pay-root');
  });
});
