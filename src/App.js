
import TasksList from './TasksList/taskList';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Board Example</h1>
      </header>
      <div>
        <TasksList />

      </div>
    </div>
  );
}

export default App;
