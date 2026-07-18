import { Typography, Box, Paper, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material'
import { Book, ExpandMore } from '@mui/icons-material'
import type { GlossaryItem } from '../storiesData'

interface GlossaryPanelProps {
  glossary: GlossaryItem[]
}

export function GlossaryPanel({ glossary }: GlossaryPanelProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
        top: 88,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Book color="primary" />
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ fontWeight: '700', fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          Key Vocabulary
        </Typography>
      </Box>

      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ mb: 3, fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        Here are useful words used in this story with definitions and examples to help build your English vocabulary.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {glossary.map((item, index) => (
          <Accordion 
            key={index}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 'none',
              borderRadius: '8px !important',
              '&::before': { display: 'none' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`glossary-content-${index}`}
              id={`glossary-header-${index}`}
              sx={{ px: 2 }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5, width: '100%' }}>
                <Typography 
                  color="primary.main" 
                  sx={{ fontWeight: '700', fontSize: '1.05rem', fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  {item.word}
                </Typography>
                <Chip 
                  label={item.partOfSpeech} 
                  size="small" 
                  variant="outlined" 
                  sx={{ 
                    height: 20, 
                    fontSize: '0.75rem', 
                    color: 'text.secondary', 
                    fontFamily: 'Inter, system-ui, sans-serif' 
                  }} 
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, pb: 2, pt: 0 }}>
              <Typography 
                variant="body2" 
                color="text.primary" 
                sx={{ fontWeight: '500', mb: 1, fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                Definition:
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mb: 2, fontFamily: 'Inter, system-ui, sans-serif', lineHeight: 1.5 }}
              >
                {item.definition}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.primary" 
                sx={{ fontWeight: '500', mb: 0.5, fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                Example:
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontStyle: 'italic', 
                  color: 'text.secondary', 
                  fontFamily: 'Inter, system-ui, sans-serif', 
                  borderLeft: '3px solid', 
                  borderColor: 'primary.light', 
                  pl: 1 
                }}
              >
                "{item.example}"
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Paper>
  )
}
