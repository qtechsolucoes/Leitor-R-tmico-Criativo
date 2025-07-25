// src/api.js

// NOTA: Em um projeto real, esta URL viria de uma variável de ambiente.
const BASE_URL = 'http://localhost:5000';

async function fetchWithCredentials(url, options = {}) {
    const defaultOptions = {
        credentials: 'include', // Envia cookies de sessão
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };
    const response = await fetch(`${BASE_URL}${url}`, { ...defaultOptions, ...options });
    
    if (response.status === 401) {
        // O utilizador não está autenticado, poderia redirecionar para o login
        console.error('Não autorizado. Faça login.');
        return null;
    }
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ocorreu um erro na requisição.');
    }
    // Retorna null se a resposta não tiver corpo (ex: logout)
    if (response.headers.get("Content-Length") === "0") {
        return null;
    }
    
    return response.json();
}

export const getCurrentUser = () => fetchWithCredentials('/api/current_user');

export const addPoints = (points) => fetchWithCredentials('/api/add_points', {
    method: 'POST',
    body: JSON.stringify({ points }),
});

export const getRhythms = () => fetchWithCredentials('/api/rhythms');

export const saveRhythm = (rhythmData) => fetchWithCredentials('/api/rhythms', {
    method: 'POST',
    body: JSON.stringify(rhythmData),
});