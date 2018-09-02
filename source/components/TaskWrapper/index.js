import React, { Component } from 'react';
import TaskCreation from 'components/TaskCreation';
import Task from 'components/Task';

export default class TaskWrapper extends Component {
    render () {

        const { tasks, _createTask, _removeTask, _updateTask } = this.props;

        console.log('tasksss', tasks);

        const TasksJSX = tasks.map((task) => {
            return (
                <Task
                    key = { task.id }
                    id = { task.id }
                    message = { task.message }
                    completed = { task.completed }
                    favorite = { task.favorite }
                    _removeTask = { _removeTask }
                    _updateTask = { _updateTask }
                />
            );
        });

        return (
            <div>
                <TaskCreation _createTask = { _createTask } />
                <ul>
                    { TasksJSX }
                </ul>
            </div>
        );
    }
}
