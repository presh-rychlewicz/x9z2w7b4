import { Typography, Box, Card, CardContent, CardActions, Chip, Button } from '@mui/material'
import { Layers, AccessTime } from '@mui/icons-material'
import type { Story } from '../storiesData'

interface DashboardProps {
  stories: Story[]
  onSelectStory: (id: string) => void
}

export function Dashboard({ stories, onSelectStory }: DashboardProps) {
  return (
    <Box>
      <Box sx={{ mb: 5, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ fontWeight: '800', fontFamily: 'Inter, system-ui, sans-serif', mb: 2 }}
        >
          Improve Your English with Simple Stories
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ 
            fontFamily: 'Inter, system-ui, sans-serif', 
            maxWidth: 650, 
            mx: 'auto', 
            fontWeight: '400' 
          }}
        >
          Select a classic children's fable below. Each story contains a curated glossary to help you master new words.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' },
          gap: 3,
        }}
      >
        {stories.map((story) => (
          <Card 
            key={story.id} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 'none',
              borderRadius: 3,
              transition: 'transform 0.2s, border-color 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                borderColor: 'primary.main',
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, mb: 2 }}>
                <Chip 
                  icon={<Layers style={{ fontSize: 14 }} />}
                  label={story.difficulty} 
                  color={story.difficulty === 'Beginner' ? 'success' : 'warning'} 
                  size="small" 
                  sx={{ fontWeight: '600', fontFamily: 'Inter, system-ui, sans-serif' }}
                />
                <Chip 
                  icon={<AccessTime style={{ fontSize: 14 }} />}
                  label={`${story.readingTimeMin} min read`} 
                  variant="outlined" 
                  size="small" 
                  sx={{ fontWeight: '500', fontFamily: 'Inter, system-ui, sans-serif' }}
                />
              </Box>
              
              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ fontWeight: '700', mb: 1, fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                {story.title}
              </Typography>
              
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mb: 2, fontFamily: 'Inter, system-ui, sans-serif', lineHeight: 1.5 }}
              >
                {story.synopsis}
              </Typography>
              
              <Typography 
                variant="caption" 
                color="text.secondary" 
                sx={{ display: 'block', mt: 2, fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                Vocabulary count: {story.glossary.length} key words • {story.wordCount} words
              </Typography>
            </CardContent>

            <CardActions sx={{ px: 3, pb: 3, pt: 0 }}>
              <Button 
                variant="contained" 
                fullWidth 
                onClick={() => onSelectStory(story.id)}
                sx={{ 
                  borderRadius: 2, 
                  textTransform: 'none', 
                  fontWeight: '600', 
                  fontFamily: 'Inter, system-ui, sans-serif',
                  py: 1
                }}
              >
                Read Story
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  )
}
