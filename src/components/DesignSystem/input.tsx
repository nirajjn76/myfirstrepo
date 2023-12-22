import React, { useCallback, useState } from 'react';
import { Tooltip } from '@material-ui/core';
import clsx from 'clsx';
import NoShowEye from '../../assets/images/no-show-eye.svg';
import ShowEye from '../../assets/images/show-eye.svg';
import RightGreenCheckMark from '../../assets/images/right-green-check-mark.svg';
import { ArrayOfCharactersNotAllowedInNumericField } from '../../utils/appConstants';

interface InputProps {
  variant: 'input' | 'password' | 'input-pre-icon' | 'input-post-icon' | 'number' ;
  name: string;
  className?: string;
  icon?: any;
  placeholder?: string;
  type?: string;
  checkmark?: boolean;
  error?: boolean;
  errorMessage?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  value?: any;
  autofocus?: boolean;
  defaultValue?: any;
  errorMessageClass?: string;
  tooltipTitle?: string;
  onWheel?: (_:any) => void;
  onChange?: (_: any) => void;
  onBlur?: (_: any) => void;
  onKeypress?: (_: any) => void;
  onKeyDown?: (_: any) => void;
}

const Input: React.FC<InputProps> = ({
  variant, placeholder, className, type, name, autofocus, icon, checkmark, error, errorMessage, min, max, disabled, value, defaultValue, errorMessageClass, tooltipTitle, onChange, onBlur, onKeypress, onKeyDown, onWheel,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleEyeClick = useCallback(() => {
    setShowPassword((prevState) => !prevState);
  }, [setShowPassword]);

  if (variant === 'input') {
    return (
      <>
        <input className={clsx('d-input', error && 'd-input-error', className, disabled && 'disabled')} disabled={disabled} type={type} placeholder={placeholder} defaultValue={defaultValue} name={name} value={value} onChange={onChange} onBlur={onBlur} data-testid={`input-${name}`} onKeyPress={onKeypress} autoFocus={autofocus} />
        {errorMessage && <label className={clsx('d-error', errorMessageClass)}>{errorMessage}</label>}
      </>
    );
  }

  if (variant === 'number') {
    return (
      <>
        <input className={clsx('d-input', error && 'd-input-error', className, disabled && 'disabled')} disabled={disabled} type="number" defaultValue={defaultValue} value={value} min={min} max={max} placeholder={placeholder} name={name} onChange={onChange} onBlur={onBlur} data-testid={`input-${name}`} onKeyPress={onKeypress} onKeyDown={(e) => ArrayOfCharactersNotAllowedInNumericField.includes(e.key) && e.preventDefault()} />
        {errorMessage && <label className={clsx('d-error', errorMessageClass)} data-testid={`input-error-${name}`}>{errorMessage}</label>}
      </>
    );
  }

  if (variant === 'password') {
    return (
      <>
        <div className="d-input-password-root">
          <div className={clsx('d-input-password', checkmark && 'd-input-checkmark', error && 'd-input-error')}>
            <input type={showPassword ? 'text' : 'password'} className={clsx(className)} placeholder={placeholder} name={name} onChange={onChange} onBlur={onBlur} data-testid={`input-${name}`} onKeyPress={onKeypress} />
            <img src={showPassword ? ShowEye : NoShowEye} alt="Eye" onClick={handleEyeClick} data-testid="eye-img" />
          </div>
          {checkmark && <img className="d-checkmark" src={RightGreenCheckMark} alt="Check Mark" />}
        </div>
        {errorMessage && <label className={clsx('d-error', errorMessageClass)}>{errorMessage}</label>}
      </>
    );
  }

  if (variant === 'input-pre-icon') {
    return (
      <>
        <div className={clsx('d-input-pre-icon-root', disabled && 'disabled')}>
          <Tooltip
            title={tooltipTitle || ''}
            placement="right"
            classes={{
              tooltip: 'tooltip',
            }}
            arrow
          >
            <img src={icon} alt="Input icon" />
          </Tooltip>
          <input type={type || 'text'} className={clsx(className, disabled && 'disabled')} disabled={disabled} value={value} placeholder={placeholder} name={name} onChange={onChange} onBlur={onBlur} data-testid={`input-${name}`} onWheel={onWheel} onKeyPress={onKeypress} onKeyDown={onKeyDown} />
        </div>
        {errorMessage && <label className={clsx('d-error', errorMessageClass)}>{errorMessage}</label>}
      </>
    );
  }
  if (variant === 'input-post-icon') {
    return (
      <>
        <div className={clsx('d-input-pre-icon-root', disabled && 'disabled')}>
          <input type={type || 'text'} className={clsx(className, disabled && 'disabled')} disabled={disabled} value={value} placeholder={placeholder} name={name} onChange={onChange} onBlur={onBlur} data-testid={`input-${name}`} onWheel={onWheel} onKeyPress={onKeypress} onKeyDown={onKeyDown} />
          <Tooltip
            title={tooltipTitle || ''}
            placement="right"
            classes={{
              tooltip: 'tooltip',
            }}
            arrow
          >
            <img src={icon} alt="Input icon" />
          </Tooltip>
        </div>
        {errorMessage && <label className={clsx('d-error', errorMessageClass)}>{errorMessage}</label>}
      </>
    );
  }

  return null;
};

export default Input;
