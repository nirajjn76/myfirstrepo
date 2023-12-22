import React from 'react';
import clsx from 'clsx';
import Spinner from './spinner';

interface ButtonProps {
  variant: 'primary' | 'success' | 'search' | 'greyed' | 'grouped';
  text: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  spinnerSize?: number;
  onClick?: (_: any) => void;
}

const Button: React.FC<ButtonProps> = ({
  variant, text, type, className, disabled, loading, spinnerSize, onClick,
}) => {
  return (
    <button className={clsx('d-btn', className && className, variant, disabled && 'disabled', loading && 'loading')} type={type} onClick={onClick} disabled={disabled} data-testid={`btn-${text.toLowerCase()}`}>{loading ? <Spinner size={spinnerSize || 30} /> : text}</button>
  );
};

export default Button;
