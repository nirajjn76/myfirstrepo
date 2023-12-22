import * as dotenv from 'dotenv';

import HomeHover from '../assets/images/home-hover.svg';
import HomeSelected from '../assets/images/home-selected.svg';
import AddNetworkResourceHover from '../assets/images/add-network-resource-hover.svg';
import AddNetworkResourceSelected from '../assets/images/add-network-resource-selected.svg';
import ManageAssetsHover from '../assets/images/manage-assets-hover.svg';
import ManageAssetsSelected from '../assets/images/manage-assets-selected.svg';
import MarketPlaceHover from '../assets/images/marketplace-hover.svg';
import MarketPlaceSelected from '../assets/images/marketplace-selected.svg';
import ValidationHover from '../assets/images/validation-hover.svg';
import ValidationSelected from '../assets/images/validation-selected.svg';
import WXPayHover from '../assets/images/wx-pay-hover.svg';
import WXPaySelected from '../assets/images/wx-pay-selected.svg';
import AboutHover from '../assets/images/about-hover.svg';
import AboutSelected from '../assets/images/about-selected.svg';
import AddPort from '../assets/images/add-port.svg';
import AddBandwidth from '../assets/images/add-bandwidth.svg';
import { Roles, AuthRoutes } from '../enums';

dotenv.config();

export const RegistrationFieldsMapping = {
  fname: 'fname',
  lname: 'lname',
  uname: 'uname',
  email: 'email',
  contact: 'contact',
  company: 'company',
  password: 'password',
  confirmPassword: 'confirmPassword',
  address: 'address',
  country: 'country',
  state: 'state',
  city: 'city',
  zip: 'zip',
};

export const LoginFieldsMapping = {
  userId: 'userId',
  password: 'password',
};

export const ErrorMessages = {
  register: {
    passwordsNotMatch: 'Password and Confirm Password should match.',
    emailNotValid: 'Please enter valid Email Id.',
  },
  addPort: {
    noOfPortsMinLimit: 'Min value allowed is 1.',
    noOfPortsRequired: 'No. of Port to be added is required.',
  },
  addBandwidth: {
    noOfLinksMinLimit: 'Min value allowed is 1.',
    noOfLinksRequired: 'No. of Links to be added is required.',
  },
};

export const TableConstants = {
  perPage: 10,
  wxPayPerPage: 8,
  bandwidthPortsPerPage: 5,
  noRecordsFound: 'No records to display',
};

