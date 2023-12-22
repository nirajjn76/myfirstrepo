import React, { useState, useCallback } from 'react';
import DrawerMenu from 'react-modern-drawer';
import CloseBtn from '../../../../assets/images/close-drawer.svg';
import AddNrContent from './AddNrContent';
import SelectNodeContent from './SelectNodeContent';

interface AddNrDrawerProps {
  loading: boolean;
  open: boolean;
  onAddNRClose: () => void;
  selectedNe: any;
  portTypes: any[];
  portsInfo: any[];
  noOfPortsToAdd: number | string;
  noOfPortsError: string;
  portDescription: string;
  addPortDisabled: boolean;
  onPortsInfoChanged: (_:any[]) => void;
  onNoOfPortsChange: (_:any) => void;
  onKeypress: (_:any) => void;
  onPortDescriptionChange: (_:any) => void;
  onAddPortsClick: () => void;
  networkElements: any[];
  onNeSearchChange: (_:any) => void;
  onNetworkElementChange: (_:any) => void;
  searchText: string;
  onSelectNodeContent: (_:any) => void;
}

const AddNrDrawer: React.FC<AddNrDrawerProps> = ({
  loading, networkElements, onNetworkElementChange, onNeSearchChange, onSelectNodeContent, searchText, open, onAddNRClose, selectedNe, portTypes, portsInfo, noOfPortsToAdd, noOfPortsError, portDescription, addPortDisabled, onPortsInfoChanged, onNoOfPortsChange, onKeypress, onPortDescriptionChange, onAddPortsClick,
}) => {
  const [selectNodeContent, setSelectNodeContent] = useState<boolean>(false);
  const handleSelectNodeContent = useCallback((isSelectNodeContent: boolean) => {
    setSelectNodeContent(isSelectNodeContent);
    onSelectNodeContent(false);
  }, [setSelectNodeContent, onSelectNodeContent]);

  const handleNewSelectedNe = useCallback((newNe: any) => {
    onNetworkElementChange(newNe);
    onSelectNodeContent(false);
  }, [onNetworkElementChange, onSelectNodeContent]);

  return (
    <DrawerMenu overlayOpacity={0} className="add-nr" open={open} onClose={onAddNRClose} duration={100} direction="right">
      <div className="close-drawer-btn" onClick={onAddNRClose}>
        <img src={CloseBtn} alt="Close Drawer" />
      </div>
      {
        selectNodeContent ? <SelectNodeContent handleNewSelectedNe={handleNewSelectedNe} loading={loading} networkElements={networkElements} onNeSearchChange={onNeSearchChange} searchText={searchText} selectedNe={selectedNe} onSelectNodeContent={handleSelectNodeContent} /> : <AddNrContent portTypes={portTypes} noOfPortsError={noOfPortsError} portDescription={portDescription} addPortDisabled={addPortDisabled} noOfPortsToAdd={noOfPortsToAdd} selectedNe={selectedNe} portsInfo={portsInfo} onPortsInfoChanged={onPortsInfoChanged} onNoOfPortsChange={onNoOfPortsChange} onKeypress={onKeypress} onPortDescriptionChange={onPortDescriptionChange} onSelectNodeContent={handleSelectNodeContent} onAddPortsClick={onAddPortsClick} />
      }

    </DrawerMenu>
  );
};

export default AddNrDrawer;
