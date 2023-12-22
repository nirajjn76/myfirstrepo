import { describe, jest, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import PurchaseBandwidthForm, { PurchaseBandwidthFormProps } from '../../../../components/BandwidthMarketplace/PurchaseBandwidth/PurchaseBandwidthForm';

describe('<PurchaseBandwidthForm />', () => {
  test('Should render purchase bandwidth form', () => {
    const props: PurchaseBandwidthFormProps = {
      selectedRowForPurchase: {},
      values: {},
      onContractSelected: true,
      agreementSelected: {
        on_contract: true,
        on_demand: true,
      },
      onDemandSelected: true,
      onContractPrice: '12',
      onDemandPrice: '12',
      disabled: false,
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
    const { getByText } = render(<PurchaseBandwidthForm {...props} />);

    expect(getByText('Purchase Bandwidth')).toBeInTheDocument();
  });
});
