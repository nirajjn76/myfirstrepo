import React, { useMemo } from 'react';
import { Checkbox } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Button from '../../../DesignSystem/button';
import FormFieldBox from '../../../DesignSystem/formFieldBox';
import Input from '../../../DesignSystem/input';
import Textarea from '../../../DesignSystem/textarea';
import Dropdown from '../../../DesignSystem/dropdown';
import GroupCloudIcon from '../../../../assets/images/group-cloud-icon.svg';
import GroupRouterIcon from '../../../../assets/images/group-globe-icon.svg';
import GroupGlobeIcon from '../../../../assets/images/group-router-icon.svg';

interface CreateGroupNRProps {
  loading: boolean;
  touched: boolean;
  screenNum: number;
  selectedNrs: any[];
  groupOptions: any[];
  selectedExistingGroup: number;
  groupName: string;
  groupDescription: string;
  groupIcon: string;
  edit: boolean;
  groupNameError: string;
  onExistingGroupChange: (_: any) => void;
  onGroupClose: () => void;
  onSaveClick: () => void;
  onGroupNameChange: (_: any) => void;
  onKeypress: (_: any) => void;
  onGroupDescriptionChange: (_: any) => void;
  onGroupIconChange: (_: string) => void;
}

const CreateGroupNR: React.FC<CreateGroupNRProps> = ({
  screenNum, touched, groupNameError, loading, groupName, groupDescription, groupIcon, groupOptions, selectedExistingGroup, edit, onExistingGroupChange, onGroupNameChange, onKeypress, onGroupDescriptionChange, onGroupIconChange, selectedNrs, onGroupClose, onSaveClick,
}) => {
  const disabled = useMemo(() => {
    if (screenNum === 1) {
      if (selectedNrs.length <= 0) {
        return true;
      }
      return false;
    } if (screenNum === 2) {
      if (!touched) {
        return true;
      } if (selectedExistingGroup && selectedExistingGroup !== -1) {
        return false;
      } if (!groupName || !groupDescription || !groupIcon || groupIcon === 'select') {
        return true;
      }
      return false;
    } if (screenNum === 3) {
      if (!touched) {
        return true;
      } if (!groupName || !groupDescription || !groupIcon) {
        return true;
      }
      return false;
    }
  }, [screenNum, selectedNrs, groupName, groupDescription, groupIcon, touched, selectedExistingGroup]);

  const scrollFromEvent = (e: any) => {
    e.stopPropagation(); // To prevent passing scroll event to parent, so canvas don't zoom in/out on scroll
  };

  return (
    <div className="create-group">
      <div className="labels">
        <label>
          {edit ? 'Edit' : 'Create New'}
          {' '}
          Group
        </label>
        {screenNum === 1 && <span>Please select ports to group</span>}
      </div>
      {
        (screenNum === 2 || screenNum === 3) && (
          <div className="add-group-form" onWheel={scrollFromEvent}>
            {
              !edit && (
                <>
                  <FormFieldBox>
                    <label>
                      Add in Existing Group
                      <span className="astrisk">*</span>
                    </label>
                    <Dropdown className="ne-select" value={selectedExistingGroup} disabled={!!(groupName || groupDescription)} valueKey="id" icon="icon" textKey="name" options={groupOptions} onChange={onExistingGroupChange} />
                  </FormFieldBox>
                  <div className="create-new-group-label">
                    <label>Or Create New Group</label>
                  </div>
                </>
              )
            }
            <FormFieldBox>
              <div className="text-area-root">
                <div>
                  <label>
                    Name
                    <span className="astrisk">*</span>
                  </label>
                </div>
                <div>
                  <Input variant="input" type="text" name="group-name-1" disabled={selectedExistingGroup !== -1} value={groupName} className="group-name" error={!!groupNameError} errorMessage={groupNameError} onChange={onGroupNameChange} onKeypress={onKeypress} />
                </div>
              </div>
            </FormFieldBox>
            <FormFieldBox>
              <div className="text-area-root">
                <div>
                  <label>
                    Description
                    <span className="astrisk">*</span>
                  </label>
                </div>
                <div>
                  <Textarea name="group-description" value={groupDescription} disabled={selectedExistingGroup !== -1} className="group-description" onChange={onGroupDescriptionChange} />
                </div>
              </div>
            </FormFieldBox>
            <div className="select-icon">
              <label>Select Icon</label>
              <hr className="hr-line" />
              <div>
                <div>
                  <Checkbox
                    classes={{
                      root: 'radio',
                    }}
                    color="default"
                    checked={groupIcon === 'noIcon'}
                    onChange={() => onGroupIconChange('noIcon')}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                    disabled={selectedExistingGroup !== -1}
                  />
                  <Tooltip
                    arrow
                    title="Default Icon"
                    classes={{
                      tooltip: 'tooltip',
                    }}
                  >
                    <span className="no-icon">Default icon</span>
                  </Tooltip>
                </div>
                <div>
                  <Checkbox
                    classes={{
                      root: 'radio',
                    }}
                    color="default"
                    checked={groupIcon === 'cloud'}
                    onChange={() => onGroupIconChange('cloud')}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                    disabled={selectedExistingGroup !== -1}
                  />
                  <Tooltip
                    arrow
                    title="Cloud"
                    classes={{
                      tooltip: 'tooltip',
                    }}
                  >
                    <img src={GroupCloudIcon} alt="Cloud" />
                  </Tooltip>
                </div>

              </div>
            </div>
            <div className="select-icon">
              <div>
                <div>
                  <Checkbox
                    classes={{
                      root: 'radio',
                    }}
                    color="default"
                    checked={groupIcon === 'globe'}
                    onChange={() => onGroupIconChange('globe')}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                    disabled={selectedExistingGroup !== -1}
                  />
                  <Tooltip
                    arrow
                    title="Internet"
                    classes={{
                      tooltip: 'tooltip',
                    }}
                  >
                    <img src={GroupGlobeIcon} alt="Internet" />
                  </Tooltip>
                </div>
                <div>
                  <Checkbox
                    classes={{
                      root: 'radio',
                    }}
                    color="default"
                    checked={groupIcon === 'router'}
                    onChange={() => onGroupIconChange('router')}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                    disabled={selectedExistingGroup !== -1}
                  />
                  <Tooltip
                    arrow
                    title="Router"
                    classes={{
                      tooltip: 'tooltip',
                    }}
                  >
                    <img src={GroupRouterIcon} alt="Router" />
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        )
      }
      <div className="buttons">
        <Button variant="primary" text="Cancel" className="cancel-btn" onClick={onGroupClose} />
        <Button variant="primary" text={screenNum === 1 ? 'Next' : 'Save'} className="save-next-btn" loading={loading} disabled={disabled} onClick={onSaveClick} />
      </div>
    </div>
  );
};

export default CreateGroupNR;
