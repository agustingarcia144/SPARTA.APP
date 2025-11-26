import { useState, useEffect } from 'react'
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Grid,
} from '@mui/material'
import { historyService } from './service/historyService'
import { historyModel } from './model/historyModel'

function History() {
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const [inputText, setInputText] = useState('')
    const [generating, setGenerating] = useState(false)

    useEffect(() => {
        loadHistory()
    }, [])

    const loadHistory = async () => {
        try {
            setLoading(true)
            const data = await historyService.getHistory()
            setHistory(data)
        } catch (error) {
            console.error('Error loading history:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleGenerate = async () => {
        if (!inputText.trim()) {
            return
        }

        try {
            setGenerating(true)
            const newEntry = historyModel.createEntry({
                title: inputText,
                description: `Generado el ${new Date().toLocaleString('es-ES')}`,
                type: 'generated',
            })

            await historyService.addHistoryEntry(newEntry)
            setInputText('')
            await loadHistory()
        } catch (error) {
            console.error('Error generating:', error)
        } finally {
            setGenerating(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleGenerate()
        }
    }

    return (
        <Box>
            {/* Input Section */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <TextField
                    fullWidth
                    label="Ingresar texto"
                    placeholder="Escribe tu texto aquí..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    multiline
                    rows={3}
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        onClick={handleGenerate}
                        disabled={!inputText.trim() || generating}
                    >
                        {generating ? 'Generando...' : 'Generar'}
                    </Button>
                </Box>
            </Paper>

            {/* History List Section */}
            <Paper sx={{ p: 3 }}>
                {loading ? (
                    <Typography>Cargando...</Typography>
                ) : history.length === 0 ? (
                    <Typography color="text.secondary">No hay historial disponible</Typography>
                ) : (
                    <List>
                        {history.map((item) => (
                            <ListItem key={item.id}>
                                <ListItemText
                                    primary={item.title}
                                    secondary={item.description || item.timestamp}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Paper>
        </Box>
    )
}

export default History

