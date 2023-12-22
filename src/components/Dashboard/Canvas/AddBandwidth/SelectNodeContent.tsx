import {
  RadioGroup, FormControlLabel, Radio, Input, InputAdornment,
} from '@material-ui/core';
import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import ArrowLeftSharpIcon from '@material-ui/icons/ArrowLeftSharp';
import Spinner from '../../../DesignSystem/spinner';
import SubmitBtn from '../../../../assets/images/submit.svg';
import SubmitBtnDisabled from '../../../../assets/images/submit-disabled.svg';
import SearchIconBtn from '../../../../assets/images/search.svg';
import WaveXchangeIcon from '../../../../assets/images/wavexchange-small-icon.svg';

interface SelectNodeProps {
  loading: boolean;
  onSelectNodeContent: (_: boolean) => void;
  selectedNe: any;
  selectedNewNe: any;
  networkElements: any[];
  onNeSearchChange: (_: any) => void;
  searchText: string;
  onNewSelectedNe: (_: any) => void;
}

const SelectNode: React.FC<SelectNodeProps> = ({
  onSelectNodeContent, selectedNe, selectedNewNe, loading, networkElements, onNeSearchChange, searchText, onNewSelectedNe,
}) => {
  const [newSelectedNe, setNewSelectedNe] = useState<any>(selectedNewNe || {});

  const handleNodeChange = useCallback((event) => {
    const newNode = networkElements.find((ne) => ne.id == event.target.value);
    setNewSelectedNe(newNode);
  }, [setNewSelectedNe]);

  const handleSearchChanges = useCallback((e) => {
    setNewSelectedNe({});
    onNeSearchChange(e);
  }, [setNewSelectedNe, onNeSearchChange]);

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
    const filteredNes = networkElements.filter((network) => { return network.id != selectedNe.id; });
    neRows = filteredNes.map((ne: any, index: number) => {
      const label = (
        <>
          <img src={WaveXchangeIcon} alt="Company" />
          <label>{ne.ne_name}</label>
        </>
      );

      return (
        <FormControlLabel
          classes={{
            root: 'row',
          }}
          value={ne.id}
          control={(
            <Radio
              classes={{
                root: 'radio',
              }}
            />
          )}
          label={label}
          key={index}
        />
      );
    });
  }

  const disabled = !newSelectedNe?.id;

  return (
    <div className="select-ne">
      <div className="select-node">
        <div className="title-div">
          <ArrowLeftSharpIcon className="go-back-icon" onClick={() => onSelectNodeContent(false)} />
          <label>Select Node</label>
        </div>
        <div>
          <Input
            classes={{
              root: 'search-input-root',
            }}
            value={searchText}
            onChange={handleSearchChanges}
            endAdornment={<InputAdornment position="end"><img src={SearchIconBtn} alt="Search" className="search-icon" /></InputAdornment>}
          />
        </div>
      </div>

      <div className="selection-box">
        <div className="network-elemnts">
          <RadioGroup value={newSelectedNe?.id || parseInt(selectedNewNe?.id)} onChange={handleNodeChange}>
            {neRows}
          </RadioGroup>
        </div>
      </div>
      <img src={disabled ? SubmitBtnDisabled : SubmitBtn} className={clsx('submit-img', disabled && 'disabled')} alt="Submit" onClick={() => { onSelectNodeContent(false); onNewSelectedNe(newSelectedNe?.id ? newSelectedNe : selectedNewNe); }} />
    </div>
  );
};

export default SelectNode;
