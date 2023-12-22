import React, { useCallback } from 'react';
import {
  TableRow, TableCell, Checkbox,
} from '@material-ui/core';
import { HeadCellType } from '../../../utils/appConstants';
import ElipsisCell from '../../DesignSystem/Table/Cells/ElipsisTextCell';
import TitleSubtitle from '../../DesignSystem/Table/Cells/TitleSubtitle';
import Button from '../../DesignSystem/button';
import { getTimeInMediumFormat, getDateInMediumFormat, elapsedTimeLogic } from '../../../utils/methods';
import CheckboxIcon from '../../../assets/images/checkbox-unchecked.svg';
import CheckboxCheckedIcon from '../../../assets/images/checkbox-checked.svg';
import VerifiedImage from '../../../assets/images/verified-image.svg';

export const headCells: HeadCellType[] = [
  {
    id: 'portId',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: 'Port ID',
    width: '5%',
  },
  {
    id: 'neName',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: 'Network Element (ID)',
    width: '15%',
  },
  {
    id: 'portName',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: 'Port Name',
    width: '15%',
    tooltipTitle: 'Port Name',
  },
  {
    id: 'portDescription',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: 'Port Description',
    width: '15%',
  },
  {
    id: 'owner',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Owner',
    width: '10%',
  },
  {
    id: 'request_by',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Requested By',
    width: '10%',
  },
  {
    id: 'created_at',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Added Date',
    width: '10%',
  },
  {
    id: 'elapsed_time',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: 'Elapsed Time',
    width: '10%',
  },
  {
    id: 'action',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: 'Action',
    width: '5%',
  },
];

interface NotVerifiedBandwidthRowProps {
  bandwidthPort: any;
  verifyLoadingId: string;
  rowSelected: boolean;
  selected: any[];
  onVerifyClick: (id: string) => void;
  onSelectRow: (newSelected: any[]) => void;
}

const NotVerifiedBandwidthRow: React.FC<NotVerifiedBandwidthRowProps> = ({
  bandwidthPort, verifyLoadingId, rowSelected, selected, onVerifyClick, onSelectRow,
}) => {
  const date = getDateInMediumFormat(bandwidthPort.created_at);
  const time = getTimeInMediumFormat(bandwidthPort.created_at);
  const { diffrence, differenceUnit } = elapsedTimeLogic(bandwidthPort.created_at);

  const handleVerifyBtnClick = useCallback((portId: string) => {
    onVerifyClick(portId);
  }, [onVerifyClick]);

  const handleSelectRow = useCallback(() => {
    const selectedIndex = selected.findIndex((item) => (item.id.find((itemId: any) => itemId.n_id === bandwidthPort.n_port_id) || item.id.find((itemId: any) => itemId.f_id === bandwidthPort.f_port_id)));
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, [{ id: [{ f_id: bandwidthPort.f_port_id, verified: bandwidthPort.fverified }, { n_id: bandwidthPort.n_port_id, verified: bandwidthPort.nverified }] }]);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    onSelectRow(newSelected);
  }, [bandwidthPort.n_port_id, bandwidthPort.f_port_id, selected, onSelectRow]);

  return (
    <>
      <TableRow>
        <TableCell rowSpan={3} width="5%">
          <Checkbox
            classes={{
              root: 'selection-checkbox',
            }}
            color="default"
            checked={rowSelected}
            onChange={handleSelectRow}
            icon={<img src={CheckboxIcon} alt="Checkbox" className="checkbox-icon" />}
            checkedIcon={<img src={CheckboxCheckedIcon} alt="Checkbox Checked" className="checkbox-checked-icon" />}
            inputProps={{
              // @ts-ignore
              'data-testid': 'checkbox-input',
            }}
            data-testid="checkbox"
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <ElipsisCell width="5%" align="left" className="bold-font" text={bandwidthPort.n_port_id} />
        <TitleSubtitle width="15%" maxWidth="15vw" align="left" title={bandwidthPort.nne_name} subTitle={bandwidthPort.nposition_in ? `(${bandwidthPort.nposition_in})` : '-'} boldTitle />
        <ElipsisCell width="15%" align="left" text={bandwidthPort.nport_name} />
        <ElipsisCell width="15%" align="left" text={bandwidthPort.ndescription || '-'} />
        <ElipsisCell width="10%" align="left" text={bandwidthPort.organization_name} />
        <ElipsisCell width="10%" align="left" text={`${bandwidthPort.first_name} ${bandwidthPort.last_name}`} />
        <TitleSubtitle width="10%" maxWidth="10vw" align="left" title={date} subTitle={time} />
        <ElipsisCell width="10%" align="left" text={`${diffrence} ${differenceUnit}`} />
        <TableCell align="left" width="5%">
          {
            bandwidthPort.nverified
              ? <img src={VerifiedImage} alt="Verified" />
              : <Button className="btn-verify" variant="success" text="Verify" loading={!!(verifyLoadingId && verifyLoadingId === bandwidthPort.n_port_id)} onClick={() => handleVerifyBtnClick(bandwidthPort.n_port_id)} spinnerSize={20} />
          }
        </TableCell>
      </TableRow>
      <TableRow>
        <ElipsisCell width="5%" align="left" className="bold-font" text={bandwidthPort.f_port_id} />
        <TitleSubtitle width="15%" maxWidth="15vw" align="left" title={bandwidthPort.fne_name} subTitle={bandwidthPort.fpostion_in ? `(${bandwidthPort.fpostion_in})` : '-'} boldTitle />
        <ElipsisCell width="15%" align="left" text={bandwidthPort.fport_name} />
        <ElipsisCell width="15%" align="left" text={bandwidthPort.fdescription || '-'} />
        <ElipsisCell width="10%" align="left" text={bandwidthPort.organization_name} />
        <ElipsisCell width="10%" align="left" text={`${bandwidthPort.first_name} ${bandwidthPort.last_name}`} />
        <TitleSubtitle width="10%" maxWidth="10vw" align="left" title={date} subTitle={time} />
        <ElipsisCell width="10%" align="left" text={`${diffrence} ${differenceUnit}`} />
        <TableCell align="left" width="5%">
          {
            bandwidthPort.fverified
              ? <img src={VerifiedImage} alt="Verified" />
              : <Button className="btn-verify" variant="success" text="Verify" loading={!!(verifyLoadingId && verifyLoadingId === bandwidthPort.f_port_id)} onClick={() => handleVerifyBtnClick(bandwidthPort.f_port_id)} spinnerSize={20} />
          }
        </TableCell>
      </TableRow>
    </>
  );
};

export default NotVerifiedBandwidthRow;
