import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Refresh } from '@mui/icons-material'; // Import the icons you need
import api from '../../api/Api';
import Navbar from '../layout/Navbar';

const VehicleDashboard = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await api.get('/vehicle');
      console.log('response.data', response.data);
      setVehicles(response.data);
    } catch (error) {
      console.error('Failed to fetch vehicles:', error);
    }
  };

  const handleUpdate = (vehicleId) => {
    console.log(`Update vehicle with ID: ${vehicleId}`);
    // Add your update logic here (e.g., open a modal to update vehicle details)
  };

  const handleChangeStatus = (vehicleId) => {
    console.log(`Change status for vehicle with ID: ${vehicleId}`);
    // Add your change status logic here
  };

  const handleDelete = (vehicleId) => {
    console.log(`Delete vehicle with ID: ${vehicleId}`);
    // Add your delete logic here (e.g., API call to delete the vehicle)
  };

  return (
    <>
      <Navbar />
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead sx={{backgroundColor: 'GrayText'}}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell> {/* Add Action column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle._id}> {/* Use _id as the key */}
                <TableCell>{vehicle.name}</TableCell>
                <TableCell>{vehicle.brand}</TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>{vehicle.price}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleUpdate(vehicle._id)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleChangeStatus(vehicle._id)} color="secondary">
                    <Refresh />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(vehicle._id)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default VehicleDashboard;
