import React, { useCallback } from 'react';
import Tooltip from '@mui/material/Tooltip';
import clsx from 'clsx';
import FormFieldBox from '../../../DesignSystem/formFieldBox';
import WaveXchangeIcon from '../../../../assets/images/wavexchange-small-icon.svg';
import SubmitBtn from '../../../../assets/images/submit.svg';
import SubmitBtnDisabled from '../../../../assets/images/submit-disabled.svg';
import SwipeIcon from '../../../../assets/images/swipe-icon.svg';
import InfoIcon from '../../../../assets/images/info-icon.svg';
import Input from '../../../DesignSystem/input';
import Textarea from '../../../DesignSystem/textarea';
import Port from './Port';

interface AddBandwidthContentProps {
  selectedNe: any;
  selectedNewNe: any;
  firstPortsInfo: any[];
  secondPortsInfo: any[];
  portTypes: any[];
  noOfPortsToAdd: number | string;
  noOfPortsError: string;
  firstPortDescription: string;
  secondPortDescription: string;
  bandwidthDescription: string;
  addBandwidthDisabled: boolean;
  onFirstPortsInfoChanged: (_: any[]) => void;
  onSecondPortsInfoChanged: (_: any[]) => void;
  onSelectNodeContent: (_: boolean) => void;
  onNoOfPortsChange: (_: any) => void;
  onKeypress: (_: any) => void;
  onFirstPortDescriptionChange: (_: any) => void;
  onSecondPortDescriptionChange: (_: any) => void;
  onBandwidthDescriptionChange: (_: any) => void;
  onAddBandwidthClick: () => void;
  onSwipeClick: () => void;
}

