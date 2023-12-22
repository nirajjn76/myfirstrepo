import { type } from 'os';
import React from 'react';
import DrawerMenu from 'react-modern-drawer';
import CloseBtn from '../../../../assets/images/close-drawer.svg';
import PutUpForSaleForm from './PutUpForSaleForm';

interface SaleDrawerProps {
  edit: boolean;
  open: boolean;
  loading: boolean;
  selectedRowSale: any;
  serviceDescription: string;
  onContractSelected: boolean;
  onDemandSelected: boolean;
  onContractPrice: string;
  onDemandPrice: string;
  type: string;
  saleTouched: boolean;
  aggrementAccepted: {
    on_contract: boolean,
    on_demand: boolean
  };
  isDBPrice: {
    onDemand: boolean,
    onContract: boolean
  }
  onAcceptAggrement: () => void;
  onAggredTermsClick: (_: string) => void;
  handlePutupForSaleClick: () => void;
  handleServiceDescription: (e: any) => void;
  handleOnContractPriceChange: (e: any) => void;
  handleOnDemandPriceChange: (e: any) => void;
  handleOnContractSelected: (e: any) => void;
  handleOnDemandSelected: (e: any) => void;
  onClose: () => void;
}

const SaleDrawer: React.FC<SaleDrawerProps> = ({
  open, loading, onClose, type, edit, saleTouched, selectedRowSale, serviceDescription, isDBPrice, aggrementAccepted, onAggredTermsClick, onAcceptAggrement, onContractSelected, onDemandSelected, onContractPrice, onDemandPrice, handlePutupForSaleClick, handleServiceDescription, handleOnContractPriceChange, handleOnDemandPriceChange, handleOnContractSelected, handleOnDemandSelected,
}) => {
  const saleDisabled = !serviceDescription || (edit && !saleTouched) || (onContractSelected && (!onContractPrice || parseFloat(onContractPrice) === 0 || !aggrementAccepted.on_contract)) || (onDemandSelected && (!onDemandPrice || parseFloat(onDemandPrice) === 0 || !aggrementAccepted.on_demand)) || (!onContractSelected && !onDemandSelected) || (!onContractPrice && !onDemandPrice);

  return (
    <DrawerMenu
      overlayOpacity={0}
      className="manage-bandwidth-drawer"
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

      <PutUpForSaleForm edit={edit} type={type} loading={loading} isDBPrice={isDBPrice} onClose={onClose} aggrementAccepted={aggrementAccepted} onAggredTermsClick={onAggredTermsClick} onAcceptAggrement={onAcceptAggrement} onContractSelected={onContractSelected} onDemandSelected={onDemandSelected} onContractPrice={onContractPrice} onDemandPrice={onDemandPrice} disabled={!!saleDisabled} serviceDescription={serviceDescription} handleServiceDescription={handleServiceDescription} handleOnContractPriceChange={handleOnContractPriceChange} handleOnDemandPriceChange={handleOnDemandPriceChange} handlePutupForSaleClick={handlePutupForSaleClick} handleOnContractSelected={handleOnContractSelected} handleOnDemandSelected={handleOnDemandSelected} selectedRowSale={selectedRowSale} />
    </DrawerMenu>
  );
};

export default SaleDrawer;
