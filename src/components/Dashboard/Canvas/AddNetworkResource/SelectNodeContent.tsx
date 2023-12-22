import {
  RadioGroup, FormControlLabel, Radio, Input, InputAdornment,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useState, useCallback } from 'react';
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
  networkElements: any[];
  onNeSearchChange: (_: any) => void;
  searchText: string;
  handleNewSelectedNe: (_: any) => void;
}

const SelectNode: React.FC<SelectNodeProps> = ({
  onSelectNodeContent, selectedNe, loading, networkElements, onNeSearchChange, searchText, handleNewSelectedNe,
}) => {
  const [newSelectedNe, setNewSelectedNe] = useState<any>({});
  const handleNodeChange = useCallback((event) => {
    const newNode = networkElements.find((ne) => ne.id == event.target.value);
    setNewSelectedNe(newNode);
  }, [setNewSelectedNe]);

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

  return (
    <div className="select-ne">
      <div className="title-div">
        <ArrowLeftSharpIcon className="go-back-icon" onClick={() => onSelectNodeContent(false)} />
        <label>Select Node</label>
      </div>

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
          <RadioGroup value={newSelectedNe.id || parseInt(selectedNe.id)} onChange={handleNodeChange}>
            {neRows}
          </RadioGroup>
        </div>
      </div>
      <img src={networkElements.length <= 0 ? SubmitBtnDisabled : SubmitBtn} className={clsx('submit-img', networkElements.length <= 0 && 'disabled')} alt="Submit" onClick={() => { onSelectNodeContent(false); handleNewSelectedNe(newSelectedNe.id ? newSelectedNe : selectedNe); }} />
    </div>
  );
};

export default SelectNode;
