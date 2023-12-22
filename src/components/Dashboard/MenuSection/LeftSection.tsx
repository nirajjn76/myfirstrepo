import React, { useState, useCallback } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { Popover } from 'react-tiny-popover';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';
import ShowPortsExpanded from '../../../assets/images/show-ports-expanded.svg';
import ShowPortsCollapsed from '../../../assets/images/show-ports-collapsed.svg';
import CheckboxIcon from '../../../assets/images/checkbox-unchecked.svg';
import CheckboxCheckedIcon from '../../../assets/images/checkbox-checked.svg';
import Help from '../../../assets/images/help.svg';
import PortGreen from '../../../assets/images/port-green.svg';
import PortGrey from '../../../assets/images/port-grey.svg';
import PortYellow from '../../../assets/images/port-yellow.svg';
import PortRed from '../../../assets/images/port-red.svg';
import PortWhite from '../../../assets/images/port-white.svg';
import CloseBtn from '../../../assets/images/btn-close.svg';

interface LeftSectionProps {
  onNeOpen: () => void;
  selectNEOpen: boolean;
  selectedNes: any[],
  isDirty: boolean;
  handleSaveReset?: any;
}

const LeftSection: React.FC<LeftSectionProps> = ({
  onNeOpen, selectNEOpen, selectedNes, isDirty, handleSaveReset,
}) => {
  const [showPortsOpen, setShowPortsOpen] = useState<boolean>(false);
  const [showPortStates, setShowPortStates] = useState<boolean>(false);

  const [showPortsState, setShowPortsState] = React.useState({
    servicePorts: false,
    bandwidthPorts: false,
    onDemandPorts: false,
  });

  const { servicePorts, bandwidthPorts, onDemandPorts } = showPortsState;

  const handleShowPortsPopoverMainClick = useCallback(() => {
    setShowPortsOpen((prevValue) => !prevValue);
  }, [setShowPortsOpen]);

  const handlePortStatesPopoverMainClick = useCallback(() => {
    setShowPortStates((prevValue) => !prevValue);
  }, [setShowPortStates]);

  const handleShowPortsChange = useCallback((event: any) => {
    setShowPortsState({ ...showPortsState, [event.target.name]: event.target.checked });
  }, [showPortsState, setShowPortsState]);

  return (
    <div className="root">
      <div className="save-cancel">
        <button className="save" disabled={!isDirty} onClick={() => handleSaveReset(true)}>
          Save
        </button>
        <button className="cancel" disabled={!isDirty} onClick={() => handleSaveReset(false)}>
          Reset
        </button>
      </div>
      {
        selectedNes.length > 0 ? (
          <div className={clsx('select-node', selectNEOpen && 'selected')} onClick={onNeOpen}>
            <label>Select Node</label>
            <AddIcon className="add-icon" />
          </div>
        )
          : <div className="empty-node" />
      }
      {/* <div className="show-ports">
        <Popover
          isOpen={showPortsOpen}
          positions={['bottom']}
          padding={1}
          reposition={false}
          onClickOutside={() => setShowPortsOpen(false)}
          content={() => (
            <div className="show-ports-expanded-main">
              <div>
                <FormControlLabel
                  control={(
                    <Checkbox
                      classes={{
                        root: 'show-ports-checkbox',
                      }}
                      color="default"
                      checked={servicePorts}
                      onChange={handleShowPortsChange}
                      icon={<img src={CheckboxIcon} alt="Checkbox" className="checkbox-icon" />}
                      checkedIcon={<img src={CheckboxCheckedIcon} alt="Checkbox Checked" className="checkbox-checked-icon" />}
                      name="servicePorts"
                    />
                  )}
                  label="Service Ports"
                />
              </div>
              <div>
                <FormControlLabel
                  control={(
                    <Checkbox
                      classes={{
                        root: 'show-ports-checkbox',
                      }}
                      color="default"
                      checked={bandwidthPorts}
                      onChange={handleShowPortsChange}
                      icon={<img src={CheckboxIcon} alt="Checkbox" className="checkbox-icon" />}
                      checkedIcon={<img src={CheckboxCheckedIcon} alt="Checkbox Checked" className="checkbox-checked-icon" />}
                      name="bandwidthPorts"
                    />
                  )}
                  label="Bandwidth Ports"
                />
              </div>
              <div>
                <FormControlLabel
                  control={(
                    <Checkbox
                      classes={{
                        root: 'show-ports-checkbox',
                      }}
                      color="default"
                      checked={onDemandPorts}
                      onChange={handleShowPortsChange}
                      icon={<img src={CheckboxIcon} alt="Checkbox" className="checkbox-icon" />}
                      checkedIcon={<img src={CheckboxCheckedIcon} alt="Checkbox Checked" className="checkbox-checked-icon" />}
                      name="onDemandPorts"
                    />
                  )}
                  label="On-demand Ports"
                />
              </div>
            </div>
          )}
        >
          <div className="popover-main" onClick={handleShowPortsPopoverMainClick}>
            <label>Show Ports</label>
            <img src={showPortsOpen ? ShowPortsCollapsed : ShowPortsExpanded} alt="Show Hide" />
          </div>
        </Popover>
      </div> */}
      <div className="port-states">
        <Popover
          isOpen={showPortStates}
          positions={['bottom']}
          padding={25}
          reposition={false}
          onClickOutside={() => setShowPortStates(false)}
          content={() => (
            <div className="port-states-expanded-main">
              <div>
                <img src={CloseBtn} alt="Cancel" className="cancel-icon" onClick={() => setShowPortStates(false)} />
              </div>
              <div>
                <img src={PortGreen} alt="Port State Green" className="port-state-icon" />
                <label>The port is immediately available</label>
              </div>
              <div>
                <img src={PortGrey} alt="Port State Grey" className="port-state-icon" />
                <label>The port is pending validation or is otherwise “offline”</label>
              </div>
              <div>
                <img src={PortWhite} alt="Port State White" className="port-state-icon" />
                <label>The port is available in marketplace</label>
              </div>
              <div>
                <img src={PortYellow} alt="Port State Yello" className="port-state-icon" />
                <label>User owns the port, but it is listed in the marketplace</label>
              </div>
              <div>
                <img src={PortRed} alt="Port State Red" className="port-state-icon" />
                <label>User sold the resource in the marketplace</label>
              </div>
            </div>
          )}
        >
          <div className="popover-main" onClick={handlePortStatesPopoverMainClick}>
            <img src={Help} alt="Port States" />
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default LeftSection;
