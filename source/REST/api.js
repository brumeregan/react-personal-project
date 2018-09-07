// TODO can I import url, token only here??

import { MAIN_URL, TOKEN } from "./config";

export const api = {
    async fetchTasks () {
        const response = await fetch(`${MAIN_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN
            },
        });

        if (response.status !== 200) {
            throw new Error('not 200 status');
        }

        const { data: tasks } = await response.json();
        console.log(tasks);

        return tasks;

    },
    async createTask(message) {
        const response = await fetch(`${MAIN_URL}`, {
            method:  'POST',
            headers: {
                "Content-type": "application/json",
                Authorization: TOKEN,
            },
            body: JSON.stringify({ message })
        });

        if (response.status !== 200) {
            throw new Error('Data provided by API.');
        }

        const { data: tasks } = await response.json();

        return tasks;
    },

    async updateTask(body) {
        const response = await fetch(`${MAIN_URL}`, {
            method:  'PUT',
            headers: {
                "Content-type": "application/json",
                Authorization: TOKEN,
            },
            body: JSON.stringify([body]),
        });

        if (response.status !== 200) {
            throw new Error('Data provided by API.');
        }

        const { data: [tasks] } = await response.json();

        return tasks;
    },

    async removeTask (id) {
        const response = await fetch(`${MAIN_URL}/${id}`, {
            method:  "DELETE",
            headers: {
                Authorization: TOKEN,
            },
        });

        if (response.status !== 204) {
            throw new Error("Tasks were not deleted");
        }
    },

    async completeAllTasks (tasks) {
        const tasksFetch = tasks.map((task) => {
            return fetch(`${MAIN_URL}`, {
                method: 'PUT',
                headers: {
                    Authorization: TOKEN,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([task]),
            });
        });

        await Promise.all(tasksFetch).then(
            (resolve) => {
                resolve.forEach((response) => {
                    if (response.status !== 200) {
                        throw new Error('Task were not updated');
                    }
                });
            },
            (error) => `Tasks were not updated ${error.message}`
        );
    }
};
