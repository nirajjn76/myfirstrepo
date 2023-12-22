import { describe, test } from '@jest/globals';
import { render } from '@testing-library/react';
import VerifiedBandwidthsPortRow from '../../../../components/AdminValidations/BandwidthPorts/VerifiedBandwidthsPortRow';

describe('<VerifiedBandwidthsPortRow />', () => {
  test('Should render verified ports row properly without verified on', () => {
    const bandwidthPort = {
      created_at: '2021-12-29T13:46:48.000Z',
      fport_name: 'One Wilshire Port chetan3',
      nport_name: 'Westin Building Port chetan5',
      fdescription: 'abcd',
      ndescription: 'abcd',
      nne_name: 'Westin Building',
      fne_name: 'One Wilshire',
      organization_name: 'zymr',
      nposition_in: 2,
      fpostion_in: 2,
      f_port_id: 7,
      n_port_id: 6,
      fverified: 0,
      nverified: 1,
      verified_by: null,
      verified_on: null,
      first_name: 'chetan',
      last_name: 'pawar',
      nverified_by: 'chetan',
      fverified_by: 'chetan',
      nverified_on: '2021-12-30T08:27:14.000Z',
      fverified_on: null,
    };
    const { getByText } = render(<VerifiedBandwidthsPortRow bandwidthPort={bandwidthPort} />);

    expect(getByText('-')).toBeInTheDocument();
  });

  test('Should render verified ports row properly without verified by', () => {
    const bandwidthPort = {
      created_at: '2021-12-29T13:46:48.000Z',
      fport_name: 'One Wilshire Port chetan3',
      nport_name: 'Westin Building Port chetan5',
      fdescription: 'abcd',
      ndescription: 'abcd',
      nne_name: 'Westin Building',
      fne_name: 'One Wilshire',
      organization_name: 'zymr',
      nposition_in: 2,
      fpostion_in: 2,
      f_port_id: 7,
      n_port_id: 6,
      fverified: 0,
      nverified: 1,
      verified_by: null,
      verified_on: null,
      first_name: 'chetan',
      last_name: 'pawar',
      nverified_by: null,
      fverified_by: 'null',
      nverified_on: '2021-12-30T08:27:14.000Z',
      fverified_on: 'null',
    };
    const { getByText } = render(<VerifiedBandwidthsPortRow bandwidthPort={bandwidthPort} />);

    expect(getByText('-')).toBeInTheDocument();
  });

  test('Should render verified ports row properly without port description', () => {
    const bandwidthPort = {
      created_at: '2021-12-29T13:46:48.000Z',
      fport_name: 'One Wilshire Port chetan3',
      nport_name: 'Westin Building Port chetan5',
      fdescription: '',
      ndescription: 'abcd',
      nne_name: 'Westin Building',
      fne_name: 'One Wilshire',
      organization_name: 'zymr',
      nposition_in: 2,
      fpostion_in: 2,
      f_port_id: 7,
      n_port_id: 6,
      fverified: 0,
      nverified: 1,
      verified_by: null,
      verified_on: null,
      first_name: 'chetan',
      last_name: 'pawar',
      nverified_by: 'null',
      fverified_by: 'null',
      nverified_on: '2021-12-30T08:27:14.000Z',
      fverified_on: 'null',
    };
    const { getByText } = render(<VerifiedBandwidthsPortRow bandwidthPort={bandwidthPort} />);

    expect(getByText('-')).toBeInTheDocument();
  });
});
