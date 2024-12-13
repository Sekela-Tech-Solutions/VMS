import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField } from "@mui/material";

const VehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ name: "", status: "" });
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/vehicles");
      setVehicles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddVehicle = async () => {
    try {
      await axios.post("http://localhost:5000/api/vehicles", newVehicle);
      fetchVehicles();
      setOpenAddModal(false);
      setNewVehicle({ name: "", status: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateVehicle = async () => {
    try {
      await axios.put(`http://localhost:5000/api/vehicles/${selectedVehicle._id}`, {
        status: selectedVehicle.status,
      });
      fetchVehicles();
      setOpenUpdateModal(false);
      setSelectedVehicle(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpenAddModal(true)} style={{ marginBottom: "20px" }}>
        Add Vehicle
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vehicle Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle._id}>
                <TableCell>{vehicle.name}</TableCell>
                <TableCell>{vehicle.status}</TableCell>
                <TableCell>{new Date(vehicle.lastUpdated).toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setSelectedVehicle(vehicle);
                      setOpenUpdateModal(true);
                    }}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Vehicle Modal */}
      <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <Paper style={{ padding: "20px", margin: "100px auto", width: "300px" }}>
          <h2>Add Vehicle</h2>
          <TextField
            label="Vehicle Name"
            fullWidth
            margin="normal"
            value={newVehicle.name}
            onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
          />
          <TextField
            label="Status"
            fullWidth
            margin="normal"
            value={newVehicle.status}
            onChange={(e) => setNewVehicle({ ...newVehicle, status: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={handleAddVehicle} style={{ marginTop: "10px" }}>
            Add
          </Button>
        </Paper>
      </Modal>

      {/* Update Vehicle Modal */}
      <Modal open={openUpdateModal} onClose={() => setOpenUpdateModal(false)}>
        <Paper style={{ padding: "20px", margin: "100px auto", width: "300px" }}>
          <h2>Update Vehicle Status</h2>
          <TextField
            label="Status"
            fullWidth
            margin="normal"
            value={selectedVehicle?.status || ""}
            onChange={(e) => setSelectedVehicle({ ...selectedVehicle, status: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={handleUpdateVehicle} style={{ marginTop: "10px" }}>
            Update
          </Button>
        </Paper>
      </Modal>
    </div>
  );
};

export default VehicleTable;
