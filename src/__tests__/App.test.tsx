import { describe, test } from '@jest/globals';
import { render } from '@testing-library/react';
import App from '../App';

describe('<App />', () => {
  test.skip('Should render app component properly', () => {
    const { getByText } = render(<App />);
    expect(getByText('Welcome to WaveXchange')).toBeInTheDocument();
  });
});
