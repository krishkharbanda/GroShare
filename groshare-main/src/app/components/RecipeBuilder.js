"use client";

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Chip,
    TextField,
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import {
    ChefHat,
    Search as SearchIcon,
    Timer as ClockIcon,
    People as PeopleIcon,
    ArrowBack,
    Restaurant as KnifeIcon,
} from '@mui/icons-material';
import theme from "@/app/components/theme";
import Link from 'next/link';

const RecipeBuilder = () => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [servings, setServings] = useState(4);
    const [dietaryPreference, setDietaryPreference] = useState('any');

    // Sample discounted ingredients
    const availableIngredients = [
        { id: 1, name: 'Chicken Breast', discount: '30%', expiry: '48h', category: 'Protein', price: 5.99, discountedPrice: 4.19 },
        { id: 2, name: 'Bell Peppers', discount: '25%', expiry: '72h', category: 'Vegetable', price: 2.99, discountedPrice: 2.24 },
        { id: 3, name: 'Pasta', discount: '20%', expiry: '7d', category: 'Grain', price: 3.99, discountedPrice: 3.19 },
        { id: 4, name: 'Greek Yogurt', discount: '35%', expiry: '96h', category: 'Dairy', price: 4.99, discountedPrice: 3.24 },
        { id: 5, name: 'Spinach', discount: '40%', expiry: '48h', category: 'Vegetable', price: 3.99, discountedPrice: 2.39 },
        { id: 6, name: 'Ground Turkey', discount: '25%', expiry: '72h', category: 'Protein', price: 6.99, discountedPrice: 5.24 }
    ];

    // Sample generated recipe
    const [generatedRecipe, setGeneratedRecipe] = useState(null);

    const handleIngredientSelect = (ingredient) => {
        if (!selectedIngredients.find(item => item.id === ingredient.id)) {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
    };

    const handleRemoveIngredient = (ingredientId) => {
        setSelectedIngredients(selectedIngredients.filter(item => item.id !== ingredientId));
    };

    const handleGenerateRecipe = () => {
        // Simulate recipe generation
        setGeneratedRecipe({
            name: "Quick & Healthy Meal",
            cookingTime: "25 mins",
            difficulty: "Easy",
            ingredients: selectedIngredients,
            instructions: [
                "Prepare all ingredients",
                "Cook the protein first",
                "Add vegetables and seasonings",
                "Combine all ingredients",
                "Serve hot"
            ],
            nutritionInfo: {
                calories: 420,
                protein: "32g",
                carbs: "48g",
                fat: "12g"
            }
        });
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
                <Grid container spacing={4}>
                    {/* Left Column - Ingredients Selection */}
                    <Grid item xs={12} md={6}>
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
                                    InputProps={{
                                        startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                                    }}
                                />

                                <Box sx={{ mb: 3 }}>
                                    {availableIngredients.map(ingredient => (
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
                                                        Expires in {ingredient.expiry}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ textAlign: 'right' }}>
                                                    <Chip
                                                        label={ingredient.discount}
                                                        size="small"
                                                        sx={{ bgcolor: theme.palette.primary.main, color: 'white' }}
                                                    />
                                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                                        ${ingredient.discountedPrice}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right Column - Recipe Generation */}
                    <Grid item xs={12} md={6}>
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
                                        {selectedIngredients.length === 0 && (
                                            <Typography variant="body2" color="text.secondary">
                                                Select ingredients from the left panel
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>

                                <Grid container spacing={3} sx={{ mb: 3 }}>
                                    <Grid item xs={6}>
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
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Dietary Preference</InputLabel>
                                            <Select
                                                value={dietaryPreference}
                                                label="Dietary Preference"
                                                onChange={(e) => setDietaryPreference(e.target.value)}
                                            >
                                                <MenuItem value="any">Any</MenuItem>
                                                <MenuItem value="vegetarian">Vegetarian</MenuItem>
                                                <MenuItem value="vegan">Vegan</MenuItem>
                                                <MenuItem value="gluten-free">Gluten-free</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleGenerateRecipe}
                                    disabled={selectedIngredients.length === 0}
                                    sx={{
                                        bgcolor: theme.palette.primary.main,
                                        '&:hover': { bgcolor: '#b91c1c' },
                                        mb: 3
                                    }}
                                >
                                    Generate Recipe
                                </Button>

                                {generatedRecipe && (
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                {generatedRecipe.name}
                                            </Typography>

                                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                                <Chip
                                                    icon={<ClockIcon />}
                                                    label={generatedRecipe.cookingTime}
                                                    size="small"
                                                />
                                                <Chip
                                                    icon={<PeopleIcon />}
                                                    label={`${servings} servings`}
                                                    size="small"
                                                />
                                                <Chip
                                                    label={generatedRecipe.difficulty}
                                                    size="small"
                                                />
                                            </Box>

                                            <Typography variant="subtitle2" gutterBottom>
                                                Instructions:
                                            </Typography>
                                            <Box component="ol" sx={{ pl: 2, mb: 2 }}>
                                                {generatedRecipe.instructions.map((step, index) => (
                                                    <li key={index}>
                                                        <Typography variant="body2" paragraph>
                                                            {step}
                                                        </Typography>
                                                    </li>
                                                ))}
                                            </Box>

                                            <Typography variant="subtitle2" gutterBottom>
                                                Nutrition (per serving):
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 2 }}>
                                                {Object.entries(generatedRecipe.nutritionInfo).map(([key, value]) => (
                                                    <Chip
                                                        key={key}
                                                        label={`${key}: ${value}`}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                ))}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default RecipeBuilder;