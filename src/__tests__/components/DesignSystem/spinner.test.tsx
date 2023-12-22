import { describe, test } from '@jest/globals';
import { render } from '@testing-library/react';
import Spinner from '../../../components/DesignSystem/spinner';

describe('<Spinner />', () => {
  test('Should render spinner with givern color class', () => {
    const { container } = render(<Spinner size={20} color="red" />);
    expect(container.firstChild).toHaveClass('red');
  });
});
