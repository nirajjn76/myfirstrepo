import React from 'react';
import AddPortForm from '../components/AddPort';

const AddPort: React.FC = () => {
  return (
    <div className="add-port-root">
      <h3>Add Port</h3>
      <AddPortForm />
    </div>
  );
};

export default AddPort;
