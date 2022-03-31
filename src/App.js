import React, { useState } from 'react'
import TasksList from './TasksList/taskList'
import './App.css'

function App() {
  const [view, setView] = useState('kanban')

  const handleChangeView = () => {
    setView(view === 'kanban' ? 'list' : 'kanban')
  }

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Task Board Example</h1>
      </header>
      <div>
        <button className='primary' onClick={handleChangeView}>
          change to {view === 'kanban' ? 'list' : 'kanban'}
        </button>
      </div>
      <div className='task-list'>
        <TasksList view={view} />
      </div>
    </div>
  )
}

export default App
