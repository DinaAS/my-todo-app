import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import './task.css';

export default class Task extends Component {
  state = {
    task: '',
  };

  dateCreate = new Date();

  date = formatDistanceToNow(this.dateCreate, 'ddd/MMM/D/YYYY/hh/m/ss', {
    includesSeconds: true,
    addSuffix: true,
    locale: ruLocale,
  });

  onSubmit = (e) => {
    const { id, onUpdate } = this.props;
    const { task } = this.state;

    e.preventDefault();
    onUpdate(id, task);
    this.setState({
      task: '',
    });
  };

  onChange = (e) => {
    this.setState({
      task: e.target.value,
    });
  };

  render() {
    const { taskName, onDeleted, done, edit, onToggleDone, onEditing, view, id } = this.props;
    // const { task } = this.state;

    let classNameOfTask = '';
    if (done) {
      classNameOfTask += ' completed';
    }

    if (edit) {
      classNameOfTask += ' editing';
    }

    if (!view) {
      classNameOfTask += ' hidden';
    }

    return (
      <li className={classNameOfTask} key={id}>
        {edit && (
          <form onSubmit={this.onSubmit}>
            <input type="text" className="edit" onChange={this.onChange} value={taskName} />
          </form>
        )}

        <div className="view" role="contentinfo">
          <input
            className="toggle"
            type="checkbox"
            onClick={onToggleDone}
            checked={done}
            onChange={() => {}}
            id="done"
          />
          <label onClick={onToggleDone} role="presentation" htmlFor="done">
            <span className="description">{taskName}</span>
            <span className="created">created {this.date} ago</span>
          </label>
          <button className="icon icon-edit" onClick={onEditing} type="button" aria-label="Edit" />
          <button className="icon icon-destroy" onClick={onDeleted} type="button" aria-label="Destroy" />
        </div>
      </li>
    );
  }
}
