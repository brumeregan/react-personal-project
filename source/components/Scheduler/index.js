// Core
import React, { Component } from "react";
import FlipMove from "react-flip-move";

// Instrument
import { api } from "../../REST";
import { sortTasksByGroup } from "../../instruments";

import Styles from "./styles.m.css";
import Checkbox from "../../theme/assets/Checkbox";

// Components
import Spinner from "../../components/Spinner/index";
import Task from "../../components/Task/index";

export default class Scheduler extends Component {
    state = {
        tasks:           [],
        isTasksFetching: false,
        newTaskMessage:  "",
        tasksFilter:     "",
    };

    componentDidMount () {
        this._fetchTasksAsync();
    }

    _fetchTasksAsync = async () => {
        try {
            this._setTasksFetchingState(true);

            const tasks = await api.fetchTasks();

            this.setState({
                tasks: sortTasksByGroup(tasks),
            });
        } catch ({ message }) {
            console.log("Error _fetchTasksAsync:", message);
        } finally {
            this._setTasksFetchingState(false);
        }
    };

    _createTaskAsync = async (e) => {
        e.preventDefault();

        const { newTaskMessage } = this.state;

        if (newTaskMessage) {
            try {
                this._setTasksFetchingState(true);

                const task = await api.createTask(newTaskMessage);

                this.setState((prevState) => ({
                    tasks:          sortTasksByGroup([task, ...prevState.tasks]),
                    newTaskMessage: "",
                }));
            } catch ({ message }) {
                console.log("Error _createTaskAsync: ", message);
            } finally {
                this._setTasksFetchingState(false);
            }
        }

        return null;
    };

    _removeTaskAsync = async (id) => {
        try {
            this._setTasksFetchingState(true);

            await api.removeTask(id);

            this.setState(({ tasks }) => ({
                tasks: tasks.filter((task) => task.id !== id),
            }));
        } catch ({ message }) {
            console.error("Error _removeTaskAsync: ", message);
        } finally {
            this._setTasksFetchingState(false);
        }
    };

    _updateTaskAsync = async (updatedTask) => {
        try {
            this._setTasksFetchingState(true);
            const { tasks } = this.state;
            const updateTask = await api.updateTask(updatedTask);

            const newTasks = tasks.map((item) => {
                if (item.id === updateTask.id) {
                    return updatedTask;
                }

                return item;
            });

            const sortedTasks = sortTasksByGroup(newTasks);

            this.setState({
                tasks: sortedTasks,
            });
        } catch ({ message }) {
            console.log("Error _updateTaskAsync", message);
        } finally {
            this._setTasksFetchingState(false);
        }
    };

    _completeAllTasksAsync = async () => {
        const incompleteTasks = this.state.tasks.filter((task) => {
            return task.completed === false;
        });

        if (incompleteTasks.length !== 0) {
            this._setTasksFetchingState(true);

            try {
                await api.completeAllTasks(
                    incompleteTasks.map((task) => {
                        task.completed = true;

                        return task;
                    })
                );

                this.setState(({ tasks }) => ({
                    tasks: tasks.map((task) => {
                        task.completed = true;

                        return task;
                    }),
                }));
            } catch ({ message }) {
                console.log("Error _completeAllTasksAsync", message);
            } finally {
                this._setTasksFetchingState(false);
            }
        } else {
            return null;
        }
    };

    _updateTasksFilter = (e) => {
        const { value } = e.target;

        this.setState({ tasksFilter: value.toLocaleLowerCase() });
        this._searchForTask();
    };

    _searchForTask = () => {
        const { tasks, tasksFilter } = this.state;

        if (tasksFilter) {
            return tasks.filter((task) =>
                task.message.toLocaleLowerCase().includes(tasksFilter)
            );
        }

        return null;
    };

    _setTasksFetchingState = (isTasksFetching) => {
        this.setState({
            isTasksFetching,
        });
    };

    _updateNewTaskMessage = (e) => {
        const { value: newTaskMessage } = e.target;

        this.setState({ newTaskMessage });
    };

    _getAllCompleted = () => {
        return this.state.tasks.every((task) => task.completed);
    };

    render () {
        const {
            tasks,
            isTasksFetching,
            newTaskMessage,
            tasksFilter,
        } = this.state;

        const checkBox = tasks.length ? this._getAllCompleted() : false;
        const searchedTask = this._searchForTask();
        const myTasks = searchedTask !== null ? searchedTask : tasks;

        const tasksList = myTasks.map((task) => (
            <Task
                key = { task.id }
                { ...task }
                _removeTaskAsync = { this._removeTaskAsync }
                _updateTaskAsync = { this._updateTaskAsync }
            />
        ));

        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { isTasksFetching } />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            placeholder = 'Поиск'
                            type = 'search'
                            value = { tasksFilter }
                            onChange = { this._updateTasksFilter }
                        />
                    </header>
                    <section>
                        <form onSubmit = { this._createTaskAsync }>
                            <input
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                placeholder = 'Описaние моей новой задачи'
                                type = 'text'
                                value = { newTaskMessage }
                                onChange = { this._updateNewTaskMessage }
                            />
                            <button>Добавить задачу</button>
                        </form>
                        <div className = { Styles.overlay }>
                            <ul>
                                <FlipMove duration = { 400 }>{tasksList}</FlipMove>
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { checkBox }
                            color1 = '#363636'
                            color2 = '#fff'
                            height = { 25 }
                            width = { 25 }
                            onClick = { this._completeAllTasksAsync }
                        />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
