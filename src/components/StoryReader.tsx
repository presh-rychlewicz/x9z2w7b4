import { useState } from 'react'
import {
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { ArrowBack, FormatSize, FontDownload } from '@mui/icons-material'
import type { Story } from '../storiesData'
import { GlossaryPanel } from './GlossaryPanel'

interface StoryReaderProps {
  story: Story
  onBack: () => void
  fontFamily: 'sans-serif' | 'serif'
  onChangeFontFamily: (font: 'sans-serif' | 'serif') => void
}

export function StoryReader({ 
  story, 
  onBack, 
  fontFamily, 
  onChangeFontFamily 
}: StoryReaderProps) {
  const [fontSize, setFontSize] = useState<number>(20)

  return (
    <Box>
      {/* Header controls */}
      <Box 
        sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', sm: 'center' }, 
          gap: 2,
          mb: 4 
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={onBack}
          sx={{ 
            borderRadius: 2, 
            textTransform: 'none', 
            fontFamily: 'Inter, system-ui, sans-serif', 
            fontWeight: '600' 
          }}
        >
          Back to Stories
        </Button>

        {/* Reading Settings */}
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', width: { xs: '100%', sm: 'auto' } }}>
          {/* Font Size Selectors */}
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
            <FormatSize color="action" />
            <ToggleButtonGroup
              value={fontSize}
              exclusive
              onChange={(_, val) => val && setFontSize(val)}
              size="small"
              aria-label="font size"
            >
              <ToggleButton value={16} aria-label="small font">
                S
              </ToggleButton>
              <ToggleButton value={20} aria-label="medium font">
                M
              </ToggleButton>
              <ToggleButton value={24} aria-label="large font">
                L
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Font Family Selectors */}
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
            <FontDownload color="action" />
            <ToggleButtonGroup
              value={fontFamily}
              exclusive
              onChange={(_, val) => val && onChangeFontFamily(val)}
              size="small"
              aria-label="font family"
            >
              <ToggleButton 
                value="serif" 
                aria-label="serif font" 
                sx={{ fontFamily: 'Georgia, serif', textTransform: 'none' }}
              >
                Serif
              </ToggleButton>
              <ToggleButton 
                value="sans-serif" 
                aria-label="sans-serif font" 
                sx={{ fontFamily: 'Inter, sans-serif', textTransform: 'none' }}
              >
                Sans
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
      </Box>

      {/* Layout Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' },
          gap: 4,
        }}
      >
        {/* Left Column: Story paragraphs */}
        <Box>
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 3, md: 4 }, 
              borderRadius: 3, 
              border: '1px solid', 
              borderColor: 'divider',
              minHeight: '60vh'
            }}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ fontWeight: '700', mb: 3, fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              {story.title}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, mb: 4 }}>
              <Chip 
                label={story.difficulty} 
                color={story.difficulty === 'Beginner' ? 'success' : 'warning'} 
                size="small" 
              />
              <Chip 
                label={`${story.readingTimeMin} min read`} 
                variant="outlined" 
                size="small" 
              />
            </Box>

            <Divider sx={{ mb: 4 }} />

            {story.paragraphs.map((p, index) => (
              <Typography
                key={index}
                component="p"
                sx={{
                  fontSize: `${fontSize}px`,
                  lineHeight: 1.8,
                  mb: 3.5,
                  color: 'text.primary',
                  textAlign: 'justify',
                }}
              >
                {p}
              </Typography>
            ))}
          </Paper>
        </Box>

        {/* Right Column: Glossary / Vocabulary Side Panel */}
        <Box>
          <GlossaryPanel glossary={story.glossary} />
        </Box>
      </Box>
    </Box>
  )
}
