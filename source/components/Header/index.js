import React, { Component } from 'react';


export default class Header extends Component {
    render() {
        const { tasksFilter, _updateTasksFilter } = this.props;

        return (
            <header>
                <h1>Task planner</h1>
                <input type = "search"
                       placeholder = "search for task"
                       value = { tasksFilter }
                       onChange = { _updateTasksFilter } />
            </header>
        );
    }
}
