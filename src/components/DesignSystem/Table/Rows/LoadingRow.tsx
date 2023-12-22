import React from 'react';
import {
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import Spinner from '../../spinner';

interface LoadingRowProps {
  colSpan: number;
}

const LoadingRow: React.FC<LoadingRowProps> = ({ colSpan }) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell className="loading-row" colSpan={colSpan}>
          <Spinner size={30} />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default LoadingRow;
