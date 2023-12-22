import React, { useCallback } from 'react';
import Dropdown from '../DesignSystem/dropdown';
import Input from '../DesignSystem/input';

interface NetworkElementInputRowProps {
  portInfo: any,
  portTypeOptions: any[];
  onPortTypeChange: (portTempId: number, portTypeId: number) => void;
  onPortNameChange: (portTempId: number, portName: string) => void;
  onKeypress: (_: any) => void;
}

const NetworkElementInputRow: React.FC<NetworkElementInputRowProps> = ({
  portInfo, portTypeOptions, onPortTypeChange, onPortNameChange, onKeypress,
}) => {
  const handlePortTypeChange = useCallback((value: any) => {
    onPortTypeChange(portInfo.id, parseInt(value));
  }, [portInfo, onPortTypeChange]);

  const handlePortNameChange = useCallback((e: any) => {
    onPortNameChange(portInfo.id, e.target.value);
  }, [portInfo, onPortNameChange]);

  return (
    <div className="input-row">
      <div>
        <div>
          <Input variant="input" name={portInfo?.portName} className="port-name" value={portInfo?.portName} onChange={handlePortNameChange} onKeypress={onKeypress} />
        </div>
      </div>
      <div>
        <div>
          <Input variant="number" name="port-rx" value={portInfo?.rx} disabled className="disabled-rx-tx" />
        </div>
        <div>
          <Input variant="number" name="port-tx" value={portInfo?.tx} disabled className="disabled-rx-tx" />
        </div>
        <div>
          <div>
            <Dropdown className="ne-select" icon="icon" value={portInfo?.portTypeId || portTypeOptions[0]?.id} valueKey="id" textKey="port_type" options={portTypeOptions} onChange={handlePortTypeChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkElementInputRow;
