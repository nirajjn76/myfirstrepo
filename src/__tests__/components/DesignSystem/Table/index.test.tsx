import { test, describe, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import {
  TableRow, TableCell, TableBody,
} from '@material-ui/core';
import Table, { TableMainProps } from '../../../../components/DesignSystem/Table';
import { SortOrder } from '../../../../enums';

describe('<Table />', () => {
  test('Should render table component', () => {
    const props: TableMainProps = {
      rows: (
        <TableBody>
          <TableRow>
            <TableCell width="5vw"><div>abcd</div></TableCell>
          </TableRow>
        </TableBody>
      ),
      order: SortOrder.asc,
      orderBy: 'ab',
      rowCount: 12,
      headCells: [{
        id: 'organization',
        align: 'left',
        disablePadding: false,
        sortEnabled: true,
        label: 'Organization',
        width: '10vw',
      }],
      onRequestSort: jest.fn(),
      numSelected: 1,
      onSelectAllClick: jest.fn(),
      rowSelectionAvailable: true,
      totalPages: 2,
      page: 1,
      onPageChange: jest.fn(),
    };
    const { getByTestId } = render(<Table {...props} />);

    expect(getByTestId('table')).toBeInTheDocument();
  });
});
