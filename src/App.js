import React, { useState } from 'react'
import Board from './components/board/board.component'
import { dummyData, columnsArray } from './utils/constants'
// import TaskCard from './components/taskCard/taskCard'
import CustomCard from './components/custom/customCard.component'
import CustomColumnHeader from './components/custom/customColumnHeader.component'
import './App.scss'

function App() {
  const [view, setView] = useState('kanban')

  const handleChangeView = () => {
    setView(view === 'kanban' ? 'list' : 'kanban')
  }

  return (
    <div className='app'>
      <div>
        <header className='app-header'>
          <h1>Task Board basic example</h1>
        </header>
        <div>
          <button className='primary' onClick={handleChangeView}>
            change to {view === 'kanban' ? 'list' : 'kanban'}
          </button>
        </div>
        <div className='task-list'>
          <Board view={view} data={dummyData} columns={columnsArray} statusLabel='statusId' />
        </div>
      </div>

      <div>
        <header className='app-header'>
          <h1>Task Board with custom task example</h1>
        </header>
        <div className='custom-task-list'>
          <Board
            view={view}
            data={dummyData}
            statusLabel='statusId'
            columns={columnsArray}
            taskComponent={CustomCard}
            columnHeaderComponent={(title, taskLength, color) => (
              <CustomColumnHeader title={title} taskLength={taskLength} color={color} />
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default App
