import React, { useCallback } from 'react';
import Input from '../DesignSystem/input';
import Dropdown from '../DesignSystem/dropdown';

interface PortInfoFormProps {
  portInfo: any;
  portTypeOptions: any[];
  onPortTypeChange: (portTempId: number, portTypeId: number) => void;
  onPortNameChange: (portTempId: number, portName: string) => void;
  onKeypress: (_: any) => void;
}

const PortInfoForm: React.FC<PortInfoFormProps> = ({
  portInfo, portTypeOptions, onPortTypeChange, onPortNameChange, onKeypress,
}) => {
  const handlePortTypeChange = useCallback((value: any) => {
    onPortTypeChange(portInfo.id, parseInt(value));
  }, [portInfo, onPortTypeChange]);

  const handlePortNameChange = useCallback((e: any) => {
    onPortNameChange(portInfo.id, e.target.value);
  }, [portInfo, onPortNameChange]);

  return (
    <div className="port-info-root">
      <div className="left">
        <Input variant="input" name={portInfo.portName} className="port-name" value={portInfo.portName} onChange={handlePortNameChange} onKeypress={onKeypress} />
      </div>
      <div className="right">
        <Input variant="number" name="port-tx" defaultValue={portInfo.rx} disabled className="disabled-rx-tx" />
        <Input variant="number" name="port-rx" defaultValue={portInfo.tx} disabled className="disabled-rx-tx" />
        <Dropdown className="ne-select" value={portInfo.portTypeId || portTypeOptions[0]?.id} valueKey="id" textKey="port_type" icon="icon" options={portTypeOptions} onChange={handlePortTypeChange} />
      </div>
    </div>
  );
};

export default PortInfoForm;