const AddBandwidthContent: React.FC<AddBandwidthContentProps> = ({
  selectedNe, bandwidthDescription, noOfPortsToAdd, noOfPortsError, firstPortDescription, secondPortDescription, addBandwidthDisabled,
  onKeypress, firstPortsInfo, selectedNewNe, secondPortsInfo, portTypes, onFirstPortDescriptionChange, onSecondPortDescriptionChange, onBandwidthDescriptionChange, onFirstPortsInfoChanged, onSecondPortsInfoChanged, onNoOfPortsChange, onSelectNodeContent, onAddBandwidthClick, onSwipeClick,
}) => {
  const handleFirstPortTypeChange = useCallback((portTempId: number, portTypeId: number) => {
    const tempFirstPortsInfo = firstPortsInfo.map((portInfo) => {
      if (portInfo.id === portTempId) {
        return {
          ...portInfo,
          portTypeId,
        };
      }
      return portInfo;
    });
    onFirstPortsInfoChanged(tempFirstPortsInfo);
  }, [firstPortsInfo, onFirstPortsInfoChanged]);

  const handleSecondPortTypeChange = useCallback((portTempId: number, portTypeId: number) => {
    const tempSecondPortsInfo = secondPortsInfo.map((portInfo) => {
      if (portInfo.id === portTempId) {
        return {
          ...portInfo,
          portTypeId,
        };
      }
      return portInfo;
    });
    onSecondPortsInfoChanged(tempSecondPortsInfo);
  }, [secondPortsInfo, onSecondPortsInfoChanged]);

  const handleFirstPortNameChange = useCallback((portTempId: number, portName: string) => {
    const tempFirstPortsInfo = firstPortsInfo.map((portInfo) => {
      if (portInfo.id === portTempId) {
        return {
          ...portInfo,
          portName,
        };
      }
      return portInfo;
    });
    onFirstPortsInfoChanged(tempFirstPortsInfo);
  }, [firstPortsInfo, onFirstPortsInfoChanged]);

  const handleSecondPortNameChange = useCallback((portTempId: number, portName: string) => {
    const tempSecondPortsInfo = secondPortsInfo.map((portInfo) => {
      if (portInfo.id === portTempId) {
        return {
          ...portInfo,
          portName,
        };
      }
      return portInfo;
    });
    onSecondPortsInfoChanged(tempSecondPortsInfo);
  }, [secondPortsInfo, onSecondPortsInfoChanged]);

  return (
    <div className="add-bandwidth-form">
      <div className="label">
        <label>Add an Existing Bandwidth</label>
      </div>

      <div className="form-box">
        <div className="add-bandwidth-left">
          <div className="selected-ne-box">
            <div>
              <div className="number-box">1</div>
              <label className="label-left">Network Element  :</label>
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
                  No. of links to be added
                  <span className="astrisk">*</span>
                </label>
              </div>
              <div>
                <Input variant="number" name="no-of-ports" value={noOfPortsToAdd} min={1} className="no-of-ports-input" errorMessageClass="small-fonts" onChange={onNoOfPortsChange} error={!!noOfPortsError} onKeypress={onKeypress} />
                <Tooltip
                  classes={{
                    tooltip: 'tooltip',
                  }}
                  title="Enter the integer number of links to be added which share a common description."
                  arrow
                  placement="top"
                >
                  <img src={InfoIcon} alt="Info" />
                </Tooltip>
              </div>
            </div>
            <div className="errors">
              {noOfPortsError && <label className="d-error">{noOfPortsError}</label>}
            </div>
          </div>
          <FormFieldBox>
            <div className="bandwidth-description-div">
              <div>
                <label>
                  Bandwidth Description
                  <span className="astrisk">*</span>
                </label>
                <Tooltip
                  classes={{
                    tooltip: 'tooltip',
                  }}
                  title="Enter a description which applies to bandwidth being added."
                  arrow
                  placement="right"
                >
                  <img src={InfoIcon} alt="Info" />
                </Tooltip>
              </div>
              <div>
                <Textarea value={bandwidthDescription} className="port-description" name="port-description" onChange={onBandwidthDescriptionChange} onKeypress={onKeypress} />
              </div>
            </div>
          </FormFieldBox>

          <FormFieldBox>
            <div className="port-description-div">
              <div>
                <label className="ne-label">
                  Nearend Network Element
                </label>
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
                    placement="top"
                  >
                    <img src={InfoIcon} alt="Info" />
                  </Tooltip>
                </div>

              </div>
              <div>
                <Textarea value={firstPortDescription} className="port-description" name="port-description" onChange={onFirstPortDescriptionChange} onKeypress={onKeypress} />
              </div>
            </div>
          </FormFieldBox>

          <div className="ports">
            <div>
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
                  placement="top"
                >
                  <img src={InfoIcon} alt="Info" />
                </Tooltip>
              </div>
              <div>
                <div><label>Rx</label></div>
                <div><label>Tx</label></div>
                <div>
                  <label>
                    Type
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
              </div>
            </div>
            <div>
              {
                firstPortsInfo && firstPortsInfo.map((portInfo, index) => {
                  return <Port key={index} port={portInfo} portTypeOptions={portTypes} onPortTypeChange={handleFirstPortTypeChange} onPortNameChange={handleFirstPortNameChange} onKeypress={onKeypress} />;
                })
              }
            </div>
          </div>
        </div>
        {
          selectedNewNe.ne_name && (
            <div className="swap">
              <Tooltip
                classes={{
                  tooltip: 'tooltip',
                }}
                title="Swipe Information"
                arrow
              >
                <img src={SwipeIcon} alt="Swipe" onClick={onSwipeClick} data-testid="swipe-icon" />
              </Tooltip>
            </div>
          )
        }
        <div className="add-bandwidth-right">
          <div className="selected-ne-box">
            <div>
              <div className="number-box">2</div>
              <label className="label-right" onClick={() => onSelectNodeContent(true)}>Select Network Element</label>
            </div>

            <div>
              {selectedNewNe.ne_name && (
                <>
                  <img src={WaveXchangeIcon} alt="Company" />
                  <label>{selectedNewNe.ne_name}</label>
                </>
              )}
            </div>
          </div>
          <FormFieldBox>
            <div className="port-description-div">
              <div>
                <label className="ne-label">
                  Farend Network Element
                </label>
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
                    placement="top"
                  >
                    <img src={InfoIcon} alt="Info" />
                  </Tooltip>
                </div>

              </div>
              <div>
                <Textarea disabled={!selectedNewNe.ne_name} value={secondPortDescription} className="port-description" name="port-description" onChange={onSecondPortDescriptionChange} onKeypress={onKeypress} />
              </div>
            </div>
          </FormFieldBox>

          <div className="ports">
            <div>
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
                  placement="top"
                >
                  <img src={InfoIcon} alt="Info" />
                </Tooltip>
              </div>
              <div>
                <div><label>Rx</label></div>
                <div><label>Tx</label></div>
                <div>
                  <label>
                    Type
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
              </div>
            </div>
            <div>
              {
                secondPortsInfo && secondPortsInfo.map((portInfo, index) => {
                  return <Port key={index} disabled={!selectedNewNe.ne_name} port={portInfo} portTypeOptions={portTypes} onPortTypeChange={handleSecondPortTypeChange} onPortNameChange={handleSecondPortNameChange} onKeypress={onKeypress} />;
                })
              }
            </div>
          </div>
        </div>
      </div>

      <div>
        <img src={addBandwidthDisabled ? SubmitBtnDisabled : SubmitBtn} className={clsx('submit-img', addBandwidthDisabled && 'disabled')} alt="Submit" onClick={onAddBandwidthClick} />
      </div>
    </div>
  );
};

export default AddBandwidthContent;
