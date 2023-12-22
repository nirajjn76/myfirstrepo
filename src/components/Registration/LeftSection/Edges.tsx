import React from 'react';
import BuySellEdgeLogo from '../../../assets/images/buy-sell-edge.svg';
import ConnectNetworkResourceLogo from '../../../assets/images/connect-network-resource.svg';
import ManageNetworkResourceLogo from '../../../assets/images/manage-network-resource.svg';
import Edge from './Edge';

const Edges: React.FC = () => {
  return (
    <div className="edges">
      <Edge logo={BuySellEdgeLogo} text="Buy and sell edge compute and network services in a global marketplace" />
      <Edge logo={ConnectNetworkResourceLogo} text="Connect network resources in real-time with simple and intuitive graphical UI" />
      <Edge logo={ManageNetworkResourceLogo} text="Manage network resources from a single comprehensive dashboard" />
    </div>
  );
};

export default Edges;
