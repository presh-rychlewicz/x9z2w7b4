import { useState, useMemo } from 'react'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Navbar } from './components/Navbar'
import { Dashboard } from './components/Dashboard'
import { StoryReader } from './components/StoryReader'
import { stories } from './storiesData'

function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark')
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null)
  const [fontFamily, setFontFamily] = useState<'sans-serif' | 'serif'>('serif')

  // Theme setup
  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: themeMode,
        primary: {
          main: '#aa3bff', // Purple accent
        },
        background: {
          default: themeMode === 'dark' ? '#121214' : '#f8f9fa',
          paper: themeMode === 'dark' ? '#1a1a1e' : '#ffffff',
        },
      },
      typography: {
        fontFamily: fontFamily === 'sans-serif' ? 'Inter, system-ui, sans-serif' : 'Georgia, "Times New Roman", serif',
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
    }),
    [themeMode, fontFamily]
  )

  const activeStory = useMemo(() => {
    return stories.find((s) => s.id === selectedStoryId) || null
  }, [selectedStoryId])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Navbar 
        themeMode={themeMode} 
        onToggleTheme={() => setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'))} 
        onReset={() => setSelectedStoryId(null)}
      />

      <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, md: 3 } }}>
        {!activeStory ? (
          <Dashboard 
            stories={stories} 
            onSelectStory={setSelectedStoryId} 
          />
        ) : (
          <StoryReader 
            story={activeStory} 
            onBack={() => setSelectedStoryId(null)}
            fontFamily={fontFamily}
            onChangeFontFamily={setFontFamily}
          />
        )}
      </Container>
    </ThemeProvider>
  )
}

export default App
