import React, { useCallback } from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import clsx from 'clsx';

interface DropdownProps {
  className?: string;
  value: any;
  options: any[];
  valueKey: string;
  textKey: string;
  icon: any;
  disabled?: boolean;
  onChange?: (value: any) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  className, value, valueKey, textKey, icon, options, disabled, onChange,
}) => {
  let dropdownValue;
  if (!value) {
    dropdownValue = '';
  } else if (typeof value === 'object') {
    dropdownValue = value[valueKey];
  } else {
    dropdownValue = value;
  }

  const handleChange = useCallback((e: any) => {
    onChange && onChange(e.target.value);
  }, [onChange]);

  return (
    <div className="d-dropdown">
      <FormControl classes={{
        root: clsx(className, disabled && 'disabled'),
      }}
      >
        <Select
          value={dropdownValue}
          onChange={handleChange}
          inputProps={{
            'data-testid': 'select-input',
          }}
          disabled={disabled}
        >
          {
            options.map((option: any, index: number) => {
              return (
                <MenuItem key={index} value={option[valueKey]}>
                  {
                    option[icon] && <img src={option[icon]} className="icon_option" alt={option[textKey]} />
                  }
                  {option[textKey]}
                </MenuItem>
              );
            })
          }
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;
