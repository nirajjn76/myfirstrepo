import React from 'react';
import Input from '../../DesignSystem/input';
import Button from '../../DesignSystem/button';
import Dropdown from '../../DesignSystem/dropdown';
import Textarea from '../../DesignSystem/textarea';
import FormFieldBox from '../../DesignSystem/formFieldBox';
import GroupIconGlobe from '../../../assets/images/group-icon-globe.svg';
import GroupIconCloud from '../../../assets/images/group-icon-cloud.svg';
import GroupIconRouter from '../../../assets/images/group-icon-router.svg';
import GroupIconDefault from '../../../assets/images/udpated-ic-default.svg';

const groupIconOptions = [{
  label: 'Select Icon',
  value: 'select',
}, {
  label: 'Default Icon',
  value: 'noIcon',
  icon: GroupIconDefault,
}, {
  label: 'Internet',
  value: 'globe',
  icon: GroupIconGlobe,
}, {
  label: 'Cloud',
  value: 'cloud',
  icon: GroupIconCloud,
}, {
  label: 'Router',
  value: 'router',
  icon: GroupIconRouter,
}];

interface EditGroupProps {
  selectedExistingGroup: number;
  groupName: string;
  groupNameError: string;
  groupDescription: string;
  groupIcon: string;
  groupOptions: any[];
  disabled: boolean;
  loading: boolean;
  onExistingGroupChange: (_:any) => void;
  onNameChange: (_:any) => void;
  onDescriptionChange: (_:any) => void;
  onIconChange: (_:any) => void;
  onKeyPress: (_:any) => void;
  onAddGroupClick: () => void;
  onClose: (operation?: boolean) => void;
}

const EditGroup: React.FC<EditGroupProps> = ({
  selectedExistingGroup, groupName, groupNameError, groupDescription, groupIcon, groupOptions, disabled, loading, onExistingGroupChange, onNameChange, onDescriptionChange, onIconChange, onKeyPress, onAddGroupClick, onClose,
}) => {
  return (
    <div className="add-group-root">
      <div className="title">
        <label>Create Group</label>
      </div>
      <div className="form">
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
        <FormFieldBox>
          <label>
            Group Name
            <span className="astrisk">*</span>
          </label>
          <Input variant="input" name="group-name" disabled={selectedExistingGroup !== -1} value={groupName} onChange={onNameChange} onKeypress={onKeyPress} error={!!groupNameError} errorMessage={groupNameError} />
        </FormFieldBox>
        <FormFieldBox>
          <label>
            Group Description
            <span className="astrisk">*</span>
          </label>
          <Textarea value={groupDescription} disabled={selectedExistingGroup !== -1} className="group-description" name="bandwidth-description" onChange={onDescriptionChange} onKeypress={onKeyPress} />
        </FormFieldBox>
        <FormFieldBox>
          <label>
            Select Icon
            <span className="astrisk">*</span>
          </label>
          <Dropdown className="ne-select" disabled={selectedExistingGroup !== -1} value={groupIcon} valueKey="value" icon="icon" textKey="label" options={groupIconOptions} onChange={onIconChange} />
        </FormFieldBox>
      </div>
      <div className="buttons">
        <Button variant="greyed" className="btn cancel-btn" text="Cancel" onClick={() => onClose()} />
        <Button variant="primary" className="btn" text="Create Group" disabled={disabled} loading={loading} onClick={onAddGroupClick} />
      </div>
    </div>
  );
};

export default EditGroup;
