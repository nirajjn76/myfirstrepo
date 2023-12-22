import React from 'react';
import clsx from 'clsx';

interface TextareaProps {
  value: string;
  name: string;
  rows?: number;
  cols?: number;
  className?: string;
  errorMessage?: string;
  defaultValue?: any;
  disabled?: boolean;
  onChange?: (_: any) => void;
  onKeypress?: (_: any) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  value, name, rows, cols, className, errorMessage, defaultValue, disabled, onChange, onKeypress,
}) => {
  return (
    <div className="d-textarea">
      <textarea
        className={clsx('input', className, errorMessage && 'error', disabled && 'disabled')}
        value={value}
        onChange={onChange}
        onKeyPress={() => {}}
        rows={rows}
        cols={cols}
        name={name}
        disabled={disabled}
        defaultValue={defaultValue}
        data-testid={`text-area-${name}-${value}`}
      />
      {errorMessage && <label className="d-error">{errorMessage}</label>}
    </div>

  );
};

export default Textarea;
