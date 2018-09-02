// TODO can I import url, token only here??

export const api = {
    fetchTasks: (url, token) => {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
        });
    },
    createTask: (url, token, body) => {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify(body),
        });
    },
    updateTask: (url, token, body) => {
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify(body),
        });
    },

    removeTask: (url, token, id) => {

        return fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
        });

    },
    completeAllTasks: (url, token) => {
        //TODO: hz whats this method whats in body?? PUT??
        return fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
        });
    },
};
