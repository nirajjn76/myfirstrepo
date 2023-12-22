import React from 'react';
import {
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';

interface EmptyRowProps {
  text: string;
  colSpan: number;
}

const EmptyRow: React.FC<EmptyRowProps> = ({ text, colSpan }) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell className="empty-row" colSpan={colSpan}>
          <div>{text}</div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default EmptyRow;
