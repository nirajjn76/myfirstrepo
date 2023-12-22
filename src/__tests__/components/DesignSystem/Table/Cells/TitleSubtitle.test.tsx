import { test, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import TitleSubtitle, { TitleSubtitleProps } from '../../../../../components/DesignSystem/Table/Cells/TitleSubtitle';

describe('<TitleSubtitle />', () => {
  test('Should render title subtitle component', () => {
    const props: TitleSubtitleProps = {
      align: 'left',
      width: '10vw',
      maxWidth: '10vw',
      title: '3',
      subTitle: 'Month',
    };
    const { getByTestId } = render(<TitleSubtitle {...props} />);

    expect(getByTestId('title')).toBeInTheDocument();
    expect(getByTestId('sub-title')).toBeInTheDocument();
  });

  test('Should render subtitle with proper class', async () => {
    const props: TitleSubtitleProps = {
      align: 'left',
      width: '10vw',
      maxWidth: '10vw',
      title: '3',
      subTitle: 'Month',
      boldTitle: true,
    };
    const { container } = render(<TitleSubtitle {...props} />);

    expect(container.getElementsByClassName('subtitle').length).toBe(1);
  });
});
