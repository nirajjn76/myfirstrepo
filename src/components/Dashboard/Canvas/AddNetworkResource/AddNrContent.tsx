import React, { useCallback } from 'react';
import Tooltip from '@mui/material/Tooltip';

import clsx from 'clsx';
import Input from '../../../DesignSystem/input';
import Textarea from '../../../DesignSystem/textarea';
import FormFieldBox from '../../../DesignSystem/formFieldBox';

import SubmitBtn from '../../../../assets/images/submit.svg';
import SubmitBtnDisabled from '../../../../assets/images/submit-disabled.svg';
import WaveXchangeIcon from '../../../../assets/images/wavexchange-small-icon.svg';

import InfoIcon from '../../../../assets/images/info-icon.svg';
import Port from './Port';

interface AddNrContentProps {
  selectedNe: any;
  portTypes: any[];
  portsInfo: any[];
  noOfPortsToAdd: number | string;
  noOfPortsError: string;
  portDescription: string;
  addPortDisabled: boolean;
  onPortsInfoChanged: (_:any[]) => void;
  onSelectNodeContent: (_: boolean) => void;
  onNoOfPortsChange: (_:any) => void;
  onKeypress: (_:any) => void;
  onPortDescriptionChange: (_:any) => void;
  onAddPortsClick: () => void;
}

const AddNrContent: React.FC<AddNrContentProps> = ({
  selectedNe, portTypes, portsInfo, noOfPortsToAdd, noOfPortsError, addPortDisabled, onPortsInfoChanged, portDescription, onSelectNodeContent, onNoOfPortsChange, onKeypress, onPortDescriptionChange, onAddPortsClick,
}) => {
  const handlePortTypeChange = useCallback((portTempId: number, portTypeId: number) => {
    const tempPortsInfo = portsInfo.map((portInfo) => {
      if (portInfo.id === portTempId) {
        return {
          ...portInfo,
          portTypeId,
        };
      }
      return portInfo;
    });
    onPortsInfoChanged(tempPortsInfo);
  }, [portsInfo, onPortsInfoChanged]);

  const handlePortNameChange = useCallback((portTempId: number, portName: string) => {
    const tempPortsInfo = portsInfo.map((portInfo) => {
      if (portInfo.id === portTempId) {
        return {
          ...portInfo,
          portName,
        };
      }
      return portInfo;
    });
    onPortsInfoChanged(tempPortsInfo);
  }, [portsInfo, onPortsInfoChanged]);

  return (
    <div className="add-nr-form">
      <label className="label">Add an Existing Network Resource</label>
      <div className="form-box">
        <div className="selected-ne-box">
          <div>
            <label onClick={() => onSelectNodeContent(true)}>Select Network Element</label>
          </div>
          <div>
            <img src={WaveXchangeIcon} alt="Company" />
            <label>{selectedNe.ne_name}</label>
          </div>
        </div>

        <div className="no-of-ports">
          <div className="user-inputs">
            <div>
              <label>
                No. of ports to be added
                <span className="astrisk">*</span>
              </label>
              <Tooltip
                classes={{
                  tooltip: 'tooltip',
                }}
                title="Enter the integer number of ports to be added which share a common description. When adding more that one port, ports will be automatically grouped on the dashboard page."
                arrow
                placement="top"
              >
                <img src={InfoIcon} alt="Info" />
              </Tooltip>
            </div>
            <div>
              <Input variant="number" name="no-of-ports" value={noOfPortsToAdd} min={1} className="no-of-ports-input" errorMessageClass="small-fonts" onChange={onNoOfPortsChange} error={!!noOfPortsError} onKeypress={onKeypress} />
            </div>
          </div>
          <div className="errors">
            {noOfPortsError && <label className="d-error">{noOfPortsError}</label>}
          </div>
        </div>

        <FormFieldBox excludeMarginBottom excludeMarginTop>
          <div className="port-description-div">
            <div>
              <label>
                Port Description
                <span className="astrisk">*</span>
              </label>
              <Tooltip
                classes={{
                  tooltip: 'tooltip',
                }}
                title="Enter a description which applies to all of the ports being added. Example: “My Core Router”"
                arrow
                placement="bottom"
              >
                <img src={InfoIcon} alt="Info" />
              </Tooltip>
            </div>
            <div>
              <Textarea value={portDescription} className="port-description" name="port-description" onChange={onPortDescriptionChange} onKeypress={onKeypress} />
            </div>
          </div>
        </FormFieldBox>

        <div className="ports">
          {
            portsInfo.map((portInfo, index) => {
              return <Port key={index} port={portInfo} portTypeOptions={portTypes} onPortTypeChange={handlePortTypeChange} onPortNameChange={handlePortNameChange} onKeypress={onKeypress} />;
            })
          }
        </div>
      </div>
      <img src={addPortDisabled ? SubmitBtnDisabled : SubmitBtn} className={clsx('submit-img', addPortDisabled && 'disabled')} alt="Submit" onClick={onAddPortsClick} />
    </div>
  );
};

export default AddNrContent;
