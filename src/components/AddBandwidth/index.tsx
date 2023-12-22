import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { DefaultRxTxValue, ErrorMessages, Regex } from '../../utils/appConstants';
import Button from '../DesignSystem/button';
import AddBandwidthForm from './form';
import { AuthRoutes } from '../../enums';
import AddPortService from '../../services/addPort.service';
import DashboardService from '../../services/dashboard.service';
import { ErrorCodeMessageMapping, ErrorCodesMapping, SuccessMessage } from '../../utils/apiConstants';
import ErrorInfoIcon from '../../assets/images/error-info-icon.svg';
import SuccessInfoIcon from '../../assets/images/success-toast-checkmark-icon.svg';

const AddPort: React.FC = () => {
  const navigate = useNavigate();

  const [selectedNeNetworkElement, setSelectedNeNetworkElement] = useState<any>({});
  const [selectedFeNetworkElement, setSelectedFeNetworkElement] = useState<any>({});
  const [networkElements, setNetworkElements] = useState<any[]>([]);
  const [neNetworkElements, setNeNetworkElements] = useState<any[]>([]);
  const [feNetworkElements, setFeNetworkElements] = useState<any[]>([]);
  const [portTypes, setPortTypes] = useState<any[]>([]);
  const [nePortsInfo, setNePortsInfo] = useState<any[]>([]);
  const [fePortsInfo, setFePortsInfo] = useState<any[]>([]);
  const [bandwidthDescription, setBandwidthDescription] = useState<string>('');
  const [fePortDescription, setFePortDescription] = useState<string>('');
  const [nePortDescription, setNePortDescription] = useState<string>('');
  const [noOfLinksError, setNoOfLinksError] = useState<string>('');
  const [noOfLinksApiError, setNoOfLinksApiError] = useState<string>('');
  const [noOfLinksToAdd, setNoOfLinksToAdd] = useState<number | string>(1);
  const [addBandwidthLoading, setAddBandwidthLoading] = useState<boolean>(false);

  const fetchNetworkElementsAndPortTypes = useCallback(() => {
    AddPortService.getNetworkElements()
      .then((response: any) => {
        AddPortService.getPortTypes()
          .then((responsePortTypes: any) => {
            setPortTypes(responsePortTypes.data || []);
            setNetworkElements(response.data || []);
            setSelectedNeNetworkElement(response.data[0]);
            setSelectedFeNetworkElement(response.data[1]);
            setNeNetworkElements(response.data.filter((item: any, index: number) => index !== 1));
            setFeNetworkElements(response.data.filter((item: any, index: number) => index !== 0));
            setNePortsInfo([{
              id: 1,
              portName: `${response.data[0].ne_name} Port 1`,
              rx: DefaultRxTxValue,
              tx: DefaultRxTxValue,
              portTypeId: responsePortTypes.data[0]?.id,
            }]);
            setFePortsInfo([{
              id: 1,
              portName: `${response.data[1].ne_name} Port 1`,
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
  }, [setNetworkElements, setPortTypes, setSelectedNeNetworkElement, setSelectedFeNetworkElement, setNeNetworkElements, setFeNetworkElements, setNePortsInfo, setFePortsInfo]);

  useEffect(() => {
    fetchNetworkElementsAndPortTypes();
  }, [fetchNetworkElementsAndPortTypes]);

  const handleBandwidthDescriptionChange = useCallback((e: any) => {
    setBandwidthDescription(e.target.value);
  }, [setBandwidthDescription]);

  const handleFePortDescriptionChange = useCallback((e: any) => {
    setFePortDescription(e.target.value);
  }, [setFePortDescription]);

  const handleNePortDescriptionChange = useCallback((e: any) => {
    setNePortDescription(e.target.value);
  }, [setNePortDescription]);

  const handleNoOfLinksChange = useCallback((e: any) => {
    if (e.target.value.trim() === '') {
      setNoOfLinksToAdd('');
      setNoOfLinksError(ErrorMessages.addBandwidth.noOfLinksRequired);
    } else if (parseInt(e.target.value.trim()) === 0) {
      setNoOfLinksToAdd(e.target.value.trim());
      setNoOfLinksError(ErrorMessages.addBandwidth.noOfLinksMinLimit);
    } else if (Regex.numbers.test(e.target.value.trim())) {
      setNoOfLinksToAdd(parseInt(e.target.value.trim()));
      setNoOfLinksError('');

      const tempFePortsInfo = [];
      const tempNePortsInfo = [];
      for (let i = 1; i <= parseInt(e.target.value.trim()); i++) {
        tempFePortsInfo.push({
          id: i,
          portName: `${selectedFeNetworkElement.ne_name} Port ${i}`,
          rx: DefaultRxTxValue,
          tx: DefaultRxTxValue,
          portTypeId: portTypes[0].id,
        });

        tempNePortsInfo.push({
          id: i,
          portName: `${selectedNeNetworkElement.ne_name} Port ${i}`,
          rx: DefaultRxTxValue,
          tx: DefaultRxTxValue,
          portTypeId: portTypes[0].id,
        });
      }
      setNePortsInfo(tempNePortsInfo);
      setFePortsInfo(tempFePortsInfo);
    }
  }, [setNoOfLinksToAdd, setNoOfLinksError, setNePortsInfo, setFePortsInfo, DefaultRxTxValue, selectedNeNetworkElement, selectedFeNetworkElement, portTypes]);

  const handleNePortTypeChange = useCallback((portTempId: number, portTypeId: number) => {
    const tempPortsInfo = nePortsInfo.map((portInfo) => {
      if (portInfo.id === portTempId) {
        return {
          ...portInfo,
          portTypeId,
        };
      }
      return portInfo;
    });
    setNePortsInfo(tempPortsInfo);
  }, [nePortsInfo, setNePortsInfo]);

  const handleFePortTypeChange = useCallback((portTempId: number, portTypeId: number) => {
    const tempPortsInfo = fePortsInfo.map((portInfo) => {
      if (portInfo.id === portTempId) {
        return {
          ...portInfo,
          portTypeId,
        };
      }
      return portInfo;
    });
    setFePortsInfo(tempPortsInfo);
  }, [fePortsInfo, setFePortsInfo]);

  const handleNePortNameChange = useCallback((portTempId: number, portName: string) => {
    const tempPortsInfo = nePortsInfo.map((portInfo) => {
      if (portInfo.id === portTempId) {
        return {
          ...portInfo,
          portName,
        };
      }
      return portInfo;
    });
    setNePortsInfo(tempPortsInfo);
  }, [nePortsInfo, setNePortsInfo]);

  const handleFePortNameChange = useCallback((portTempId: number, portName: string) => {
    const tempPortsInfo = fePortsInfo.map((portInfo) => {
      if (portInfo.id === portTempId) {
        return {
          ...portInfo,
          portName,
        };
      }
      return portInfo;
    });
    setFePortsInfo(tempPortsInfo);
  }, [fePortsInfo, setFePortsInfo]);

  const handleFeNetworkElementChange = useCallback((value: any) => {
    const networkElement = feNetworkElements.find((ne) => ne.id === parseInt(value));
    setSelectedFeNetworkElement(networkElement);
    setNeNetworkElements(networkElements.filter((item: any) => item.id !== parseInt(value)));

    const tempPortsInfo = [];
    for (let i = 1; i <= noOfLinksToAdd; i++) {
      tempPortsInfo.push({
        id: i,
        portName: `${networkElement.ne_name} Port ${i}`,
        rx: DefaultRxTxValue,
        tx: DefaultRxTxValue,
        portTypeId: portTypes[0].id,
      });
    }
    setFePortsInfo(tempPortsInfo);
  }, [networkElements, feNetworkElements, portTypes, noOfLinksToAdd, setSelectedFeNetworkElement, setNeNetworkElements, setFePortsInfo]);

  const handleNeNetworkElementChange = useCallback((value: any) => {
    const networkElement = neNetworkElements.find((ne) => ne.id === parseInt(value));
    setSelectedNeNetworkElement(networkElement);
    setFeNetworkElements(networkElements.filter((item: any) => item.id !== parseInt(value)));

    const tempPortsInfo = [];
    for (let i = 1; i <= noOfLinksToAdd; i++) {
      tempPortsInfo.push({
        id: i,
        portName: `${networkElement.ne_name} Port ${i}`,
        rx: DefaultRxTxValue,
        tx: DefaultRxTxValue,
        portTypeId: portTypes[0].id,
      });
    }
    setNePortsInfo(tempPortsInfo);
  }, [networkElements, neNetworkElements, portTypes, noOfLinksToAdd, setSelectedNeNetworkElement, setFeNetworkElements, setNePortsInfo]);

  const handleSwipeClick = useCallback(() => {
    setNeNetworkElements(feNetworkElements);
    setFeNetworkElements(neNetworkElements);
    setFePortDescription(nePortDescription);
    setNePortDescription(fePortDescription);
    setFePortsInfo(nePortsInfo);
    setNePortsInfo(fePortsInfo);
    setSelectedNeNetworkElement(selectedFeNetworkElement);
    setSelectedFeNetworkElement(selectedNeNetworkElement);
  }, [neNetworkElements, feNetworkElements, fePortsInfo, nePortsInfo, fePortDescription, nePortDescription, selectedFeNetworkElement, selectedNeNetworkElement, setSelectedFeNetworkElement, setSelectedNeNetworkElement, setNeNetworkElements, setFeNetworkElements, setFePortDescription, setNePortDescription, setFePortsInfo, setNePortsInfo]);

  const handleAddBandwidthClick = useCallback(() => {
    setAddBandwidthLoading(true);

    const payload = {
      bandwidthDescription: bandwidthDescription.trim(),
      nePortsInfo: {
        neId: selectedNeNetworkElement.id,
        nodeId: selectedNeNetworkElement.node_id,
        portDescription: nePortDescription.trim(),
        portDetails: nePortsInfo.map((portInfo) => {
          return {
            ...portInfo,
            portName: portInfo.portName.trim(),
          };
        }),
      },
      fePortsInfo: {
        neId: selectedFeNetworkElement.id,
        nodeId: selectedFeNetworkElement.node_id,
        portDescription: fePortDescription.trim(),
        portDetails: fePortsInfo.map((portInfo) => {
          return {
            ...portInfo,
            portName: portInfo.portName.trim(),
          };
        }),
      },
    };

    AddPortService.addBandwidth(payload)
      .then(() => {
        setAddBandwidthLoading(false);
        setNoOfLinksApiError('');
        let successMessage = SuccessMessage.addBandwidth.replace('NE1', selectedNeNetworkElement.ne_name);
        successMessage = successMessage.replace('NE2', selectedFeNetworkElement.ne_name);
        toast.success(successMessage, { icon: <img src={SuccessInfoIcon} alt="Success" /> });

        DashboardService.getSelectedNodes()
          .then((response: any) => {
            const payload = {
              nodeIds: Array.from(new Set([...response.data.selected_node_ids, selectedNeNetworkElement.id, selectedFeNetworkElement.id])),
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
        setAddBandwidthLoading(false);
        if (e.errorCode === ErrorCodesMapping[1006]) {
          setNoOfLinksApiError(ErrorCodeMessageMapping[1008]);
        }
        if (e.errorCode === ErrorCodesMapping[1007]) {
          toast.error(ErrorCodeMessageMapping[1009], { icon: <img src={ErrorInfoIcon} alt="Error" className="error-icon" /> });
          setNoOfLinksApiError('');
        }
      });
  }, [setAddBandwidthLoading, setNoOfLinksApiError, bandwidthDescription, nePortsInfo, fePortsInfo, selectedNeNetworkElement, nePortDescription, selectedFeNetworkElement, fePortDescription]);

  const addBandwidthDisabled = !!(noOfLinksError || !bandwidthDescription.trim() || !fePortDescription.trim() || !nePortDescription.trim() || nePortsInfo.find((portInfo) => !portInfo.portName.trim()) || fePortsInfo.find((portInfo) => !portInfo.portName.trim()));

  const handleKeypress = useCallback((e) => {
    if (e.key === 'Enter' && !addBandwidthDisabled) {
      handleAddBandwidthClick();
    }
  }, [handleAddBandwidthClick, addBandwidthDisabled]);

  return (
    <div className="form-root">
      <div className="form-main">
        <AddBandwidthForm
          bandwidthDescription={bandwidthDescription}
          fePortDescription={fePortDescription}
          nePortDescription={nePortDescription}
          noOfLinksError={noOfLinksError}
          noOfLinksApiError={noOfLinksApiError}
          noOfLinksToAdd={noOfLinksToAdd}
          neNetworkElementOptions={neNetworkElements}
          feNetworkElementOptions={feNetworkElements}
          selectedNeNetworkElement={selectedNeNetworkElement}
          selectedFeNetworkElement={selectedFeNetworkElement}
          portTypeOptions={portTypes}
          nePortsInfo={nePortsInfo}
          fePortsInfo={fePortsInfo}
          onNeNetworkElementChange={handleNeNetworkElementChange}
          onFeNetworkElementChange={handleFeNetworkElementChange}
          onBandwidthDescriptionChange={handleBandwidthDescriptionChange}
          onFePortDescriptionChange={handleFePortDescriptionChange}
          onNePortDescriptionChange={handleNePortDescriptionChange}
          onNoOfLinksChange={handleNoOfLinksChange}
          onNePortTypeChange={handleNePortTypeChange}
          onFePortTypeChange={handleFePortTypeChange}
          onNePortNameChange={handleNePortNameChange}
          onFePortNameChange={handleFePortNameChange}
          onKeypress={handleKeypress}
          onSwipeClick={handleSwipeClick}
        />
      </div>
      <div className="btn-root">
        <Link to={AuthRoutes.dashboard} className="cancel-btn-link"><Button variant="greyed" className="btn cancel-btn" text="Cancel" /></Link>
        <Button variant="primary" className="btn" text="Add Bandwidth" loading={addBandwidthLoading} disabled={addBandwidthDisabled} onClick={handleAddBandwidthClick} />
      </div>
    </div>
  );
};

export default AddPort;
