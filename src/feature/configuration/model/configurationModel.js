// Configuration model - Data models and types for configuration feature

export const configurationModel = {
    // Configuration structure
    createConfig: (data) => ({
        id: data.id || 'default',
        name: data.name || '',
        value: data.value || '',
        type: data.type || 'string',
        description: data.description || '',
    }),

    // Validate configuration
    validateConfig: (config) => {
        return config && config.name && config.value !== undefined
    },

    // Default configuration
    getDefaultConfig: () => ({
        theme: 'dark',
        language: 'en',
        notifications: true,
    }),
}

