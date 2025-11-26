import { useState, useEffect } from 'react'
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Alert,
    CircularProgress,
    Chip,
} from '@mui/material'
import LockResetIcon from '@mui/icons-material/LockReset'
import userService from '../../services/userService'

function Users() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        try {
            setLoading(true)
            const data = await userService.getAllUsers()
            setUsers(data)
        } catch (error) {
            console.error('Error loading users:', error)
            setError('Error al cargar los usuarios')
        } finally {
            setLoading(false)
        }
    }

    const handleOpenModal = (user) => {
        setSelectedUser(user)
        setPassword('')
        setConfirmPassword('')
        setError('')
        setSuccess('')
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        setSelectedUser(null)
        setPassword('')
        setConfirmPassword('')
        setError('')
        setSuccess('')
    }

    const handleChangePassword = async () => {
        setError('')
        setSuccess('')

        if (!password || !confirmPassword) {
            setError('Por favor complete todos los campos')
            return
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden')
            return
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            return
        }

        try {
            setSaving(true)
            await userService.changePassword(selectedUser.id, password, confirmPassword)
            setSuccess('Contraseña actualizada exitosamente')
            setTimeout(() => {
                handleCloseModal()
                loadUsers()
            }, 1500)
        } catch (error) {
            setError(error.message || 'Error al cambiar la contraseña')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
                Gestión de Usuarios
            </Typography>

            <Paper sx={{ p: 2 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Usuario</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Apellido</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        <Typography variant="body2" color="text.secondary">
                                            No hay usuarios registrados
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((user) => (
                                    <TableRow key={user.id} hover>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.firstName || '-'}</TableCell>
                                        <TableCell>{user.lastName || '-'}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={user.isActive ? 'Activo' : 'Inactivo'}
                                                color={user.isActive ? 'success' : 'default'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                startIcon={<LockResetIcon />}
                                                onClick={() => handleOpenModal(user)}
                                            >
                                                Cambiar Contraseña
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
                <DialogTitle>Cambiar Contraseña</DialogTitle>
                <DialogContent>
                    {selectedUser && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Usuario: <strong>{selectedUser.username}</strong>
                        </Typography>
                    )}
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
                            {error}
                        </Alert>
                    )}
                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {success}
                        </Alert>
                    )}
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nueva Contraseña"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Confirmar Contraseña"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} disabled={saving}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleChangePassword}
                        variant="contained"
                        disabled={saving || !password || !confirmPassword}
                    >
                        {saving ? <CircularProgress size={20} /> : 'Cambiar Contraseña'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Users

