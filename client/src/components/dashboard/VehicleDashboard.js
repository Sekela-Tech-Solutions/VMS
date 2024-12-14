import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import api from '../../api/Api';
import Navbar from '../layout/Navbar';
import VehicleTable from './VehicleTable';
import VehicleDialog from './VehicleDialog';

const VehicleDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [openToast, setOpenToast] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await api.get('/vehicle');
      setVehicles(response.data);
    } catch (error) {
      showToast('Failed to fetch vehicles', 'error');
    }
  };

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setOpenToast(true);
  };

  const handleUpdate = (vehicle) => {
    setCurrentVehicle(vehicle);
    setOpenUpdateDialog(true);
  };

  const handleChangeStatus = (vehicle) => {
    setCurrentVehicle(vehicle);
    setOpenStatusDialog(true);
  };

  const handleDelete = (vehicle) => {
    setCurrentVehicle(vehicle);
    showToast('Vehicle deleted successfully', 'error');
  };

  const handleUpdateSubmit = async (updatedVehicle) => {
    try {
      await api.put(`/vehicle/${currentVehicle._id}`, updatedVehicle);
      fetchVehicles();
      setOpenUpdateDialog(false);
      showToast('Vehicle updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update vehicle', 'error');
    }
  };

  const handleStatusSubmit = async () => {
    try {
      const status = currentVehicle.status === "SOLD" ? "NEW" : "SOLD";
      await api.patch(`/vehicle/${currentVehicle._id}/status`, { status });
      fetchVehicles();
      setOpenStatusDialog(false);
      showToast('Status updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update status', 'error');
    }
  };
  

  // const handleDeleteSubmit = async () => {
  //   try {
  //     await api.delete(`/vehicle/${currentVehicle._id}`);
  //     fetchVehicles();
  //     setOpenStatusDialog(false);
  //     showToast('Vehicle deleted successfully', 'error');
  //   } catch (error) {
  //     showToast('Failed to delete vehicle', 'error');
  //   }
  // };

  return (
    <>
      <Navbar />
      <VehicleTable
        vehicles={vehicles}
        onEdit={handleUpdate}
        onChangeStatus={handleChangeStatus}
        onDelete={handleDelete}
      />
      <VehicleDialog
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
        onSubmit={handleUpdateSubmit}
        vehicle={currentVehicle}
        type="update"
      />
      <VehicleDialog
        open={openStatusDialog}
        onClose={() => setOpenStatusDialog(false)}
        onSubmit={handleStatusSubmit}
        vehicle={currentVehicle}
        type="status"
      />
      
      {/* Toast Notification */}
      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={() => setOpenToast(false)}
      >
        <Alert onClose={() => setOpenToast(false)} severity={toastType}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default VehicleDashboard;
