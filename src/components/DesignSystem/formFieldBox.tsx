import React from 'react';
import clsx from 'clsx';

interface FieldBoxProps {
  excludeMarginBottom?: boolean;
  excludeMarginTop?: boolean;
  className?: string;
}

const FieldBox: React.FC<FieldBoxProps> = ({
  excludeMarginBottom, excludeMarginTop, className, children,
}) => {
  return (
    <div className={clsx('d-form-field', excludeMarginBottom && 'margin-bottom-none', excludeMarginTop && 'margin-top-none', className)}>
      {children}
    </div>
  );
};

export default FieldBox;
