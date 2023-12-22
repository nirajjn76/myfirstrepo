import React from 'react';
import { describe, test, jest } from '@jest/globals';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import FormIndex from '../../../components/Login';
import { LoginFieldsMapping } from '../../../utils/appConstants';

jest.mock('../../../services/auth.service');

describe('<LoginFormIndex />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should render form index with login page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FormIndex />
      </MemoryRouter>,
    );

    expect(getByText('Welcome to WaveXchange')).toBeInTheDocument();
  });

  test('Should call on change function on change of userId input', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { getByTestId } = render(
      <MemoryRouter>
        <FormIndex />
      </MemoryRouter>,
    );

    const input = getByTestId(`input-${LoginFieldsMapping.userId}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(setState).toHaveBeenCalled();
  });

  test('Should call on change function on change of password input', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { getByTestId } = render(
      <MemoryRouter>
        <FormIndex />
      </MemoryRouter>,
    );

    const input = getByTestId(`input-${LoginFieldsMapping.password}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(setState).toHaveBeenCalled();
  });
});
