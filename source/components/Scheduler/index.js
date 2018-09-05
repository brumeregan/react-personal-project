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
        newTaskMessage: '',
        tasksFilter: ''
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

    _createTaskAsync = async (newTask) => {
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

    _updateTasksFilter = (e) => {
        const { value } = e.target;

        this.setState({
            tasksFilter: value.toUpperCase(),
        });

        this._searchTask();
    };

    _searchTask = () => {
        const { tasks, tasksFilter } = this.state;

        if(tasksFilter) {
            const searchFilter = tasks.filter((item) => item.message.toUpperCase().includes(tasksFilter));

            return searchFilter;
        }

        return null;
    };

    _completeAllTasks = () => {
        // ???
        this.state.tasks.every((item) => item.completed);
    };

    _removeTaskAsync = async (id) => {
        // TODO: try catch
        await api.removeTask(id);

        this.setState(({ tasks }) => {
            return {
                tasks: tasks.filter((task) => task.id !== id),
            };
        });
    };

    _updateTaskAsync = async (updatedTask) => {
        const updatedResponse = await api.updateTask(updatedTask);

        this.setState(({ tasks }) => ({
            tasks: tasks.map((item) => {
                return item.id === updatedResponse.id ? updatedResponse : item;
            }),
        }));
    };


    _updateNewTaskMessage = () => {

    };



    render () {
        const { tasks, isSpinning, tasksFilter } = this.state;

        const tasksToShow = this._searchTask() ? this._searchTask() : tasks;
        return (
            <section className = { Styles.scheduler }>
                <main>
                    <Spinner isSpinning = { isSpinning }/>
                    <Header taskFilter = { tasksFilter }
                            _updateTasksFilter = { this._updateTasksFilter }/>
                    <TaskWrapper
                        tasks = { tasksToShow }
                        _createTaskAsync = { this._createTaskAsync }
                        _removeTaskAsync = { this._removeTaskAsync }
                        _updateTaskAsync = { this._updateTaskAsync }
                    />
                    <Footer />
                </main>
            </section>
        );
    }
}
