// src/api.js

// NOTA: Em um projeto real, esta URL viria de uma variável de ambiente.
const BASE_URL = 'http://localhost:5000';

/**
 * Uma função auxiliar genérica para fazer chamadas à API, incluindo sempre as credenciais.
 * Isto é crucial para que o backend saiba qual utilizador está a fazer o pedido.
 * @param {string} url - O caminho da API (ex: '/api/current_user').
 * @param {object} options - Opções adicionais para a função fetch (método, corpo, etc.).
 * @returns {Promise<any>} - A resposta da API em formato JSON.
 */
async function fetchWithCredentials(url, options = {}) {
    const defaultOptions = {
        credentials: 'include', // Essencial: Envia cookies de sessão em cada pedido.
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };
    const response = await fetch(`${BASE_URL}${url}`, { ...defaultOptions, ...options });

    // Se o utilizador não estiver autenticado, o backend retorna 401 Unauthorized.
    if (response.status === 401) {
        console.error('Não autorizado. Faça login.');
        return null; // Retorna null para que o frontend possa lidar com o estado de deslogado.
    }
    // Lida com outros erros de servidor ou de requisição.
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ocorreu um erro na requisição.');
    }
    // Lida com respostas que não têm corpo (ex: logout, que pode retornar um 204 No Content).
    if (response.headers.get("Content-Length") === "0" || response.status === 204) {
        return null;
    }

    return response.json();
}

/**
 * Busca os dados do utilizador atualmente autenticado.
 */
export const getCurrentUser = () => fetchWithCredentials('/api/current_user');

/**
 * Envia um pedido para adicionar uma quantidade de pontos ao utilizador atual.
 * @param {number} points - O número de pontos a serem adicionados.
 */
export const addPoints = (points) => fetchWithCredentials('/api/add_points', {
    method: 'POST',
    body: JSON.stringify({ points }),
});

/**
 * Busca todos os ritmos salvos pelo utilizador atual.
 */
export const getRhythms = () => fetchWithCredentials('/api/rhythms');

/**
 * Salva um novo ritmo na base de dados para o utilizador atual.
 * @param {object} rhythmData - Os dados do ritmo (nome, padrão, fórmula de compasso).
 */
export const saveRhythm = (rhythmData) => fetchWithCredentials('/api/rhythms', {
    method: 'POST',
    body: JSON.stringify(rhythmData),
});

/**
 * Informa o backend que o utilizador completou uma lição específica.
 * @param {number} lessonIndex - O índice da lição que foi concluída.
 */
export const completeLesson = (lessonIndex) => fetchWithCredentials('/api/lessons/complete', {
    method: 'POST',
    body: JSON.stringify({ lessonIndex }),
});