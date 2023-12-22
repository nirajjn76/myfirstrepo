import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import Input from '../../DesignSystem/input';
import Button from '../../DesignSystem/button';
import Dropdown from '../../DesignSystem/dropdown';
import Textarea from '../../DesignSystem/textarea';
import FormFieldBox from '../../DesignSystem/formFieldBox';
import ManagePortsService from '../../../services/managePorts.service';
import { ErrorCodeMessageMapping, ErrorCodesMapping, SuccessMessage } from '../../../utils/apiConstants';
import SuccessInfoIcon from '../../../assets/images/success-toast-checkmark-icon.svg';
import GroupIconGlobe from '../../../assets/images/group-icon-globe.svg';
import GroupIconCloud from '../../../assets/images/group-icon-cloud.svg';
import GroupIconRouter from '../../../assets/images/group-icon-router.svg';
import GroupIconDefault from '../../../assets/images/udpated-ic-default.svg';

const groupIconOptions = [{
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
  name: string;
  description: string;
  icon: string;
  groupId: string;
  expandedNeId: string;
  onClose: (operation?: boolean) => void;
}

const EditGroup: React.FC<EditGroupProps> = ({
  name, description, icon, groupId, expandedNeId, onClose,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>(name);
  const [groupNameError, setGroupNameError] = useState<string>();
  const [groupDescription, setGroupDescription] = useState<string>(description);
  const [groupIcon, setGroupIcon] = useState<string>(icon);

  const handleNameChange = useCallback((e) => {
    setGroupName(e.target.value);
    setTouched(true);
  }, [setGroupName]);

  const handleDescriptionChange = useCallback((e) => {
    setGroupDescription(e.target.value);
    setTouched(true);
  }, [setGroupDescription]);

  const handleIconChange = useCallback((value) => {
    setGroupIcon(value);
    setTouched(true);
  }, [setGroupIcon]);

  const disabled = !!((!groupName || !groupDescription || !groupIcon || groupIcon === 'select') || !touched);

  const handleEditGroupClick = useCallback(() => {
    setLoading(true);
    const payload = {
      name: groupName,
      description: groupDescription,
      icon: groupIcon,
      groupId,
      neId: expandedNeId,
    };
    ManagePortsService.updateGroupDetails(payload)
      .then(() => {
        toast.success(SuccessMessage.editGroupSuccess, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
        setLoading(false);
        setGroupNameError('');
        onClose(true);
      })
      .catch((e: any) => {
        setLoading(false);
        if (e.errorCode === ErrorCodesMapping[999]) {
          setGroupNameError(ErrorCodeMessageMapping[999]);
        }
      });
  }, [setLoading, onClose, setGroupNameError, groupName, groupDescription, groupIcon, groupId, expandedNeId]);

  const handleKeypress = useCallback((e) => {
    if (e.key === 'Enter' && !disabled) {
      handleEditGroupClick();
    }
  }, [handleEditGroupClick, disabled]);

  return (
    <div className="edit-group-root">
      <div className="title">
        <label>Edit Group Details</label>
      </div>
      <div className="form">
        <FormFieldBox>
          <label>
            Group Name
            <span className="astrisk">*</span>
          </label>
          <Input variant="input" name="group-name" defaultValue={name} value={groupName} onChange={handleNameChange} onKeypress={handleKeypress} error={!!groupNameError} errorMessage={groupNameError} />
        </FormFieldBox>
        <FormFieldBox>
          <label>
            Group Description
            <span className="astrisk">*</span>
          </label>
          <Textarea defaultValue={description} value={groupDescription} className="group-description" name="bandwidth-description" onChange={handleDescriptionChange} onKeypress={handleKeypress} />
        </FormFieldBox>
        <FormFieldBox>
          <label>
            Select Icon
            <span className="astrisk">*</span>
          </label>
          <Dropdown className="ne-select" value={groupIcon} valueKey="value" icon="icon" textKey="label" options={groupIconOptions} onChange={handleIconChange} />
        </FormFieldBox>
      </div>
      <div className="buttons">
        <Button variant="greyed" className="btn cancel-btn" text="Cancel" onClick={() => onClose()} />
        <Button variant="primary" className="btn" text="Save" disabled={disabled} loading={loading} onClick={handleEditGroupClick} />
      </div>
    </div>
  );
};

export default EditGroup;
