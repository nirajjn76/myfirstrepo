import React from 'react';
import clsx from 'clsx';
import Collapsible from 'react-collapsible';
import AddIcon from '@material-ui/icons/Add';
import CollapseIcon from '../../../assets/images/collapse-collapsible.svg';
import Spinner from '../../DesignSystem/spinner';
import ElipsisText from '../../DesignSystem/Table/Cells/ElipsisText';

import { TableConstants } from '../../../utils/appConstants';

interface CollapsibleBoxProps {
  text: string;
  open: boolean;
  id: string;
  onCollapsibleNEClose: (id: string) => void;
  onCollapsibleNEOpen: (id: string) => void;
  loading: boolean;
  data: any[];
  onDrawerContentChange: (content: 'list' | 'details', bandwidth: any) => void;
}

const CollapsibleBox: React.FC<CollapsibleBoxProps> = ({
  text, open, id, loading, data, onCollapsibleNEClose, onCollapsibleNEOpen, onDrawerContentChange,
}) => {
  const trigger = (
    <div className="trigger-div">
      <div className="left">
        <div className={clsx('dot', id)} />
        <label className={clsx(id)}>{text}</label>
      </div>
      <div className="right">
        {open ? <img src={CollapseIcon} alt="Collapse" /> : <AddIcon />}
      </div>
    </div>
  );

  let rows;

  if (loading) {
    rows = (
      <div className="row loading">
        <Spinner size={20} />
      </div>
    );
  } else if (data.length <= 0) {
    rows = (
      <div className="row no-records">
        {TableConstants.noRecordsFound}
      </div>
    );
  } else {
    rows = data.map((item: any, index: number) => {
      return (
        <div className="row" key={index} onClick={() => onDrawerContentChange('details', item)}>
          <ElipsisText text={item.description || item.service_description || '-'} width="100%" />
        </div>
      );
    });
  }

  return (
    <Collapsible open={open} transitionTime={150} transitionCloseTime={150} trigger={trigger} onClosing={() => onCollapsibleNEClose(id)} onOpening={() => onCollapsibleNEOpen(id)}>
      {rows}
    </Collapsible>
  );
};

export default CollapsibleBox;
