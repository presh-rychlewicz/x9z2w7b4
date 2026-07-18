import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material'
import { Brightness4, Brightness7, School } from '@mui/icons-material'

interface NavbarProps {
  themeMode: 'light' | 'dark'
  onToggleTheme: () => void
  onReset: () => void
}

export function Navbar({ themeMode, onToggleTheme, onReset }: NavbarProps) {
  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={1} 
      sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box 
          onClick={onReset} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            cursor: 'pointer', 
            gap: 1 
          }}
        >
          <School color="primary" />
          <Typography 
            variant="h6" 
            sx={{ fontWeight: '700', fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            FableRead
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              display: { xs: 'none', sm: 'block' }, 
              fontFamily: 'Inter, system-ui, sans-serif', 
              color: 'text.secondary' 
            }}
          >
            • Kids' Stories for English Learners
          </Typography>
        </Box>
        
        <IconButton onClick={onToggleTheme} color="inherit">
          {themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
