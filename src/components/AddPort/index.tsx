import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../DesignSystem/button';
import AddPortForm from './form';
import AddPortService from '../../services/addPort.service';
import DashboardService from '../../services/dashboard.service';
import { Regex, ErrorMessages, DefaultRxTxValue } from '../../utils/appConstants';
import { AuthRoutes } from '../../enums';
import { ErrorCodeMessageMapping, ErrorCodesMapping, SuccessMessage } from '../../utils/apiConstants';
import ErrorInfoIcon from '../../assets/images/error-info-icon.svg';
import SuccessInfoIcon from '../../assets/images/success-toast-checkmark-icon.svg';

const AddPort: React.FC = () => {
  const { state } = useLocation();
  const [selectedNe, setselectedNe] = useState<any>(state);
  const navigate = useNavigate();
  const [selectedNetworkElement, setSelectedNetworkElement] = useState<any>({});
  const [portDescription, setPortDescription] = useState<string>('');
  const [noOfPortsError, setNoOfPortsError] = useState<string>('');
  const [noOfPortsApiError, setNoOfPortsApiError] = useState<string>('');
  const [noOfPortsToAdd, setNoOfPortsToAdd] = useState<number | string>(1);
  const [networkElements, setNetworkElements] = useState<any[]>([]);
  const [portTypes, setPortTypes] = useState<any[]>([]);
  const [portsInfo, setPortsInfo] = useState<any[]>([]);
  const [addPortsLoading, setAddPortsLoading] = useState<boolean>(false);

  const fetchNetworkElementsAndPortTypes = useCallback(() => {
    AddPortService.getNetworkElements()
      .then((response: any) => {
        setNetworkElements(response.data || []);
        setSelectedNetworkElement(selectedNe || response.data[0]);

        AddPortService.getPortTypes()
          .then((responsePortTypes: any) => {
            setPortTypes(responsePortTypes.data || []);
            setPortsInfo([{
              id: 1,
              portName: `${selectedNe ? selectedNe.ne_name : response.data[0].ne_name} Port 1`,
              rx: DefaultRxTxValue,
              tx: DefaultRxTxValue,
              portTypeId: responsePortTypes.data[0]?.id,
            }]);
          })
          .catch(() => {
            setPortTypes([]);
          });
      })
      .catch(() => {
        setNetworkElements([]);
      });
  }, [setNetworkElements, setPortTypes]);

  useEffect(() => {
    fetchNetworkElementsAndPortTypes();
  }, [fetchNetworkElementsAndPortTypes]);

  const handleNetworkElementChange = useCallback((value: any) => {
    const networkElement = networkElements.find((ne) => ne.id === parseInt(value));
    setSelectedNetworkElement(networkElement);

    const tempPortsInfo = [];
    for (let i = 1; i <= noOfPortsToAdd; i++) {
      tempPortsInfo.push({
        id: i,
        portName: `${networkElement.ne_name} Port ${i}`,
        rx: DefaultRxTxValue,
        tx: DefaultRxTxValue,
        portTypeId: portTypes[0].id,
      });
    }
    setPortsInfo(tempPortsInfo);
  }, [networkElements, portTypes, noOfPortsToAdd]);

  const handlePortDescriptionChange = useCallback((e: any) => {
    setPortDescription(e.target.value || '');
  }, [setPortDescription]);

  const handleNoOfPortsChange = useCallback((e: any) => {
    if (e.target.value.trim() === '') {
      setNoOfPortsToAdd('');
      setNoOfPortsError(ErrorMessages.addPort.noOfPortsRequired);
    } else if (parseInt(e.target.value.trim()) === 0) {
      setNoOfPortsToAdd(e.target.value.trim());
      setNoOfPortsError(ErrorMessages.addPort.noOfPortsMinLimit);
    } else if (Regex.numbers.test(e.target.value.trim())) {
      setNoOfPortsToAdd(parseInt(e.target.value.trim()));
      setNoOfPortsError('');

      const tempPortsInfo = [];
      for (let i = 1; i <= parseInt(e.target.value.trim()); i++) {
        tempPortsInfo.push({
          id: i,
          portName: `${selectedNetworkElement.ne_name} Port ${i}`,
          rx: DefaultRxTxValue,
          tx: DefaultRxTxValue,
          portTypeId: portTypes[0].id,
        });
      }
      setPortsInfo(tempPortsInfo);
    }
  }, [setNoOfPortsToAdd, setNoOfPortsError, setPortsInfo, DefaultRxTxValue, selectedNetworkElement, portTypes]);

  const handlePortTypeChange = useCallback((portTempId: number, portTypeId: number) => {
    const tempPortsInfo = portsInfo.map((portInfo) => {
      if (portInfo.id === portTempId) {
        return {
          ...portInfo,
          portTypeId,
        };
      }
      return portInfo;
    });
    setPortsInfo(tempPortsInfo);
  }, [portsInfo, setPortsInfo]);

  const handlePortNameChange = useCallback((portTempId: number, portName: string) => {
    const tempPortsInfo = portsInfo.map((portInfo) => {
      if (portInfo.id === portTempId) {
        return {
          ...portInfo,
          portName,
        };
      }
      return portInfo;
    });
    setPortsInfo(tempPortsInfo);
  }, [portsInfo, setPortsInfo]);

  const handleAddPortsClick = useCallback(() => {
    setAddPortsLoading(true);

    const payload = {
      neId: selectedNetworkElement.id,
      nodeId: selectedNetworkElement.node_id,
      portDescription: portDescription.trim(),
      portDetails: portsInfo.map((portInfo) => {
        return {
          ...portInfo,
          portName: portInfo.portName.trim(),
        };
      }),
    };

    AddPortService.addPorts(payload)
      .then(() => {
        setAddPortsLoading(false);
        setNoOfPortsApiError('');
        toast.success(SuccessMessage.addPort, { icon: <img src={SuccessInfoIcon} alt="Success" /> });

        DashboardService.getSelectedNodes()
          .then((response: any) => {
            const payload = {
              nodeIds: Array.from(new Set([...response.data.selected_node_ids, selectedNetworkElement.id])),
            };

            DashboardService.getNodeWiseNr(payload)
              .then((response: any) => {
                setTimeout(() => {
                  navigate(AuthRoutes.dashboard);
                }, 0);
              });
          });
      })
      .catch((e: any) => {
        setAddPortsLoading(false);
        if (e.errorCode === ErrorCodesMapping[1006]) {
          setNoOfPortsApiError(ErrorCodeMessageMapping[1006]);
        }
        if (e.errorCode === ErrorCodesMapping[1007]) {
          toast.error(ErrorCodeMessageMapping[1007], { icon: <img src={ErrorInfoIcon} alt="Error" className="error-icon" /> });
          setNoOfPortsApiError('');
        }
      });
  }, [selectedNetworkElement, portDescription, portsInfo, setAddPortsLoading, setNoOfPortsApiError]);

  const addPortDisabled = !!(noOfPortsError || !portDescription.trim() || portsInfo.find((portInfo) => !portInfo.portName.trim()));

  const handleKeypress = useCallback((e) => {
    if (e.key === 'Enter' && !addPortDisabled) {
      handleAddPortsClick();
    }
  }, [handleAddPortsClick, addPortDisabled]);

  return (
    <div className="form-root">
      <div className="form-main">
        <AddPortForm networkElementOptions={networkElements} portTypeOptions={portTypes} selectedNetworkElement={selectedNetworkElement} portDescription={portDescription} noOfPortsToAdd={noOfPortsToAdd} noOfPortsError={noOfPortsApiError || noOfPortsError} portsInfo={portsInfo} onKeypress={handleKeypress} onNetworkElementChange={handleNetworkElementChange} onPortDescriptionChange={handlePortDescriptionChange} onNoOfPortsChange={handleNoOfPortsChange} onPortTypeChange={handlePortTypeChange} onPortNameChange={handlePortNameChange} />
      </div>
      <div className="btn-root">
        <Link to={AuthRoutes.dashboard} className="cancel-btn-link"><Button variant="greyed" className="btn cancel-btn" text="Cancel" /></Link>
        <Button variant="primary" className="btn" text="Add Port" disabled={addPortDisabled} loading={addPortsLoading} onClick={handleAddPortsClick} />
      </div>
    </div>
  );
};

export default AddPort;
