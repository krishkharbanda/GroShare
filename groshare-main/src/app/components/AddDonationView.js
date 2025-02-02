import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { addDonation } from "../utils/api";

const AddDonationView = ({ open, handleClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        store: "",
        original_price: "",
        expiry_date: "",
        quantity: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await addDonation(formData);
        console.log(response.message);
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="add-donation-modal">
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                }}
            >
                <Typography variant="h6" id="add-donation-modal" sx={{ mb: 2 }}>
                    Add New Donation
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Item Name"
                        name="name"
                        variant="outlined"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Store Name"
                        name="store"
                        variant="outlined"
                        value={formData.store}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Original Price ($)"
                        name="original_price"
                        variant="outlined"
                        type="number"
                        value={formData.original_price}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Expiry Date"
                        name="expiry_date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={formData.expiry_date}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Quantity"
                        name="quantity"
                        variant="outlined"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Submit Donation
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AddDonationView;
