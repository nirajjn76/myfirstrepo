import React, { useCallback } from 'react';
import {
  TableBody, TableCell, TableRow, Tooltip,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { confirmAlert } from 'react-confirm-alert';
import Button from '../DesignSystem/button';
import TitleSubtitle from '../DesignSystem/Table/Cells/TitleSubtitle';
import ElipsisCell from '../DesignSystem/Table/Cells/ElipsisTextCell';
import soldIcon from '../../assets/images/ic-sold.svg';
import EditIcon from '../../assets/images/edit-icon.svg';
import InUseIcon from '../../assets/images/in-use-icon.svg';
import WarningInfoIcon from '../../assets/images/warn-toast-icon.svg';

interface TableDataProps {
    bandwidthPort : any;
    removeLoadingId: string;
    cancelSubLoading: string;
    handlePutForSaleOpen: () => void;
    onSaleEdit: (port: any) => void;
    onRemoveClick: (port: any) => void;
    onCancelSubscription: (port : any) => void;
}
const TableData: React.FC<TableDataProps> = ({
  onSaleEdit, onRemoveClick, removeLoadingId, bandwidthPort, cancelSubLoading, handlePutForSaleOpen, onCancelSubscription,
}) => {
  const handleEdit = useCallback(
    () => {
      onSaleEdit(bandwidthPort);
    },
    [onSaleEdit, bandwidthPort],
  );
  const handleCancel = useCallback(() => {
    return confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui-alert">
            <CloseIcon
              className="close-icon-popup"
              onClick={() => {
                onClose();
              }}
            />
            <div>
              <img src={WarningInfoIcon} alt="Warning" />
              <label>Are you sure to cancel this subscription?</label>

            </div>
            <div />
            <div className="buttons">
              <Button
                onClick={() => {
                  onClose();
                }}
                text="No"
                variant="greyed"
                className="cancel"
              />
              <Button
                onClick={() => {
                  onCancelSubscription(bandwidthPort);
                  onClose();
                }}
                text="Yes"
                variant="primary"
              />
            </div>
          </div>
        );
      },
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  }, [onCancelSubscription, bandwidthPort]);

  const handleRemove = useCallback(
    () => {
      onRemoveClick(bandwidthPort);
    },
    [onRemoveClick, bandwidthPort],
  );
  let button;
  if (bandwidthPort.status === 'in_use') {
    button = <img src={InUseIcon} alt="In Use" />;
  } else if (!bandwidthPort.status) {
    button = <Button disabled={!bandwidthPort.is_verified} className="btn-sale" variant="success" text="Sale" onClick={handlePutForSaleOpen} />;
  } else if (bandwidthPort.status === 'put_up_for_sale_bandwidth') {
    button = (
      <>
        <Button className="btn-remove-from-market-place" variant="success" text="Remove" loading={!!(removeLoadingId === bandwidthPort.bandwidth_detail_id)} onClick={handleRemove} />
        <Tooltip
          placement="right"
          title="Edit Sale Details"
          classes={{
            tooltip: 'tooltip',
          }}
          arrow
        >
          <img className="edit-icon" src={EditIcon} alt="Edit" onClick={handleEdit} />
        </Tooltip>
      </>
    );
  } else if (bandwidthPort.status === 'cancel') {
    button = <Button className="btn-cancel-subscription" variant="success" onClick={handleCancel} loading={!!(cancelSubLoading === bandwidthPort.purchase_id)} text="Cancel" />;
  } else if (bandwidthPort.status === 'sold' && !bandwidthPort.purchasePortId) {
    button = <img src={soldIcon} alt="Sold" />;
  }

  return (
    <TableRow>
      <TitleSubtitle width="20%" maxWidth="15vw" align="left" title={bandwidthPort.nne_name} subTitle={bandwidthPort.nearend_node_street ? `(${bandwidthPort.nearend_node_street})` : '-'} boldTitle />
      <ElipsisCell width="10%" align="left" text={bandwidthPort.status === 'cancel' ? bandwidthPort.near_purchase_port_name : bandwidthPort.nearend_port_name} />
      <ElipsisCell align="left" width="15%" text={bandwidthPort.bandwidth_description} />
      <TitleSubtitle width="20%" maxWidth="15vw" align="left" title={bandwidthPort.fne_name} subTitle={bandwidthPort.farend_node_street ? `(${bandwidthPort.farend_node_street})` : '-'} boldTitle />
      <ElipsisCell align="left" width="10%" text={bandwidthPort.status === 'cancel' ? bandwidthPort.far_purchase_port_name : bandwidthPort.farend_port_name} />
      <TableCell align="left" width="15%">
        <Tooltip
          placement="left"
          title={!bandwidthPort.is_verified && bandwidthPort.status !== 'in_use'
            ? (
              <div>
                <div>One side port is not verified.</div>
                <div>Please contact Wavexchange Administrator.</div>
              </div>
            )

            : ''}
          classes={{
            tooltip: 'tooltip',
          }}
          arrow
        >
          <div className="group-port-manage-actions">
            {button}
          </div>
        </Tooltip>
      </TableCell>

    </TableRow>
  );
};

export default TableData;
