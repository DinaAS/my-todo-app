import { Component } from 'react';

import './tasks-filter.css';

export default class TasksFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'all',
    };
  }

  onFilter = (e) => {
    const { target } = e;
    const { onActiveTasks, onCompletedTasks, onAllTasks } = this.props;
    if (target.id === 'active') {
      onActiveTasks();
    }
    if (target.id === 'complete') {
      onCompletedTasks();
    }
    if (target.id === 'all') {
      onAllTasks();
    }
    this.setState({
      active: target.id,
    });
  };

  render() {
    const { active } = this.state;
    return (
      <ul className="filters">
        <li>
          <button id="all" className={active === 'all' ? 'selected' : ''} type="button" onClick={this.onFilter}>
            All
          </button>
        </li>
        <li>
          <button id="active" className={active === 'active' ? 'selected' : ''} type="button" onClick={this.onFilter}>
            Active
          </button>
        </li>
        <li>
          <button
            id="complete"
            className={active === 'complete' ? 'selected' : ''}
            type="button"
            onClick={this.onFilter}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
