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
  typeOptions: any[];
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
  onTypeChange: (value: any) => void;
  handlePutupForSaleClick: () => void;
  handleServiceDescription: (e: any) => void;
  handleOnContractPriceChange: (e: any) => void;
  handleOnDemandPriceChange: (e: any) => void;
  handleOnContractSelected: (e: any) => void;
  handleOnDemandSelected: (e: any) => void;
  onClose: () => void;
}

const SaleDrawer: React.FC<SaleDrawerProps> = ({
  open, edit, loading, onClose, selectedRowSale, serviceDescription, onContractSelected, isDBPrice, onDemandSelected, onContractPrice, onDemandPrice, typeOptions, type, saleTouched, onTypeChange, handlePutupForSaleClick, handleServiceDescription, handleOnContractPriceChange, handleOnDemandPriceChange, handleOnContractSelected, handleOnDemandSelected, aggrementAccepted, onAggredTermsClick, onAcceptAggrement,
}) => {
  const saleDisabled = !serviceDescription || (edit && !saleTouched) || (onContractSelected && (!onContractPrice || parseFloat(onContractPrice) === 0 || !aggrementAccepted.on_contract)) || (onDemandSelected && (!onDemandPrice || parseFloat(onDemandPrice) === 0 || !aggrementAccepted.on_demand)) || (!onContractSelected && !onDemandSelected) || (!onContractPrice && !onDemandPrice);

  return (
    <DrawerMenu
      overlayOpacity={0}
      className="manage-ports-drawer"
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

      <PutUpForSaleForm aggrementAccepted={aggrementAccepted} isDBPrice={isDBPrice} onAggredTermsClick={onAggredTermsClick} onAcceptAggrement={onAcceptAggrement} loading={loading} edit={edit} type={type} onClose={onClose} onContractSelected={onContractSelected} onDemandSelected={onDemandSelected} typeOptions={typeOptions} onTypeChange={onTypeChange} onContractPrice={onContractPrice} onDemandPrice={onDemandPrice} disabled={!!saleDisabled} serviceDescription={serviceDescription} handleServiceDescription={handleServiceDescription} handleOnContractPriceChange={handleOnContractPriceChange} handleOnDemandPriceChange={handleOnDemandPriceChange} handlePutupForSaleClick={handlePutupForSaleClick} handleOnContractSelected={handleOnContractSelected} handleOnDemandSelected={handleOnDemandSelected} selectedRowSale={selectedRowSale} />
    </DrawerMenu>
  );
};

export default SaleDrawer;
