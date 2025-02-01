import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a theme with Wakefern's colors
const theme = createTheme({
    palette: {
        primary: {
            main: '#dc2626', // Wakefern red
        },
        secondary: {
            main: '#1f2937', // Dark gray
        }
    },
});

export default theme