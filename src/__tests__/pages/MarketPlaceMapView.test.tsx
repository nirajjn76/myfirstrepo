import { test } from '@jest/globals';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MarketPlaceMapView from '../../pages/MarketPlaceMapView';

jest.mock('cesium', () => {
  return {
    OpenStreetMapImageryProvider: jest.fn(),
    Cartesian3: {
      fromDegrees: jest.fn(),
    },
  };
});
jest.mock('resium', () => () => <div />);

describe('<MarketPlaceMapView />', () => {
  test('Should render market place map page properly', () => {
    const div = document.createElement('div');
    const { container } = render(
      <MemoryRouter>
        <div>
          <MarketPlaceMapView />
        </div>
      </MemoryRouter>,
    );
    expect(container.firstChild).toHaveClass('mapview-marketplace-root');
  });
});
