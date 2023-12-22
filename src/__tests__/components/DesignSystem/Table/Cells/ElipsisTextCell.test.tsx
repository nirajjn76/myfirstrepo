import { test, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import ElipsisTextCell, { ElipsisTextProps } from '../../../../../components/DesignSystem/Table/Cells/ElipsisTextCell';

describe('<ElipsisTextCell />', () => {
  test('Should render elipsis text with elipsis class', () => {
    const props: ElipsisTextProps = {
      align: 'left',
      width: '10vw',
      className: 'abcd',
      text: 'abcd',
    };
    const { container } = render(<ElipsisTextCell {...props} />);

    expect(container.getElementsByClassName('elipsis').length).toBe(1);
  });
});
