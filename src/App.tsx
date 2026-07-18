import { useState } from 'react'
import { Container, Typography, Box, Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material'

// Create a premium, dark-mode themed layout
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#aa3bff', // Purple accent
    },
    background: {
      default: '#121214',
      paper: '#1a1a1e',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
        html: {
          maxWidth: '100%',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        },
        body: {
          maxWidth: '100%',
          overflowX: 'hidden',
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        '#root': {
          maxWidth: '100%',
          overflowX: 'hidden',
        },
      },
    },
  },
})

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center',
            gap: 3,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold' }} gutterBottom>
            Welcome to MUI
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your Vite + React template has been configured to use Material UI exclusively.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCount((prev) => prev + 1)}
            sx={{ px: 4, py: 1.5, borderRadius: 2 }}
          >
            Count: {count}
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
