import React from 'react';
import DrawerMenu from 'react-modern-drawer';
import CloseBtn from '../../../assets/images/close-drawer.svg';
import PurchaseForm from './PurchaseForm';

interface SaleDrawerProps {
  open: boolean;
  loading: boolean;
  selectedPrice: string;
  portName: string;
  portDescription: string;
  aggrementAccepted: {
    on_contract: boolean,
    on_demand: boolean
  };
  port: any;
  portOnContractPrice: string;
  portOnDemandPrice: string;
  onPortNameChange: (e: any) => void;
  onPortDescriptionChange: (e: any) => void;
  onSelectedPriceChange: (_: string) => void;
  onAcceptAggrement: () => void;
  onAggredTermsClick: (_: string) => void;
  onClose: () => void;
  onSaleClick: () => void;
}

const SaleDrawer: React.FC<SaleDrawerProps> = ({
  open, loading, port, selectedPrice, portName, portDescription, aggrementAccepted, portOnContractPrice, portOnDemandPrice, onAggredTermsClick, onPortNameChange, onPortDescriptionChange, onSelectedPriceChange, onAcceptAggrement, onClose, onSaleClick,
}) => {
  const saleDisabled = !!(!portName || !portDescription || !selectedPrice || (selectedPrice === 'on_contract' && !aggrementAccepted.on_contract) || (selectedPrice === 'on_demand' && !aggrementAccepted.on_demand));

  return (
    <DrawerMenu
      overlayOpacity={0}
      className="purchase-ports-drawer"
      open={open}
      onClose={onClose}
      duration={100}
      direction="right"
    >
      <div
        className="close-drawer-btn"
        onClick={onClose}
      >
        <img src={CloseBtn} alt="Close Drawer" />
      </div>

      <PurchaseForm disabled={saleDisabled} loading={loading} port={port} selectedPrice={selectedPrice} portName={portName} portOnContractPrice={portOnContractPrice} portOnDemandPrice={portOnDemandPrice} portDescription={portDescription} aggrementAccepted={aggrementAccepted} onPortNameChange={onPortNameChange} onPortDescriptionChange={onPortDescriptionChange} onSelectedPriceChange={onSelectedPriceChange} onAggredTermsClick={onAggredTermsClick} onAcceptAggrement={onAcceptAggrement} onClose={onClose} onSaleClick={onSaleClick} />
    </DrawerMenu>
  );
};

export default SaleDrawer;
