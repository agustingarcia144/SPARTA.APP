import { useState, useEffect } from 'react'
import { Box, Typography, Paper, TextField, Button, Grid } from '@mui/material'
import { configurationService } from './service/configurationService'
import { configurationModel } from './model/configurationModel'

function Configuration() {
    const [config, setConfig] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadConfiguration()
    }, [])

    const loadConfiguration = async () => {
        try {
            setLoading(true)
            const data = await configurationService.getConfiguration()
            setConfig(data || configurationModel.getDefaultConfig())
        } catch (error) {
            console.error('Error loading configuration:', error)
            setConfig(configurationModel.getDefaultConfig())
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (field, value) => {
        setConfig((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSave = async () => {
        try {
            await configurationService.updateConfiguration(config)
            // TODO: Show success message
        } catch (error) {
            console.error('Error saving configuration:', error)
            // TODO: Show error message
        }
    }

    const handleReset = async () => {
        try {
            await configurationService.resetConfiguration()
            loadConfiguration()
        } catch (error) {
            console.error('Error resetting configuration:', error)
        }
    }

    return (
        <Box>
            <Paper sx={{ p: 3 }}>
                {loading ? (
                    <Typography>Cargando...</Typography>
                ) : (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Tema"
                                value={config.theme || ''}
                                onChange={(e) => handleChange('theme', e.target.value)}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Idioma"
                                value={config.language || ''}
                                onChange={(e) => handleChange('language', e.target.value)}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                <Button variant="contained" onClick={handleSave}>
                                    Guardar
                                </Button>
                                <Button variant="outlined" onClick={handleReset}>
                                    Restablecer valores por defecto
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </Paper>
        </Box>
    )
}

export default Configuration

