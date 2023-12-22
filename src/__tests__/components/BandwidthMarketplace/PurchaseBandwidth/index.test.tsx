import { describe, jest, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import PurchaseDrawer, { PurchaseDrawerProps } from '../../../../components/BandwidthMarketplace/PurchaseBandwidth';

describe('<PurchaseDrawer />', () => {
  test('Should render purchase bandwidth drawer', () => {
    const props: PurchaseDrawerProps = {
      open: true,
      selectedRowForPurchase: {},
      values: {
        bandwidthDescription: '',
        nePortName: 'ab',
        neServiceDescription: 'ab',
        fePortName: 'ab',
        feServiceDescription: '',
      },
      onContractSelected: true,
      agreementSelected: {
        on_contract: true,
        on_demand: true,
      },
      onDemandSelected: true,
      onContractPrice: '12',
      onDemandPrice: '12',
      loading: true,
      selectedPrice: 'on_contract',
      mapView: true,
      onBackToListClick: jest.fn(),
      handlePurchaseClick: jest.fn(),
      handleInputChange: jest.fn(),
      handleAgreementSelected: jest.fn(),
      onClose: jest.fn(),
      onAggredTermsClick: jest.fn(),
      onSelectedPriceChange: jest.fn(),
    };
    const { getByText } = render(<PurchaseDrawer {...props} />);

    expect(getByText('Purchase Bandwidth')).toBeInTheDocument();
  });

  test('Should call on demand terms click', () => {
    const onAggredTermsClick = jest.fn();
    const props: PurchaseDrawerProps = {
      open: true,
      selectedRowForPurchase: {
        on_contract_price: 12,
        on_demand_price: 13,
      },
      values: {
        bandwidthDescription: '',
        nePortName: 'ab',
        neServiceDescription: 'ab',
        fePortName: 'ab',
        feServiceDescription: '',
      },
      onContractSelected: true,
      agreementSelected: {
        on_contract: true,
        on_demand: true,
      },
      onDemandSelected: true,
      onContractPrice: '12',
      onDemandPrice: '12',
      loading: true,
      selectedPrice: 'on_contract',
      mapView: true,
      onBackToListClick: jest.fn(),
      handlePurchaseClick: jest.fn(),
      handleInputChange: jest.fn(),
      handleAgreementSelected: jest.fn(),
      onClose: jest.fn(),
      onAggredTermsClick,
      onSelectedPriceChange: jest.fn(),
    };
    const { getByTestId } = render(<PurchaseDrawer {...props} />);

    fireEvent.click(getByTestId('on_demand_terms'));
    expect(onAggredTermsClick).toHaveBeenCalledTimes(1);
  });

  test('Should call on contract terms click', () => {
    const onAggredTermsClick = jest.fn();
    const props: PurchaseDrawerProps = {
      open: true,
      selectedRowForPurchase: {
        on_contract_price: 12,
        on_demand_price: 13,
      },
      values: {
        bandwidthDescription: '',
        nePortName: 'ab',
        neServiceDescription: 'ab',
        fePortName: 'ab',
        feServiceDescription: '',
      },
      onContractSelected: true,
      agreementSelected: {
        on_contract: true,
        on_demand: true,
      },
      onDemandSelected: true,
      onContractPrice: '12',
      onDemandPrice: '12',
      loading: true,
      selectedPrice: 'on_contract',
      mapView: true,
      onBackToListClick: jest.fn(),
      handlePurchaseClick: jest.fn(),
      handleInputChange: jest.fn(),
      handleAgreementSelected: jest.fn(),
      onClose: jest.fn(),
      onAggredTermsClick,
      onSelectedPriceChange: jest.fn(),
    };
    const { getByTestId } = render(<PurchaseDrawer {...props} />);

    fireEvent.click(getByTestId('on_contract_terms'));
    expect(onAggredTermsClick).toHaveBeenCalledTimes(1);
  });
});
