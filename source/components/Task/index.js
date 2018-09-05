// Core
import React, {PureComponent} from 'react';

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

    state = {
        newMessage: this.props.message,
        isTaskEditing: false,
    };

    _removeTask = () => {
        const {_removeTaskAsync, id} = this.props;

        _removeTaskAsync(id);
    };

    _toggleTaskFavoriteState = () => {
        const {_updateTaskAsync, favorite} = this.props;

        _updateTaskAsync(this._getTaskShape({
            favorite: !favorite,
        }));

    };

    _toggleTaskCompletedState = () => {
        const {_updateTaskAsync, completed} = this.props;

        _updateTaskAsync(
            this._getTaskShape({
                completed: !completed,
            })
        );

    };

    _toggleEditingStatus = () => {
        // const { isTaskEditing } = this.state;

        this.setState(({isEditing}) => ({
            isTaskEditing: !isEditing,
        }));
    };

    _setTaskEditingState = (status) => {
        this.setState(({isEditing}) => ({
            isTaskEditing: status,
        }));
    };

    _updateTask = () => {
        const { _updateTaskAsync, message} = this.props;

        const {newMessage} = this.state;

        if (message !== newMessage) {
            _updateTaskAsync(
                this._getTaskShape({
                    message: newMessage,
                })
            );
        }

        this._setTaskEditingState(false);
        return null;
    };

    _updateNewTaskMessage = (e) => {
        console.log(e);
        const {value: newMessage} = e.target;

        this.setState({newMessage: newMessage});
    };

    _updateMessageOnKeyDown = (e) => {
        const {newMessage} = this.state;

        const isEnter = e.key === 'Enter';
        const isEsc = e.key === 'Escape';

        if (!newMessage) {
            return null;
        }

        if(isEsc) {
            this._cancelUpdatingTaskMessage();
        }

        if (isEnter) {
            this._updateTask();
        }
    };

    _updateTaskMessageOnClick = () => {
        const { isTaskEditing } = this.state;

        if(isTaskEditing) {
            this._updateTask();
            return null;
        }
    };

    _cancelUpdatingTaskMessage = () => {
        const { message: newMessage } = this.props;

        this._setTaskEditingState(false);

        this.setState({
            newMessage,
        });
    };

    taskInput = React.createRef();

    render() {
        const {isTaskEditing, newMessage} = this.state;
        const {message, favorite, completed} = this.props;

        return (
            <li className={Styles.task}>
                <Checkbox
                    inlineBlock
                    checked={completed}
                    className={Styles.toggleTaskCompletedState}
                    color1='#3B8EF3'
                    color2='#fff'
                    onClick={this._toggleTaskCompletedState}
                />

                <input
                    className = { Styles.content }
                    disabled = { !isTaskEditing }
                    type = { 'text' }
                    maxLength = { 50 }
                    value = { newMessage }
                    ref = { this.taskInput }
                    onChange = { this._updateNewTaskMessage }
                    onKeyDown = { this._updateMessageOnKeyDown }
                />

                <div className={Styles.actions}>
                    <Star
                        inlineBlock
                        checked={favorite}
                        className={Styles.toggleTaskFavoriteState}
                        color1='#3B8EF3'
                        color2='#000'
                        onClick={this._toggleTaskFavoriteState}
                    />

                    <Edit
                        inlineBlock
                        checked={isTaskEditing}
                        className={Styles.updateTaskMessageOnClick}
                        onClick={this._toggleEditingStatus}
                    />

                    <Remove
                        inlineBlock
                        onClick={this._removeTask}
                    />
                </div>
            </li>
        );
    }
}
