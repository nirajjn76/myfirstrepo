import React, { useState, useCallback } from 'react';
import MapView from '../MapviewMarketplace/MapView';
import Drawer from './Drawer';

interface MyNetworkMapViewProps {
  networkElements: any[];
  bandwidthPorts: any[];
  count: number;
  onBandwidthClick: (neId: string, feId: string) => void;
  loading: boolean;
  searchText: string;
  onSearchChange: (e: any) => void;
  onSearchClicked: (e: any) => void;
  listBandwidths: {
    available: any[], consumed: any[], sold: any[]
  }
}

const MyNetworkMapView: React.FC<MyNetworkMapViewProps> = ({
  networkElements, bandwidthPorts, count, searchText, loading, listBandwidths, onBandwidthClick, onSearchChange, onSearchClicked,
}) => {
  const [drawerContent, setDrawerContent] = useState<'list' | 'details' | ''>('');
  const [bandwidthDetails, setBandwidthDetails] = useState<any>({});
  const [nodeIds, setNodeIds] = useState<any[]>([]);
  const [neNames, setNeNames] = useState<{
    nneName: string,
    fneName: string
  }>({
    nneName: '',
    fneName: '',
  });

  const handleDrawerContentChange = useCallback((content: 'list' | 'details', bandwidth: any) => {
    setDrawerContent(content);
    setBandwidthDetails(bandwidth);
  }, [setDrawerContent, setBandwidthDetails]);

  const handleBandwidthClick = useCallback((neId: string, feId: string, details?: any) => {
    setNodeIds([neId, feId]);
    const nne = networkElements.find((item) => item.id === neId);
    const fne = networkElements.find((item) => item.id === feId);
    setNeNames({
      nneName: nne.ne_name,
      fneName: fne.ne_name,
    });
    onBandwidthClick(neId, feId);
    if (details.count === 1) {
      setDrawerContent('details');
      setBandwidthDetails(details);
    } else {
      setDrawerContent('list');
    }
  }, [setNodeIds, setNeNames, setDrawerContent, onBandwidthClick, networkElements]);

  const handleDrowerClose = useCallback(() => {
    onSearchChange({ target: { value: '' } });
    setDrawerContent('');
  }, [onSearchChange, setDrawerContent]);

  return (
    <>
      <MapView onBandwidthClick={handleBandwidthClick} networkElements={networkElements} bandwidthPorts={bandwidthPorts} nodeIds={nodeIds} myNetwork />
      <Drawer loading={loading} searchText={searchText} onSearchClicked={onSearchClicked} bandwidthDetails={bandwidthDetails} neNames={neNames} open={!!drawerContent} drawerContent={drawerContent} listBandwidths={listBandwidths} onClose={handleDrowerClose} onDrawerContentChange={handleDrawerContentChange} count={count} onSearchChange={onSearchChange} />
    </>
  );
};

export default MyNetworkMapView;
