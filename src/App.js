import React, { useState } from 'react'
import Board from './components/board/board.component'
import { dummyData, columnsArray, getView, DEFAULT_VIEW } from './utils/constants'
import CustomCard from './components/custom/customCard.component'
import CustomColumnHeader from './components/custom/customColumnHeader.component'
import ViewButton from './components/viewButton/viewButton.component'
import './App.scss'

function App() {
  const [view, setView] = useState(DEFAULT_VIEW)

  const handleChangeView = () => {
    setView(getView(view))
  }

  return (
    <div className='app'>
      <div>
        <header className='app-header'>
          <h1>Task Board basic example</h1>
        </header>
        <div>
          <ViewButton view={view} handleChangeView={handleChangeView} />
        </div>
        <div className='task-list'>
          <Board
            view={view}
            data={dummyData}
            columns={columnsArray}
            taskIdLabel='taskId'
            statusLabel='statusId'
          />
        </div>
      </div>

      <div>
        <header className='app-header'>
          <h1>Task Board with custom task and custom header example</h1>
        </header>
        <div className='custom-task-list'>
          <Board
            taskIdLabel='id_task'
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
