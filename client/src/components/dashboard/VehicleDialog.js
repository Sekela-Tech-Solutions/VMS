import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const VehicleDialog = ({ open, onClose, onSubmit, vehicle, type }) => {
  const [vehicleData, setVehicleData] = useState({
    name: '',
    brand: '',
    model: '',
    price: '',
    status: ''
  });

  useEffect(() => {
    if (vehicle) {
      setVehicleData(vehicle);
    }
  }, [vehicle]);

  const handleInputChange = (e) => {
    setVehicleData({
      ...vehicleData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    onSubmit(vehicleData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{type === 'update' ? 'Update Vehicle' : 'Change Status'}</DialogTitle>
      <DialogContent>
        {type === 'update' ? (
          <>
            <TextField
              label="Name"
              fullWidth
              name="name"
              value={vehicleData.name}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              label="Brand"
              fullWidth
              name="brand"
              value={vehicleData.brand}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              label="Model"
              fullWidth
              name="model"
              value={vehicleData.model}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              label="Price"
              fullWidth
              type="number"
              name="price"
              value={vehicleData.price}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              label="Status"
              fullWidth
              name="status"
              value={vehicleData.status}
              onChange={handleInputChange}
              margin="normal"
            />
          </>
        ) : (
          <>
            <p>Change the status to {vehicleData.status === 'NEW' ? 'SOLD' : 'NEW'}?</p>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">{type === 'update' ? 'Update' : 'Change Status'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleDialog;
