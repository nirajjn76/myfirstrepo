import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import WaveXchangeIcon from '../../../assets/images/wavexchange-small-icon.svg';
import AddBandwidthCanvasIcon from '../../../assets/images/add-bandwidth-canvas.svg';
import AddExistingNrCanvasIcon from '../../../assets/images/add-existing-nr-canvas.svg';
import DeleteIcon from '../../../assets/images/delete.svg';
import AWSIcon from '../../../assets/images/aws.svg';
import GlobeIcon from '../../../assets/images/globe.svg';
import Icon from '../../../assets/images/icon.svg';
import { AuthRoutes } from '../../../enums';

interface NRNodeOperationsProps {
  ports: any[];
  groups: any[];
  hover: boolean;
  selectedNe: any;
  onHover: (_: boolean) => void;
  onAddNROpen: (e: any) => void;
  onDeleteClick: (_: any) => void;
  onAddBandwidthOpen: (_: any) => void;
}

const NRNodeOperations: React.FC<NRNodeOperationsProps> = ({
  ports, groups, hover, selectedNe, onHover, onAddNROpen, onAddBandwidthOpen, onDeleteClick,
}) => {
  const navigate = useNavigate();
  // if (!hover) {
  const content = (
    <div className="un-hovered-root">
      <div>
        <img className="should-dragable" src={WaveXchangeIcon} alt="Company" />
        <label className="should-dragable">{selectedNe.ne_name}</label>
      </div>
      <div>
        {
          ((ports && ports.length > 0) || (groups && groups.length > 0)) && (
            <Tooltip
              classes={{
                tooltip: 'tooltip',
              }}
              title="Add Existing Network Resource"
              arrow
              placement="bottom"
            >
              <img src={AddExistingNrCanvasIcon} alt="Add Existing Network Resource" onClick={() => navigate(AuthRoutes.addPort, { state: selectedNe })} />
            </Tooltip>
          )
        }
        <Tooltip
          classes={{
            tooltip: 'tooltip',
          }}
          title="Add Existing Bandwidth"
          arrow
          placement="bottom"
        >
          <img src={AddBandwidthCanvasIcon} alt="Add Bandwidth" onClick={() => navigate(AuthRoutes.addBandwidth)} />
        </Tooltip>
        <Tooltip
          classes={{
            tooltip: 'tooltip',
          }}
          title="Delete Node From Canvas"
          arrow
          placement="bottom"
        >
          <img src={DeleteIcon} alt="Delete" onClick={() => onDeleteClick(selectedNe)} />
        </Tooltip>
      </div>
    </div>
  );
  // }
  // else {
  //   content = (
  //     <div className="hovered-root">
  //       <div>
  //         <div>
  //           <label>{selectedNe.ne_name}</label>
  //         </div>
  //         <div>
  //           {
  //             ((ports && ports.length > 0) || (groups && groups.length > 0)) && (
  //               <Tooltip
  //                 classes={{
  //                   tooltip: 'tooltip',
  //                 }}
  //                 title="Add Existing Network Resource"
  //                 arrow
  //                 placement="bottom"
  //               >
  //                 <img src={AddExistingNrCanvasIcon} alt="Add Existing Network Resource" onClick={onAddNROpen} />
  //               </Tooltip>
  //             )
  //           }
  //         </div>
  //       </div>
  //       <div>
  //         <img src={AWSIcon} alt="AWS" />
  //         <img src={GlobeIcon} alt="Globe" />
  //         <img src={Icon} alt="Icon" />
  //       </div>
  //     </div>
  //   );
  // }

  return content;
};

export default NRNodeOperations;
