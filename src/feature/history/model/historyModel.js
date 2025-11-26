// History model - Data models and types for history feature

export const historyModel = {
    // History entry structure
    createEntry: (data) => ({
        id: data.id || Date.now(),
        title: data.title || '',
        description: data.description || '',
        timestamp: data.timestamp || new Date().toISOString(),
        type: data.type || 'info',
    }),

    // Validate history entry
    validateEntry: (entry) => {
        return entry && entry.title && entry.timestamp
    },
}

