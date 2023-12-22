import React from 'react';
import Collapsible from 'react-collapsible';
import AddIcon from '@material-ui/icons/Add';
import CollapseIcon from '../../assets/images/collapse-collapsible.svg';

interface CollapsibleBoxProps {
  text: string;
  open: boolean;
  id: string;
  table?: any;
  onCollapsibleNEClose: (id: string) => void;
  onCollapsibleNEOpen: (id: string) => void;
}

const CollapsibleBox: React.FC<CollapsibleBoxProps> = ({
  text, open, id, table, onCollapsibleNEClose, onCollapsibleNEOpen,
}) => {
  const trigger = (
    <div className="trigger-div">
      <label>{text}</label>
      {open ? <img src={CollapseIcon} alt="Collapse" /> : <AddIcon />}
    </div>
  );

  return (
    <Collapsible open={open} transitionTime={150} transitionCloseTime={150} trigger={trigger} onClosing={() => onCollapsibleNEClose(id)} onOpening={() => onCollapsibleNEOpen(id)}>
      {table || <label>Not yet developed</label>}
    </Collapsible>
  );
};

export default CollapsibleBox;
