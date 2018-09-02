// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { api, MAIN_URL, TOKEN } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

import Header from 'components/Header';
import Footer from 'components/Footer';
import TaskWrapper from 'components/TaskWrapper';

export default class Scheduler extends Component {
    state = {
        tasks: []
    };

    componentDidMount() {
        this._fetchAllTasks();
    }

    _fetchAllTasks = async () => {
        // TODO try/catch
        const response = await api.fetchTasks(MAIN_URL, TOKEN);
        const { data: tasks } = await response.json();

        this.setState({
            tasks
        });
    };

    _createTask = async (newTask) => {
        const response = await api.createTask(MAIN_URL, TOKEN, newTask);

        const { data: task } = await response.json();

        this.setState(({ tasks }) => ({
            tasks: [task, ...tasks]
        }));

    };

    _removeTask = async (id) => {
        await api.removeTask(MAIN_URL, TOKEN, id);

        this.setState(({ tasks }) => {
            return {
                tasks: tasks.filter((task) => task.id !== id),
            };
        });
    };

    _updateTask = async (updatedTask) => {
        const response = await api.updateTask(MAIN_URL, TOKEN, updatedTask);
        const { data: [updatedResponse] } = await response.json();

        this.setState(({ tasks }) => ({
            tasks: tasks.map((item) => {
                return item.id === updatedResponse.id ? updatedResponse : item;
            }),
        }));

    };

    render () {
        return (
            <section className = { Styles.scheduler }>
                <main>
                    <Header />
                    <TaskWrapper
                        { ...this.state }
                        _createTask = { this._createTask }
                        _removeTask = { this._removeTask }
                        _updateTask = { this._updateTask }
                    />
                    <Footer />
                </main>
            </section>
        );
    }
}
