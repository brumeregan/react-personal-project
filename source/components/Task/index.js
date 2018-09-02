// Core
import React, { PureComponent } from 'react';

// Instruments
import Styles from './styles.m.css';
import Star from '../../theme/assets/Star';
import Remove from '../../theme/assets/Remove';
import Checkbox from '../../theme/assets/Checkbox';
import Edit from '../../theme/assets/Edit';


export default class Task extends PureComponent {
    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    _removeTask = () => {
        const { _removeTask, id } = this.props;

        _removeTask(id);
    };

    _favoriteTask = () => {
        const { _updateTask, favorite, id, message, completed } = this.props;

        const upd = {
            id,
            message,
            completed,
            favorite: !favorite,
        };

        console.log('upd', upd);

        _updateTask([upd]);

    };

    _completeTask = () => {
        const { _updateTask,
            favorite,
            id,
            message,
            completed } = this.props;

        _updateTask({
            id,
            message,
            completed: !completed,
            favorite,
        });

        _updateTask([upd]);
    };

    _editTask = () => {
        const { _updateTask } = this.props;

    };

    render () {
        const { message, favorite, completed } = this.props;
        console.log('props', this.props);

        return (
            <li className = { Styles.task }>
                <Checkbox
                    inlineBlock
                    checked = { completed }
                    className = { Styles.toggleTaskCompletedState }
                    color1 = '#3B8EF3'
                    color2 = '#fff'
                    onClick = { this._completeTask }
                />

                <div className={Styles.content}>{ message }</div>

                <div className = {Styles.actions} >
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._favoriteTask }
                    />

                    <Edit
                        inlineBlock
                        className = { Styles.updateTaskMessageOnClick }

                        onClick = { this._editTask }
                    />

                    <Remove
                        inlineBlock
                        onClick = { this._removeTask }
                    />
                </div>


            </li>
        );
    }
}
