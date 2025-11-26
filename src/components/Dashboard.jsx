import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'

function Dashboard() {
  const [selectedCard, setSelectedCard] = useState(null)

  const cards = [
    {
      id: 1,
      title: 'Dashboard',
      description: 'Vista general del sistema',
      icon: <DashboardIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
    },
    {
      id: 2,
      title: 'Usuarios',
      description: 'Gestión de usuarios',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: '#dc004e',
    },
    {
      id: 3,
      title: 'Configuración',
      description: 'Ajustes del sistema',
      icon: <SettingsIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
    },
  ]

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* AppBar */}
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SPARTA.APP
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          Bienvenido a SPARTA.APP
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Proyecto React con Material-UI configurado y listo para usar.
        </Typography>

        {/* Cards Grid */}
        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                  border: selectedCard === card.id ? `2px solid ${card.color}` : 'none',
                }}
                onClick={() => setSelectedCard(card.id)}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 3 }}>
                  <Box
                    sx={{
                      color: card.color,
                      mb: 2,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button size="small" variant="contained" color="primary">
                    Explorar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Info Paper */}
        <Paper
          elevation={2}
          sx={{
            mt: 4,
            p: 3,
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
          }}
        >
          <Typography variant="h6" gutterBottom>
            🚀 Proyecto Inicializado
          </Typography>
          <Typography variant="body2">
            Este es un proyecto React con Material-UI (MUI) configurado y listo para
            desarrollar. Puedes comenzar a agregar tus componentes y funcionalidades.
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}

export default Dashboard