export const Regex = {
  email: /^([a-zA-Z0-9_\.\-+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  numbers: /^[0-9]+$/,
};
export const YearDaysForCalculation = 365.2524;
export const ArrayOfCharactersNotAllowedInNumericField = ['e', 'E', '+', '-', '.'];
export const ArrayOfCharactersNotAllowedInNumericFloatField = ['e', 'E', '+', '-'];
export const DefaultRxTxValue = 0;
export interface HeadCellType {
  disablePadding: boolean;
  id: string;
  align: 'left' | 'right' | 'center';
  sortEnabled: boolean;
  width: string;
  label?: string;
  searchEnabled?: boolean;
  tooltipTitle?: string;
  tooltipPlacement?:
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top';
}

export interface DropdownOptions {
  text: string;
  value: any
}

export interface ChildMenuType {
  text: string;
  icon?: any;
  redirectsTo?: string,
}

export interface MenuType {
  text: string;
  id?: string;
  icon: any;
  selectedIcon: any;
  disabled: boolean;
  accessibleTo: Roles,
  redirectsTo?: AuthRoutes,
  childMenus?: ChildMenuType[]
}

export const MenuTextMapping = {
  home: 'home',
  addNetworkResource: 'addNetworkResource',
  validation: 'validation',
  marketplace: 'marketplace',
  manageAssets: 'manageAssets',
  wxPay: 'wxPay',
  about: 'about',
};

export const Menus: MenuType[] = [
  {
    text: 'Home',
    id: MenuTextMapping.home,
    icon: HomeHover,
    selectedIcon: HomeSelected,
    disabled: false,
    accessibleTo: Roles.user,
    redirectsTo: AuthRoutes.dashboard,
  },
  {
    text: 'Add a Network Resource',
    icon: AddNetworkResourceHover,
    selectedIcon: AddNetworkResourceSelected,
    id: MenuTextMapping.addNetworkResource,
    disabled: true,
    accessibleTo: Roles.user,
    childMenus: [
      {
        text: 'Add Port',
        icon: AddPort,
        redirectsTo: AuthRoutes.addPort,
      },
      {
        text: 'Add Bandwidth',
        icon: AddBandwidth,
        redirectsTo: AuthRoutes.addBandwidth,
      },
    ],
  },
  {
    text: 'Manage Assets',
    icon: ManageAssetsHover,
    selectedIcon: ManageAssetsSelected,
    id: MenuTextMapping.manageAssets,
    disabled: true,
    accessibleTo: Roles.user,
    childMenus: [
      {
        text: 'Manage Port',
        icon: AddPort,
        redirectsTo: AuthRoutes.managePorts,
      },
      {
        text: 'Manage Bandwidth',
        icon: AddBandwidth,
        redirectsTo: AuthRoutes.manageBandwidth,
      },
    ],
  },
  {
    text: 'MarketPlace',
    icon: MarketPlaceHover,
    selectedIcon: MarketPlaceSelected,
    id: MenuTextMapping.marketplace,
    disabled: false,
    accessibleTo: Roles.user,
    redirectsTo: AuthRoutes.marketPlacePorts,
  },
  {
    text: 'Validation',
    icon: ValidationHover,
    selectedIcon: ValidationSelected,
    disabled: true,
    id: MenuTextMapping.validation,
    accessibleTo: Roles.admin,
    childMenus: [
      {
        text: 'New User',
        redirectsTo: AuthRoutes.userVerification,
      },
      {
        text: 'Physical Validation',
        redirectsTo: AuthRoutes.portVerification,
      },
      {
        text: 'Cross Connect',
        redirectsTo: AuthRoutes.crossConnectValidation,
      },
      {
        text: 'Delete Ports',
        redirectsTo: AuthRoutes.deletePorts,
      },
    ],
  },
  {
    text: 'WX Pay',
    icon: WXPayHover,
    selectedIcon: WXPaySelected,
    id: MenuTextMapping.wxPay,
    disabled: false,
    accessibleTo: Roles.user,
    redirectsTo: AuthRoutes.wxPay,
  },
  {
    text: 'About WaveXchange',
    icon: AboutHover,
    selectedIcon: AboutSelected,
    disabled: false,
    id: MenuTextMapping.about,
    accessibleTo: Roles.admin,
    redirectsTo: AuthRoutes.about,
  },
];

export const RolesTextMapping: any = {
  [Roles.admin]: 'Admin',
  [Roles.user]: 'Enterprise User',
};

export const RolesDropdown: DropdownOptions[] = [{
  text: 'Admin',
  value: Roles.admin,
}, {
  text: 'Enterprise User',
  value: Roles.user,
}];

export const priceFilterDropdown: DropdownOptions[] = [{
  text: 'Both',
  value: 'both',
}, {
  text: 'On Contract',
  value: 'oncontract',
}, {
  text: 'On Demand',
  value: 'ondemand',
}];

export const RoutesMapping = {
  [MenuTextMapping.home]: [AuthRoutes.dashboard],
  [MenuTextMapping.addNetworkResource]: [AuthRoutes.addPort, AuthRoutes.addBandwidth],
  [MenuTextMapping.marketplace]: [AuthRoutes.marketPlacePorts, AuthRoutes.marketPlaceBandwidth],
  [MenuTextMapping.validation]: [AuthRoutes.userVerification, AuthRoutes.portVerification, AuthRoutes.bandwidthVerification, AuthRoutes.crossConnectValidation, AuthRoutes.deletePorts, AuthRoutes.deleteBandwidthPorts],
  [MenuTextMapping.wxPay]: [AuthRoutes.wxPay],
  [MenuTextMapping.about]: [AuthRoutes.about],
  [MenuTextMapping.manageAssets]: [AuthRoutes.managePorts, AuthRoutes.manageBandwidth],

};

export const PURCHASE_PORT_CHARGE_PER_MONTH = process.env.REACT_APP_PURCHASE_PORT_CHARGE_PER_MONTH ? parseInt(process.env.REACT_APP_PURCHASE_PORT_CHARGE_PER_MONTH) : 0;

export const PORT_NAME_PREFIX = {
  GROUP_ID: 'GROUP_ID_',
  PORT_ID: 'PORT_ID_',
  PURCHASE_PORT_ID: 'PURCHASE_PORT_ID_',
};

export const STATUS_TYPE = {
  FOR_SALE_PORT: 'port_put_up_for_sale',
  BOUGHT_PORT: 'bought_port',
  FOR_SALE_BW: 'put_up_for_sale_bandwidth',
  BOUGHT_BW: 'bought_bandwidth',
};

export const STATUS_COLOR = {
  FOR_SELL_OTHERS: '#fff', // white, #fff
  FOR_SELL: '#ebd02e', // yellow, #ebd02e
  SOLD: '#ff0219', // red, #ff0219
  UN_VERIFY: '#afafaf', // gray, #afafaf
  PURCHASED: '#17ce26', // green, #17ce26
  VERIFY: '#17ce26', // green, #17ce26
};
