"use client";

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { fetchDonations, subscribeToDonations } from "../utils/api";
import {
    Box,
    Container,
    Typography,
    Grid2,
    Card,
    CardContent,
    Button,
    IconButton,
    Badge,
    Chip,
    AppBar,
    Toolbar,
    Modal,
    Paper,
} from '@mui/material';
import {
    LocalShipping as MapPin,
    AccessTime as Clock,
    Favorite as Heart,
    ArrowForward as ArrowRight,
    People as Users,
    Event as Calendar,
    LocalMall as ShoppingBag,
    Notifications as Bell, Check,
} from '@mui/icons-material';
import theme from "@/app/components/theme";
import AddDonationView from "./AddDonationView"

const UserHomepage = () => {
    const [donations, setDonations] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedShelter, setSelectedShelter] = useState(null);
    const [openShelterModal, setOpenShelterModal] = useState(false);

    const ReserveButton = () => {
        const [reserved, setReserved] = useState(false);

        const handleClick = () => {
            setReserved(!reserved);
        };

        return (
            <Button variant="contained" onClick={handleClick} fullWidth sx={{
                mt: 2,
                bgcolor: reserved ? theme.palette.selected.main : theme.palette.primary.main,
                color: reserved ? theme.palette.primary.main : theme.palette.selected.main,
                "&:hover": { bgcolor: "#b91c1c" }
            }}>
                {reserved ? "Reserved!" : "Reserve Item"}
            </Button>
        );
    };


    const handleOpenShelterModal = (shelter) => {
        setSelectedShelter(shelter);
        setOpenShelterModal(true);
    };

    const handleCloseShelterModal = () => {
        setSelectedShelter(null);
        setOpenShelterModal(false);
    };

    useEffect(() => {
        const unsubscribe = subscribeToDonations(setDonations);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        async function loadData() {
            const data = await fetchDonations();
            setDonations(data);
        }
        loadData();
    }, []);

    const localShelters = [
        {
            id: 1,
            name: "Hope Community Center",
            distance: "0.8 miles",
            needs: ["Canned Goods", "Fresh Produce"],
            nextEvent: "Food Drive - Saturday 10 AM",
            details: "Hope Community Center is a local support hub located just 0.8 miles away, dedicated to providing essential resources to those in need. They are currently seeking donations of canned goods and fresh produce to support their outreach efforts. Join them for their upcoming Food Drive this Saturday at 10 AM to make a difference in the community!"
        },
        {
            id: 2,
            name: "City Food Bank",
            distance: "1.2 miles",
            needs: ["Dairy", "Proteins"],
            nextEvent: "Volunteer Orientation - Sunday 2 PM",
            details: "City Food Bank, located 1.2 miles away, plays a vital role in combating food insecurity in the community. They are currently in need of dairy products and proteins to support their food distribution efforts. If you're looking to get involved, attend their upcoming Volunteer Orientation this Sunday at 2 PM to learn how you can make an impact!"
        }
    ];
    const communityEvents = [
        {
            id: 1,
            title: "Weekend Food Drive",
            date: "Sat, Feb 3",
            location: "ShopRite Central",
            participants: 45
        },
        {
            id: 2,
            title: "Cooking Workshop",
            date: "Sun, Feb 4",
            location: "Community Kitchen",
            participants: 28
        }
    ];

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
            <AppBar position="static" color="default" elevation={1}>
                <Toolbar>
                    <Typography variant="h5" fontWeight="bold" sx={{ flexGrow: 1 }}>
                        Welcome to GroShare!
                    </Typography>
                    <Button variant="contained" sx={{
                        bgcolor: theme.palette.primary.main,
                        '&:hover': {
                            bgcolor: '#b91c1c'
                        }
                    }} onClick={() => setOpenModal(true)}>
                        + Add Donation
                    </Button>
                    <IconButton>
                        <Badge
                            badgeContent={3}
                            sx={{
                                '& .MuiBadge-badge': {
                                    bgcolor: theme.palette.primary.main,
                                    color: 'white'
                                }
                            }}
                        >
                            <Bell />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6" fontWeight="bold" color={theme.palette.primary.main} sx={{ mb: 1 }}>
                            Featured Deals Near You
                        </Typography>
                        <Link href="/recipebuilder" style={{ textDecoration: 'none' }}>
                            <Button
                                color="error"
                                endIcon={<ArrowRight />}
                            >
                                Recipe Builder
                            </Button>
                        </Link>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        overflowX: "auto",
                        scrollbarWidth: "thin",
                        "&::-webkit-scrollbar": { height: 8 },
                        "&::-webkit-scrollbar-thumb": { bgcolor: "lightgray", borderRadius: 4 },
                        gap: 2,
                        paddingBottom: 1
                    }}>
                        {donations.map((item) => (
                            <Card key={item.id} elevation={0} sx={{
                                minWidth: 370,
                                flexShrink: 0,
                                "&:hover": {
                                    boxShadow: 3,
                                    transition: "box-shadow 0.3s ease-in-out"
                                }
                            }}>
                                <CardContent>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                        <Box>
                                            <Typography variant="h6">{item.name}</Typography>
                                            <Typography variant="body2">{item.store}</Typography>
                                        </Box>
                                        <Chip
                                            label={`${item.percentage}% OFF`}
                                            sx={{
                                                bgcolor: theme.palette.primary.main,
                                                color: "white"
                                            }}
                                            size="small"
                                        />
                                    </Box>

                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Typography>Original Price</Typography>
                                            <Typography sx={{ textDecoration: "line-through" }}>
                                                ${item.original_price}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Typography>Now</Typography>
                                            <Typography sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}>
                                                ${item.discounted_price}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Typography>Available</Typography>
                                            <Typography>{item.available}</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <Clock sx={{ fontSize: "small", mr: 1 }} />
                                            <Typography variant="body2">
                                                Expires: {item.expiry_date}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <ReserveButton></ReserveButton>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>

                <Box sx={{ mb: 6 }}>
                    <Typography variant="h6" fontWeight="bold" color={theme.palette.primary.main} sx={{ mb: 3 }}>
                        Local Community Resources
                    </Typography>

                    <Grid2 container spacing={3}>
                        {localShelters.map(shelter => (
                            <Grid2 item size={6} key={shelter.id}>
                                <Card elevation={0}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                            <Box>
                                                <Typography variant="h6">{shelter.name}</Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <MapPin sx={{ fontSize: 'small', mr: 1 }} />
                                                    <Typography variant="body2">
                                                        {shelter.distance}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <IconButton sx={{ color: theme.palette.primary.main }}>
                                                <Heart />
                                            </IconButton>
                                        </Box>

                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                                Current Needs:
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                {shelter.needs.map(need => (
                                                    <Chip
                                                        key={need}
                                                        label={need}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                ))}
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Calendar sx={{ fontSize: 'small', mr: 1 }} />
                                            <Typography variant="body2">
                                                {shelter.nextEvent}
                                            </Typography>
                                        </Box>

                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            onClick={() => handleOpenShelterModal(shelter)}
                                            sx={{
                                                borderColor: theme.palette.primary.main,
                                                color: theme.palette.primary.main,
                                                '&:hover': {
                                                    borderColor: '#b91c1c',
                                                    color: '#b91c1c',
                                                    bgcolor: 'rgba(220, 38, 38, 0.04)'
                                                }
                                            }}
                                        >
                                            View Details
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>

                <Box>
                    <Typography variant="h6" fontWeight="bold" color={theme.palette.primary.main} sx={{ mb: 3 }}>
                        Upcoming Community Events
                    </Typography>

                    <Grid2 container spacing={3}>
                        {communityEvents.map(event => (
                            <Grid2 item size={6} key={event.id}>
                                <Card elevation={0}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Box>
                                                <Typography variant="h6">{event.title}</Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                                    <Calendar sx={{ fontSize: 'small', mr: 1 }} />
                                                    <Typography variant="body2">
                                                        {event.date}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                                    <MapPin sx={{ fontSize: 'small', mr: 1 }} />
                                                    <Typography variant="body2">
                                                        {event.location}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Users sx={{ fontSize: 'small', mr: 1 }} />
                                                <Typography variant="body2">
                                                    {event.participants} joined
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                mt: 2,
                                                bgcolor: theme.palette.primary.main,
                                                '&:hover': {
                                                    bgcolor: '#b91c1c'
                                                }
                                            }}
                                        >
                                            Join Event
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
                <AddDonationView open={openModal} handleClose={() => setOpenModal(false)} />

                <Modal open={openShelterModal} onClose={handleCloseShelterModal}>
                    <Paper sx={{ width: 400, p: 4, m: 'auto', mt: 10, bgcolor: 'white', boxShadow: 24, borderRadius: 2 }}>
                        {selectedShelter && (
                            <>
                                <Typography variant="h6" gutterBottom>
                                    {selectedShelter.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Distance: {selectedShelter.distance}
                                </Typography>

                                <Typography variant="subtitle2" sx={{ mt: 2 }}>Current Needs:</Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                                    {selectedShelter.needs.map((need, index) => (
                                        <Chip key={index} label={need} variant="outlined" size="small" />
                                    ))}
                                </Box>

                                <Typography variant="subtitle2">Next Event:</Typography>
                                <Typography variant="body2" gutterBottom>
                                    {selectedShelter.nextEvent}
                                </Typography>

                                <Typography variant="subtitle2">Details:</Typography>
                                <Typography variant="body2" gutterBottom>
                                    {selectedShelter.details}
                                </Typography>

                                <Button variant="contained" fullWidth onClick={handleCloseShelterModal} sx={{
                                    mt: 2,
                                    bgcolor: theme.palette.primary.main,
                                    '&:hover': {
                                        bgcolor: '#b91c1c'
                                    }
                                }}>
                                    Close
                                </Button>
                            </>
                        )}
                    </Paper>
                </Modal>
            </Container>
        </Box>
    );
};

export default UserHomepage;