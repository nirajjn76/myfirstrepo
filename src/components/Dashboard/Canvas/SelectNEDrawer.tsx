import { Input, InputAdornment, Checkbox } from '@material-ui/core';
import React, { useState, useCallback } from 'react';
import DrawerMenu from 'react-modern-drawer';
import clsx from 'clsx';
import Spinner from '../../DesignSystem/spinner';
import CloseBtn from '../../../assets/images/close-drawer.svg';
import SubmitBtn from '../../../assets/images/submit.svg';
import SearchIconBtn from '../../../assets/images/search.svg';
import CheckboxIcon from '../../../assets/images/checkbox-unchecked.svg';
import CheckboxCheckedIcon from '../../../assets/images/checkbox-checked.svg';
import WaveXchangeIcon from '../../../assets/images/wavexchange-small-icon.svg';

interface SelectNEDrawerProps {
  selectedNes: any[];
  loading: boolean;
  open: boolean;
  onNeOpen: () => void;
  onNeClose: (_?:any) => void;
  networkElements: any[];
  onNeSearchChange: (_:any) => void;
  onSelectNes: (_:any[]) => void;
  searchText: string;
  onSelectNodeContent: (_: boolean) => void;
}

const SelectNEDrawer: React.FC<SelectNEDrawerProps> = ({
  selectedNes, onSelectNes, loading, open, onNeClose, onNeOpen, onSelectNodeContent, networkElements, onNeSearchChange, searchText,
}) => {
  const handleSelectRow = useCallback((neId) => {
    const selectedIndex = selectedNes.findIndex((item) => item === neId);
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedNes, neId];
    } else {
      newSelected = selectedNes.filter((ne, index) => index !== selectedIndex);
    }

    onSelectNes(newSelected);
  }, [selectedNes, onSelectNes]);

  const handleSubmitClick = useCallback(() => {
    onNeClose(Array.from(new Set([...selectedNes])));
    onSelectNodeContent(false);
  }, [selectedNes, onSelectNodeContent]);

  let neRows;

  if (loading) {
    neRows = (
      <div className="row loading">
        <Spinner size={30} />
      </div>
    );
  } else if (networkElements.length <= 0) {
    neRows = (
      <div className="row empty">
        <label>No nodes found for given text.</label>
      </div>
    );
  } else {
    neRows = networkElements.map((ne: any, index: number) => {
      return (
        <div className="row" key={index}>
          <Checkbox
            classes={{
              root: 'selection-checkbox',
            }}
            color="default"
            checked={!!selectedNes.find((item) => item === ne.id)}
            onChange={() => handleSelectRow(ne.id)}
            icon={<img src={CheckboxIcon} alt="Checkbox" className="checkbox-icon" />}
            checkedIcon={<img src={CheckboxCheckedIcon} alt="Checkbox Checked" className="checkbox-checked-icon" />}
          />
          <img src={WaveXchangeIcon} alt="Company" />
          <label>{ne.ne_name}</label>
        </div>
      );
    });
  }

  return (
    <DrawerMenu overlayOpacity={0} className={clsx('search-ne', open && 'open')} open={open} onClose={() => onNeClose()} duration={100} direction="right">
      <div className="close-drawer-btn" onClick={() => (open ? onNeClose() : onNeOpen())}>
        <img src={CloseBtn} alt="Close Drawer" />
      </div>
      <div className="select-ne">
        <label>Select Node</label>
        <div className="selection-box">
          <div>
            <Input
              classes={{
                root: 'search-input-root',
              }}
              value={searchText}
              onChange={onNeSearchChange}
              endAdornment={<InputAdornment position="end"><img src={SearchIconBtn} alt="Search" className="search-icon" /></InputAdornment>}
            />
          </div>
          <div className="network-elemnts">
            {neRows}
          </div>
        </div>
        <img src={SubmitBtn} className="submit-img" alt="Submit" onClick={handleSubmitClick} />
      </div>
    </DrawerMenu>
  );
};

export default SelectNEDrawer;
