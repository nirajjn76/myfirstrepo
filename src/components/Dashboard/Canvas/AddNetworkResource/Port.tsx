import React, { useCallback } from 'react';
import Tooltip from '@mui/material/Tooltip';
import FormFieldBox from '../../../DesignSystem/formFieldBox';
import Input from '../../../DesignSystem/input';
import Dropdown from '../../../DesignSystem/dropdown';
import InfoIcon from '../../../../assets/images/info-icon.svg';

interface PortProps {
  port: any
  portTypeOptions: any[];
  onPortTypeChange: (portTempId: number, portTypeId: number) => void;
  onPortNameChange: (portTempId: number, portName: string) => void;
  onKeypress: (_: any) => void;
}

const Port: React.FC<PortProps> = ({
  port, portTypeOptions, onPortTypeChange, onPortNameChange, onKeypress,
}) => {
  const handlePortTypeChange = useCallback((value: any) => {
    onPortTypeChange(port.id, parseInt(value));
  }, [port, onPortTypeChange]);

  const handlePortNameChange = useCallback((e: any) => {
    onPortNameChange(port.id, e.target.value);
  }, [port, onPortNameChange]);

  return (
    <div className="port">
      <label className="port-title-index">
        Port
        {` ${port.id}`}
      </label>
      <div className="user-inputs-root">
        <div>
          <FormFieldBox excludeMarginTop excludeMarginBottom>
            <div className="port-name-div">
              <div>
                <label>
                  Port Name
                  <span className="astrisk">*</span>
                </label>
                <Tooltip
                  classes={{
                    tooltip: 'tooltip',
                  }}
                  title="Enter a unique identifier for each individual port. Example: “Port #1”"
                  arrow
                  placement="right"
                >
                  <img src={InfoIcon} alt="Info" />
                </Tooltip>
              </div>
              <div>
                <Input variant="input" name={port.portName} className="port-name" value={port.portName} onChange={handlePortNameChange} onKeypress={onKeypress} />
              </div>
            </div>
          </FormFieldBox>
        </div>
        <div>
          <div>
            <FormFieldBox excludeMarginTop excludeMarginBottom>
              <label>
                Rx
              </label>
              <Input variant="number" name="port-tx" defaultValue={port.rx} disabled className="disabled-rx-tx" />
            </FormFieldBox>
          </div>
          <div>
            <FormFieldBox excludeMarginTop excludeMarginBottom>
              <label>
                Tx
              </label>
              <Input variant="number" name="port-rx" defaultValue={port.tx} disabled className="disabled-rx-tx" />
            </FormFieldBox>
          </div>
          <div>
            <FormFieldBox excludeMarginTop excludeMarginBottom>
              <div className="port-type-div">
                <div>
                  <label>
                    Port Type
                    <span className="astrisk">*</span>
                  </label>
                  <Tooltip
                    classes={{
                      tooltip: 'tooltip',
                    }}
                    title="Choose the Port Interface Type."
                    arrow
                    placement="top"
                  >
                    <img src={InfoIcon} alt="Info" />
                  </Tooltip>
                </div>
                <div>
                  <Dropdown className="ne-select" value={port.portTypeId || portTypeOptions[0]?.id} valueKey="id" textKey="port_type" icon="icon" options={portTypeOptions} onChange={handlePortTypeChange} />
                </div>
              </div>
            </FormFieldBox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Port;
