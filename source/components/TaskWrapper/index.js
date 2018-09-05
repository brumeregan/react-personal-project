import React, { Component } from 'react';
import TaskCreation from 'components/TaskCreation';
import Task from 'components/Task';

export default class TaskWrapper extends Component {
    render () {
        const { tasks, _createTaskAsync, _removeTaskAsync, _updateTaskAsync } = this.props;

        const TasksJSX = tasks.map((task) => {
            return (
                <Task
                    key = { task.id }
                    id = { task.id }
                    message = { task.message }
                    completed = { task.completed }
                    favorite = { task.favorite }
                    _removeTaskAsync = { _removeTaskAsync }
                    _updateTaskAsync = { _updateTaskAsync }
                />
            );
        });

        return (
            <div>
                <TaskCreation _createTask = { _createTaskAsync } />
                <ul>
                    { TasksJSX }
                </ul>
            </div>
        );
    }
}
