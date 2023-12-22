import React from 'react';
import AddBandwidthForm from '../components/AddBandwidth';

const AddBandwidth: React.FC = () => {
  return (
    <div className="add-bandwidth-root">
      <h3>Add Bandwidth</h3>
      <AddBandwidthForm />
    </div>
  );
};

export default AddBandwidth;
