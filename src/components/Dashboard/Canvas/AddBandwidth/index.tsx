import React, { useCallback } from 'react';
import DrawerMenu from 'react-modern-drawer';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CloseIcon from '@material-ui/icons/Close';
import ArrowDropDownIcon from '../../../../assets/images/drawer-drag-icon.svg';
import SelectNodeContent from './SelectNodeContent';
import AddBandwidthContent from './AddBandwidthContent';

interface AddBandwidthDrawerProps {
  loading: boolean;
  open: boolean;
  selectNodeContent: boolean;
  addBandwidthDisabled: boolean;
  networkElements: any[];
  selectedNe: any;
  selectedNewNe: any;
  searchText: string;
  onAddBandwidthClose: () => void;
  onNetworkElementChange: (_:any) => void;
  onNeSearchChange: (_:any) => void;
  portTypes: any[];
  firstPortsInfo: any[];
  secondPortsInfo: any[];
  noOfPortsToAdd: number | string;
  noOfPortsError: string;
  firstPortDescription: string;
  secondPortDescription: string;
  bandwidthDescription: string;
  onFirstPortsInfoChanged: (_:any[]) => void;
  onSecondPortsInfoChanged: (_:any[]) => void;
  onNoOfPortsChange: (_:any) => void;
  onKeypress: (_:any) => void;
  onFirstPortDescriptionChange: (_:any) => void;
  onSecondPortDescriptionChange: (_:any) => void;
  onBandwidthDescriptionChange: (_:any) => void;
  onAddBandwidthClick: () => void;
  onSwipeClick: () => void;
  onSelectNodeContent: (_:boolean) => void;
}
const AddBandwidthDrawer: React.FC<AddBandwidthDrawerProps> = ({
  selectNodeContent, loading, networkElements, selectedNewNe, addBandwidthDisabled, onAddBandwidthClose, onSwipeClick, onBandwidthDescriptionChange, onNetworkElementChange, onNeSearchChange, bandwidthDescription, searchText, open, selectedNe, portTypes, firstPortsInfo, secondPortsInfo, noOfPortsToAdd, noOfPortsError, firstPortDescription, secondPortDescription, onFirstPortsInfoChanged, onSecondPortsInfoChanged, onNoOfPortsChange, onKeypress, onAddBandwidthClick,
  onFirstPortDescriptionChange, onSecondPortDescriptionChange, onSelectNodeContent,
}) => {
  const handleNewSelectedNe = useCallback((newNe: any) => {
    onNetworkElementChange(newNe);
  }, [onNetworkElementChange]);

  const handleClose = useCallback(() => {
    onAddBandwidthClose();
    onSelectNodeContent(false);
  }, [onSelectNodeContent, onAddBandwidthClose]);

  return (
    <DrawerMenu overlayOpacity={0} className="add-bandwidth" open={open} onClose={handleClose} duration={200} direction="bottom">
      <div className="close-drawer-btn" onClick={handleClose}>
        <img className="down-icon" src={ArrowDropDownIcon} alt="Close drawer" />
      </div>
      <div className="close-icon-btn" onClick={handleClose}>
        <CloseIcon className="close-icon" />
      </div>
      {
        selectNodeContent
          ? <SelectNodeContent onNewSelectedNe={handleNewSelectedNe} loading={loading} networkElements={networkElements} onNeSearchChange={onNeSearchChange} searchText={searchText} selectedNe={selectedNe} selectedNewNe={selectedNewNe} onSelectNodeContent={onSelectNodeContent} />
          : <AddBandwidthContent addBandwidthDisabled={addBandwidthDisabled} onSwipeClick={onSwipeClick} selectedNewNe={selectedNewNe} portTypes={portTypes} noOfPortsError={noOfPortsError} firstPortDescription={firstPortDescription} secondPortDescription={secondPortDescription} bandwidthDescription={bandwidthDescription} noOfPortsToAdd={noOfPortsToAdd} selectedNe={selectedNe} firstPortsInfo={firstPortsInfo} secondPortsInfo={secondPortsInfo} onFirstPortsInfoChanged={onFirstPortsInfoChanged} onSecondPortsInfoChanged={onSecondPortsInfoChanged} onNoOfPortsChange={onNoOfPortsChange} onKeypress={onKeypress} onFirstPortDescriptionChange={onFirstPortDescriptionChange} onSecondPortDescriptionChange={onSecondPortDescriptionChange} onBandwidthDescriptionChange={onBandwidthDescriptionChange} onSelectNodeContent={onSelectNodeContent} onAddBandwidthClick={onAddBandwidthClick} />
      }

    </DrawerMenu>
  );
};

export default AddBandwidthDrawer;
