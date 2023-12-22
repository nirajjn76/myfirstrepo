import React, { useCallback } from 'react';
import FormFieldBox from '../../../DesignSystem/formFieldBox';
import Input from '../../../DesignSystem/input';
import Dropdown from '../../../DesignSystem/dropdown';

interface PortProps {
  port: any
  portTypeOptions: any[];
  disabled?: boolean;
  onPortTypeChange: (portTempId: number, portTypeId: number) => void;
  onPortNameChange: (portTempId: number, portName: string) => void;
  onKeypress: (_: any) => void;
}

const Port: React.FC<PortProps> = ({
  port, portTypeOptions, disabled, onPortTypeChange, onPortNameChange, onKeypress,
}) => {
  const handlePortTypeChange = useCallback((value: any) => {
    onPortTypeChange(port.id, parseInt(value));
  }, [port, onPortTypeChange]);

  const handlePortNameChange = useCallback((e: any) => {
    onPortNameChange(port.id, e.target.value);
  }, [port, onPortNameChange]);

  return (
    <div>
      <div>
        <FormFieldBox excludeMarginTop excludeMarginBottom>
          <Input variant="input" name={port.portName} className="port-name" value={port.portName} disabled={disabled} onChange={handlePortNameChange} onKeypress={onKeypress} />
        </FormFieldBox>
      </div>
      <div>
        <div>
          <FormFieldBox excludeMarginTop excludeMarginBottom>
            <Input variant="number" name="port-tx" defaultValue={port.rx} disabled className="disabled-rx-tx" />
          </FormFieldBox>
        </div>
        <div>
          <FormFieldBox excludeMarginTop excludeMarginBottom>
            <Input variant="number" name="port-tx" defaultValue={port.rx} disabled className="disabled-rx-tx" />
          </FormFieldBox>
        </div>
        <div>
          <Dropdown className="ne-select" disabled={disabled} icon="icon" value={port.portTypeId || portTypeOptions[0]?.id} valueKey="id" textKey="port_type" options={portTypeOptions} onChange={handlePortTypeChange} />
        </div>
      </div>
    </div>
  );
};

export default Port;
