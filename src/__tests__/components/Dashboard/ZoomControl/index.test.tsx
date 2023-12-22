import { describe, test, jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import ZoomControl from '../../../../components/Dashboard/ZoomControl';

describe('<ZoomControl />', () => {
  test('Should render zoom control properly', () => {
    const onRangeChange = jest.fn();
    const { getByTestId } = render(<ZoomControl scale={2} onRangeChange={onRangeChange} />);

    expect(getByTestId('range-slider')).toBeInTheDocument();
  });

  test('Should call range change function on zoom in click', () => {
    const onRangeChange = jest.fn();
    const { getByTestId } = render(<ZoomControl scale={2} onRangeChange={onRangeChange} />);

    const zoomInBtn = getByTestId('zoom-in');

    fireEvent.click(zoomInBtn);

    expect(onRangeChange).toHaveBeenCalled();
  });

  test('Should call range change function on zoom out click', () => {
    const onRangeChange = jest.fn();
    const { getByTestId } = render(<ZoomControl scale={2} onRangeChange={onRangeChange} />);

    const zoomInBtn = getByTestId('zoom-out');

    fireEvent.click(zoomInBtn);

    expect(onRangeChange).toHaveBeenCalled();
  });
});
