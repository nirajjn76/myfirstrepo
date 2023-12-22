import { test, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import ElipsisText, { ElipsisTextProps } from '../../../../../components/DesignSystem/Table/Cells/ElipsisText';

describe('<ElipsisText />', () => {
  test('Should render elipsis with elipsis class', () => {
    const props: ElipsisTextProps = {
      className: 'abcd',
      width: '10vw',
      text: 'abcd',
    };
    const { container } = render(<ElipsisText {...props} />);

    expect(container.getElementsByClassName('elipsis').length).toBe(1);
  });
});
