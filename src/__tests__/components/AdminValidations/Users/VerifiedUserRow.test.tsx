import { describe, test } from '@jest/globals';
import { render } from '@testing-library/react';
import { Roles } from '../../../../enums';
import VerifiedUserRow from '../../../../components/AdminValidations/Users/VerifiedUserRow';

describe('<VerifiedUserRow />', () => {
  test('Should render verified users row properly without verified on', () => {
    const user = {
      id: 1,
      created_at: new Date(),
      organization_name: 'zymr',
      first_name: 'Ankur',
      last_name: 'Nariya',
      username: 'ankur.n',
      role_name: Roles.admin,
      email: 'anknur.nariya@zymr.com',
      verified_by: 'Ankur Admin',
    };
    const { getByText } = render(<VerifiedUserRow user={user} />);

    expect(getByText('-')).toBeInTheDocument();
  });

  test('Should render verified users row properly without verified by', () => {
    const user = {
      id: 1,
      created_at: new Date(),
      organization_name: 'zymr',
      first_name: 'Ankur',
      last_name: 'Nariya',
      username: 'ankur.n',
      role_name: Roles.admin,
      email: 'anknur.nariya@zymr.com',
      verified_on: new Date(),
    };
    const { getByText } = render(<VerifiedUserRow user={user} />);

    expect(getByText('-')).toBeInTheDocument();
  });
});
