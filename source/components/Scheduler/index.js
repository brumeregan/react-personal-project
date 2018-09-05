// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')


import Header from 'components/Header';
import Footer from 'components/Footer';
import TaskWrapper from 'components/TaskWrapper';
import Spinner from "../Spinner";

export default class Scheduler extends Component {
    state = {
        tasks: [],
        isSpinning: false,
        newTaskMessage: ''
    };

    componentDidMount() {
        this._fetchAllTasks();
    }

    _setFetchingStatus = (isSpinning) => {
        this.setState({
            isSpinning
        });
    };

    _fetchAllTasks = async () => {

        try {
            this._setFetchingStatus(true);
            const tasks = await api.fetchTasks();

            this.setState({
                tasks,
            });
        } catch ({ message }) {
            console.log('Error: ', message);
        } finally {
            this._setFetchingStatus(false);
        }

    };

    _createTask = async (newTask) => {
        try {
            this._setFetchingStatus(true);

            const task = await api.createTask(newTask);

            this.setState(({ tasks }) => ({
                tasks: [task, ...tasks],
            }));
        } catch ({ message }) {
            console.log('Error', message);
        } finally {
            this._setFetchingStatus(false);
        }
    };

    _removeTask = async (id) => {
        await api.removeTask(id);

        this.setState(({ tasks }) => {
            return {
                tasks: tasks.filter((task) => task.id !== id),
            };
        });
    };

    _updateTask = async (updatedTask) => {
        const updatedResponse = await api.updateTask(updatedTask);

        this.setState(({ tasks }) => ({
            tasks: tasks.map((item) => {
                return item.id === updatedResponse.id ? updatedResponse : item;
            }),
        }));

    };

    render () {
        const { isSpinning } = this.state;
        return (
            <section className = { Styles.scheduler }>
                <main>
                    <Spinner isSpinning = { isSpinning }/>
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
