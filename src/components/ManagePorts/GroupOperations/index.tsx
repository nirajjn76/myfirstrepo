import React, { useState, useCallback, useMemo } from 'react';
import DrawerMenu from 'react-modern-drawer';
import { toast } from 'react-toastify';
import CloseBtn from '../../../assets/images/close-drawer.svg';
import EditGroup from './EditGroup';
import AddGroup from './AddGroup';
import ManagePortsService from '../../../services/managePorts.service';
import { ErrorCodeMessageMapping, ErrorCodesMapping, SuccessMessage } from '../../../utils/apiConstants';
import SuccessInfoIcon from '../../../assets/images/success-toast-checkmark-icon.svg';

interface GroupDrawerProps {
  open: boolean;
  existingGroupOptions: any[];
  onClose: (operation?: boolean) => void;
  groupedSelected: any[];
  edit: boolean;
  name: string;
  description: string;
  icon: string;
  expandedNeId: string;
  groupId: string;
}

const GroupDrawer: React.FC<GroupDrawerProps> = ({
  open, onClose, groupedSelected, existingGroupOptions, edit, name, description, icon, expandedNeId, groupId,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');
  const [groupNameError, setGroupNameError] = useState<string>('');
  const [groupDescription, setGroupDescription] = useState<string>('');
  const [groupIcon, setGroupIcon] = useState<string>('select');
  const [selectedExistingGroup, setSelectedExistingGroup] = useState<number>(-1);

  const groupOptions = useMemo(() => {
    let resp = [];
    if (existingGroupOptions && existingGroupOptions.length > 0) {
      resp = [{ id: -1, name: 'Select Group' }, ...existingGroupOptions];
    } else {
      resp = [{ id: -1, name: 'Select Group' }];
    }
    return resp;
  }, [existingGroupOptions]);

  const handleNameChange = useCallback((e) => {
    setGroupName(e.target.value);
  }, [setGroupName]);

  const handleDescriptionChange = useCallback((e) => {
    setGroupDescription(e.target.value);
  }, [setGroupDescription]);

  const handleIconChange = useCallback((value) => {
    setGroupIcon(value);
  }, [setGroupIcon]);

  const handleExistingGroupChange = useCallback((value) => {
    setSelectedExistingGroup(value);
  }, [setSelectedExistingGroup]);

  const disabled = useMemo(() => {
    let resp = false;
    if (selectedExistingGroup && selectedExistingGroup !== -1) {
      resp = false;
    } else if (!groupName || !groupDescription || !groupIcon || groupIcon === 'select') {
      resp = true;
    }
    return resp;
  }, [selectedExistingGroup, groupName, groupDescription, groupIcon]);

  const handleAddGroupClick = useCallback(() => {
    setLoading(true);
    if (selectedExistingGroup && selectedExistingGroup !== -1) {
      const payload = {
        nrIds: groupedSelected.filter((item) => item.nrId !== -1).map((item) => item.nrId),
        purchasePortIds: groupedSelected.filter((item) => item.purchasePortId !== -1).map((item) => item.purchasePortId),
        groupId: selectedExistingGroup,
        neId: expandedNeId,
      };
      ManagePortsService.addNrsInExistingGroup(payload)
        .then(() => {
          toast.success(SuccessMessage.addGroupSuccess, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
          setLoading(false);
          setGroupNameError('');
          setGroupName('');
          setGroupDescription('');
          setGroupIcon('select');
          setSelectedExistingGroup(-1);
          onClose(true);
        })
        .catch((e: any) => {
          setLoading(false);
          if (e.errorCode === ErrorCodesMapping[999]) {
            setGroupNameError(ErrorCodeMessageMapping[999]);
          }
        });
    } else {
      const payload = {
        name: groupName,
        description: groupDescription,
        icon: groupIcon,
        nrIds: groupedSelected.filter((item) => item.nrId !== -1).map((item) => item.nrId),
        purchasePortIds: groupedSelected.filter((item) => item.purchasePortId !== -1).map((item) => item.purchasePortId),
        neId: expandedNeId,
      };
      ManagePortsService.addGroupDetails(payload)
        .then(() => {
          toast.success(SuccessMessage.addGroupSuccess, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
          setLoading(false);
          setGroupNameError('');
          setGroupName('');
          setGroupDescription('');
          setGroupIcon('select');
          setSelectedExistingGroup(-1);
          onClose(true);
        })
        .catch((e: any) => {
          setLoading(false);
          if (e.errorCode === ErrorCodesMapping[999]) {
            setGroupNameError(ErrorCodeMessageMapping[999]);
          }
        });
    }
  }, [setLoading, onClose, setGroupNameError, groupedSelected, groupName, groupDescription, groupIcon, selectedExistingGroup, expandedNeId]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !disabled) {
      handleAddGroupClick();
    }
  }, [handleAddGroupClick, disabled]);

  const handleClose = useCallback((operation?: boolean) => {
    onClose(operation);
    setGroupName('');
    setGroupNameError('');
    setGroupDescription('');
    setGroupIcon('select');
    setSelectedExistingGroup(-1);
  }, [onClose]);

  return (
    <DrawerMenu overlayOpacity={0} className="manage-ports-drawer" open={open} onClose={() => handleClose()} duration={100} direction="right">
      <div className="close-drawer-btn" onClick={() => handleClose()}>
        <img src={CloseBtn} alt="Close Drawer" />
      </div>
      {
        edit
          ? <EditGroup name={name} description={description} icon={icon} onClose={handleClose} groupId={groupId} expandedNeId={expandedNeId} />
          : (
            <AddGroup
              onClose={handleClose}
              selectedExistingGroup={selectedExistingGroup}
              groupName={groupName}
              groupNameError={groupNameError}
              groupDescription={groupDescription}
              groupIcon={groupIcon}
              groupOptions={groupOptions}
              disabled={disabled}
              loading={loading}
              onExistingGroupChange={handleExistingGroupChange}
              onNameChange={handleNameChange}
              onDescriptionChange={handleDescriptionChange}
              onIconChange={handleIconChange}
              onKeyPress={handleKeyPress}
              onAddGroupClick={handleAddGroupClick}
            />
          )
      }
    </DrawerMenu>
  );
};

export default GroupDrawer;
