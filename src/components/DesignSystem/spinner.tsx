import React from 'react';
import clsx from 'clsx';
import { CircularProgress } from '@material-ui/core';

interface SpinnerProps {
  size: number;
  color?: string;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size, color, className }) => {
  return (
    <CircularProgress className={clsx('d-spinner', color, className)} size={size} data-testid="spinner" />
  );
};

export default Spinner;
