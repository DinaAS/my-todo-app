import TasksFilter from '../tasks-filter';

import './footer.css';

function Footer({ countTodo, onDeleteCompletedTask, onActiveTasks, onCompletedTasks, onAllTasks }) {
  return (
    <footer className="footer">
      <span className="todocount">{countTodo} items left</span>
      <TasksFilter onActiveTasks={onActiveTasks} onCompletedTasks={onCompletedTasks} onAllTasks={onAllTasks} />
      <button className="clear-completed" type="button" onClick={onDeleteCompletedTask}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
