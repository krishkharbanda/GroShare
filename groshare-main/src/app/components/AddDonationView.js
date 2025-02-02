import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { addDonation } from "../utils/api";
import theme from "./theme";


const AddDonationView = ({ open, handleClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        store: "",
        original_price: "",
        expiry_date: "",
        available: "",
        weight: "",
        percentage: "",
        discounted_price: "",
    });

    const handleCloseModal = () => {
        setFormData({
            name: "",
            store: "",
            original_price: "",
            expiry_date: "",
            available: "",
            weight: "",
            percentage: "",
            discounted_price: "",
        });
        handleClose(); // Close modal
    };

    useEffect(() => {
        if (formData.percentage && formData.original_price) {
            const discountValue = (formData.original_price * (formData.percentage / 100)).toFixed(2);
            setFormData(prev => ({
                ...prev,
                discounted_price: (formData.original_price - discountValue).toFixed(2)
            }));
        }
    }, [formData.percentage, formData.original_price]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await addDonation(formData);
        console.log(response.message);
        handleCloseModal();
    };

    return (
        <Modal open={open} onClose={handleCloseModal} aria-labelledby="add-donation-modal">
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
                <Typography variant="h6" color={theme.palette.primary.main} id="add-donation-modal" sx={{ mb: 2 }}>
                    Add New Donation
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Item Name"
                        name="name"
                        variant="outlined"
                        value={formData.name}
                        color={theme.palette.primary.main}
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
                        color={theme.palette.primary.main}
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
                        color={theme.palette.primary.main}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Discount (%)"
                        name="percentage"
                        variant="outlined"
                        type="number"
                        value={formData.percentage}
                        color={theme.palette.primary.main}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Discounted Price ($)"
                        name="discounted_price"
                        variant="outlined"
                        type="number"
                        color={theme.palette.primary.main}
                        value={formData.discounted_price}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Expiry Date (MM/DD/YY)"
                        name="expiry_date"
                        variant="outlined"
                        value={formData.expiry_date}
                        color={theme.palette.primary.main}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Quantity"
                        name="available"
                        variant="outlined"
                        value={formData.available}
                        color={theme.palette.primary.main}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Weight (kg)"
                        name="weight"
                        variant="outlined"
                        value={formData.weight}
                        color={theme.palette.primary.main}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{
                        mt: 2,
                        bgcolor: theme.palette.primary.main,
                        '&:hover': {
                            bgcolor: '#b91c1c'
                        }
                    }}>
                        Submit Donation
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AddDonationView;
