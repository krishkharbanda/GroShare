"use client";

import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid2,
    Card,
    CardContent,
    Button,
    Chip,
    TextField,
    AppBar,
    Toolbar,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress
} from '@mui/material';
import {
    Search as SearchIcon,
    Timer as ClockIcon,
    People as PeopleIcon,
    ArrowBack,
    Restaurant as KnifeIcon
} from '@mui/icons-material';
import theme from "@/app/components/theme";
import Link from 'next/link';

const API_BASE_URL = "http://127.0.0.1:5000"; // Update with deployed backend URL if needed

const RecipeBuilder = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [availableIngredients, setAvailableIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [servings, setServings] = useState(4);
    const [dietaryPreference, setDietaryPreference] = useState('any');
    const [generatedRecipe, setGeneratedRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const filteredIngredients = availableIngredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Fetch discounted ingredients from backend
    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/get_donations`);
                const data = await response.json();
                setAvailableIngredients(data);
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        };
        fetchIngredients();
    }, []);

    const handleIngredientSelect = (ingredient) => {
        if (!selectedIngredients.find(item => item.id === ingredient.id)) {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
    };

    const handleRemoveIngredient = (ingredientId) => {
        setSelectedIngredients(selectedIngredients.filter(item => item.id !== ingredientId));
    };

    const handleGenerateRecipe = async () => {
        if (selectedIngredients.length === 0) return;

        setLoading(true);
        setGeneratedRecipe(null);

        try {
            const response = await fetch(`${API_BASE_URL}/generate_recipe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ingredients: selectedIngredients,
                    servings: servings,
                    dietaryPreference: dietaryPreference
                })
            });

            const recipe = await response.json();
            setGeneratedRecipe(recipe);  // Now stored in structured format
        } catch (error) {
            console.error("Error generating recipe:", error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100' }}>
            <AppBar position="static" color="default" elevation={1}>
                <Toolbar>
                    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
                            <ArrowBack />
                        </IconButton>
                    </Link>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" fontWeight="bold">
                            AI Recipe Builder
                        </Typography>
                        <Typography variant="subtitle1">
                            Create recipes from discounted items
                        </Typography>
                    </Box>
                    <KnifeIcon sx={{ fontSize: 28 }} />
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Grid2 container spacing={4}>
                    <Grid2 item size={12} md={6}>
                        <Card elevation={0}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Available Discounted Ingredients
                                </Typography>

                                <TextField
                                    fullWidth
                                    placeholder="Search ingredients..."
                                    variant="outlined"
                                    sx={{ mb: 3 }}
                                    value={searchQuery} // Bind input field to state
                                    onChange={(e) => setSearchQuery(e.target.value)} // Update state on change
                                    InputProps={{
                                        startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                                    }}
                                />


                                <Box sx={{ mb: 3, maxHeight: '400px', overflowY: 'auto' }}>
                                    {filteredIngredients.map(ingredient => (
                                        <Card
                                            key={ingredient.id}
                                            elevation={0}
                                            sx={{
                                                mb: 2,
                                                cursor: 'pointer',
                                                '&:hover': { bgcolor: 'grey.50' },
                                                border: '1px solid',
                                                borderColor: selectedIngredients.find(i => i.id === ingredient.id)
                                                    ? theme.palette.primary.main
                                                    : 'grey.200'
                                            }}
                                            onClick={() => handleIngredientSelect(ingredient)}
                                        >
                                            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
                                                <Box>
                                                    <Typography variant="subtitle1">{ingredient.name}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Expires on {ingredient.expiry_date}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ textAlign: 'right' }}>
                                                    <Chip
                                                        label={`${ingredient.percentage}%`}
                                                        size="small"
                                                        sx={{ bgcolor: theme.palette.primary.main, color: 'white' }}
                                                    />
                                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                                        ${ingredient.discounted_price}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid2>

                    <Grid2 item size={12} md={6}>
                        <Card elevation={0}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Recipe Preferences
                                </Typography>

                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Selected Ingredients:
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        {selectedIngredients.map(ingredient => (
                                            <Chip
                                                key={ingredient.id}
                                                label={ingredient.name}
                                                onDelete={() => handleRemoveIngredient(ingredient.id)}
                                                sx={{ bgcolor: theme.palette.primary.main, color: 'white' }}
                                            />
                                        ))}
                                    </Box>
                                </Box>

                                <Grid2 container spacing={3} sx={{ mb: 3 }}>
                                    <Grid2 item size={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Servings</InputLabel>
                                            <Select
                                                value={servings}
                                                label="Servings"
                                                onChange={(e) => setServings(e.target.value)}
                                            >
                                                {[2, 4, 6, 8].map(num => (
                                                    <MenuItem key={num} value={num}>{num} servings</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid2>
                                </Grid2>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleGenerateRecipe}
                                    disabled={selectedIngredients.length === 0}
                                    sx={{ bgcolor: theme.palette.primary.main, '&:hover': { bgcolor: '#b91c1c' }, mb: 3 }}
                                >
                                    Generate Recipe
                                </Button>

                                {loading && <CircularProgress size={24} sx={{ display: 'block', mx: 'auto', mb: 2 }} />}

                                {generatedRecipe && (
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                {generatedRecipe.name}
                                            </Typography>

                                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                                <Chip icon={<ClockIcon />} label={`Time: ${generatedRecipe.cookingTime}`} size="small" />
                                                <Chip icon={<PeopleIcon />} label={`${servings} servings`} size="small" />
                                                <Chip label={`Difficulty: ${generatedRecipe.difficulty}`} size="small" />
                                            </Box>

                                            <Typography variant="subtitle2" gutterBottom>
                                                Ingredients:
                                            </Typography>
                                            <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                                                {generatedRecipe.ingredients.map((ingredient, index) => (
                                                    <li key={index}>
                                                        <Typography variant="body2">{ingredient.quantity} {ingredient.name}</Typography>
                                                    </li>
                                                ))}
                                            </Box>

                                            <Typography variant="subtitle2" gutterBottom>
                                                Instructions:
                                            </Typography>
                                            <Box component="ol" sx={{ pl: 2, mb: 2 }}>
                                                {generatedRecipe.instructions.map((step, index) => (
                                                    <li key={index}>
                                                        <Typography variant="body2">{step}</Typography>
                                                    </li>
                                                ))}
                                            </Box>

                                            <Typography variant="subtitle2" gutterBottom>
                                                Nutrition (per serving):
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 2 }}>
                                                <Chip label={`Calories: ${generatedRecipe.nutritionInfo.calories}`} size="small" variant="outlined" />
                                                <Chip label={`Protein: ${generatedRecipe.nutritionInfo.protein}`} size="small" variant="outlined" />
                                                <Chip label={`Carbs: ${generatedRecipe.nutritionInfo.carbs}`} size="small" variant="outlined" />
                                                <Chip label={`Fat: ${generatedRecipe.nutritionInfo.fat}`} size="small" variant="outlined" />
                                            </Box>
                                        </CardContent>
                                    </Card>
                                )}
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>
            </Container>
        </Box>
    );
};

export default RecipeBuilder;
