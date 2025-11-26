import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Tooltip,
    useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HistoryIcon from '@mui/icons-material/History'
import SettingsIcon from '@mui/icons-material/Settings'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import LogoutIcon from '@mui/icons-material/Logout'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const drawerWidth = 280
const drawerWidthCollapsed = 64

const menuItems = [
    {
        text: 'Historia',
        icon: <HistoryIcon />,
        path: '/history',
    },
    {
        text: 'Configuración',
        icon: <SettingsIcon />,
        path: '/configuration',
    },
]

function Layout({ children, mode, toggleMode }) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const theme = useTheme()

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const handleNavigation = (path) => {
        navigate(path)
        setMobileOpen(false)
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        handleMenuClose()
        // TODO: Implement logout logic
        console.log('Logout clicked')
        // Example: navigate('/login') or clear session, etc.
    }

    const toggleCollapse = () => {
        setCollapsed(!collapsed)
    }

    const getPageTitle = () => {
        const currentItem = menuItems.find((item) => item.path === location.pathname)
        return currentItem ? currentItem.text : 'SPARTA'
    }

    const drawer = (
        <Box>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    px: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {!collapsed && (
                        <>
                            <WaterDropIcon sx={{ color: 'primary.main', mr: 1 }} />
                            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
                                SPARTA
                            </Typography>
                        </>
                    )}
                    {collapsed && <WaterDropIcon sx={{ color: 'primary.main' }} />}
                </Box>
                <IconButton onClick={toggleCollapse} size="small" sx={{ ml: collapsed ? 0 : 'auto' }}>
                    {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </Toolbar>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <Tooltip title={collapsed ? item.text : ''} placement="right">
                            <ListItemButton
                                selected={location.pathname === item.path}
                                onClick={() => handleNavigation(item.path)}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: collapsed ? 'center' : 'flex-start',
                                    px: collapsed ? 2.5 : 3,
                                    '&.Mui-selected': {
                                        backgroundColor: 'transparent',
                                        color: 'primary.main',
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        },
                                        '& .MuiListItemIcon-root': {
                                            color: 'primary.main',
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: collapsed ? 0 : 3,
                                        justifyContent: 'center',
                                        color: location.pathname === item.path ? 'primary.main' : 'inherit',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                {!collapsed && (
                                    <ListItemText
                                        primary={item.text}
                                        sx={{
                                            color: location.pathname === item.path ? 'primary.main' : 'inherit',
                                        }}
                                    />
                                )}
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>
        </Box>
    )

    const currentDrawerWidth = collapsed ? drawerWidthCollapsed : drawerWidth

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
                    ml: { sm: `${currentDrawerWidth}px` },
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                    boxShadow: 1,
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        {getPageTitle()}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} />
                    <IconButton
                        color="inherit"
                        onClick={toggleMode}
                        aria-label="toggle theme"
                        sx={{ mr: 1 }}
                    >
                        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                    <IconButton
                        color="inherit"
                        onClick={handleMenuOpen}
                        aria-label="settings menu"
                        aria-controls={anchorEl ? 'settings-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={anchorEl ? 'true' : undefined}
                    >
                        <SettingsIcon />
                    </IconButton>
                    <Menu
                        id="settings-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Cerrar Sesión</ListItemText>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{
                    width: { sm: currentDrawerWidth },
                    flexShrink: { sm: 0 },
                }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: currentDrawerWidth,
                            transition: theme.transitions.create('width', {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.enteringScreen,
                            }),
                            overflowX: 'hidden',
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
                    backgroundColor: 'background.default',
                    minHeight: '100vh',
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    )
}

export default Layout

