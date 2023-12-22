import { describe, test } from '@jest/globals';
import { render } from '@testing-library/react';
import Button from '../../../components/DesignSystem/button';

describe('<Button />', () => {
  test('Should render button with given text', () => {
    const { getByText } = render(<Button variant="primary" text="Add" loading={false} />);
    expect(getByText('Add')).toBeInTheDocument();
  });

  test('Should render button with loading class', () => {
    const { container } = render(<Button variant="primary" text="Add" loading />);
    expect(container.firstChild).toHaveClass('loading');
  });
});
