import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DraggableTask from '../draggableTask/draggableTask.component'

const ColumnDrag = ({
  view,
  id,
  title,
  tasks,
  color,
  dropDrag,
  draggable,
  taskComponent,
  setDraggable,
  taskIdLabel,
  isRestricted,
  columnHeaderComponent,
}) => {
  const [isOpenCollapse, setIsOpenCollapse] = useState(true)
  const [over, setOver] = useState('')

  useEffect(() => {
    if (view === 'kanban') {
      setIsOpenCollapse(true)
    }
  }, [view])

  function drop(e, iDropedElement) {
    // sending to pa
    dropDrag(draggable, iDropedElement)
    // clean target card
    setDraggable(null)
    setOver('')
  }

  function setCardTarget(card) {
    setDraggable(card)
  }

  function setCollapse() {
    console.log('setcollapse')
    if (view === 'list') {
      setIsOpenCollapse(!isOpenCollapse)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    if (isRestricted) {
      setOver('over block')
    } else {
      setOver('over')
    }
  }

  return (
    <div className='column-task-container' data-testid='column'>
      <div onClick={setCollapse}></div>
      {columnHeaderComponent(title, tasks.length, color)}
      <div
        className={`column-body ${over} ${isOpenCollapse ? 'open' : 'collapse'}`}
        onDrop={(e) => drop(e, id)}
        onDragOver={handleDragOver}
        onDragLeave={(e) => {
          e.preventDefault()
          setOver('')
        }}
        style={{ cursor: `${isRestricted ? 'no-drop' : 'auto'}` }}
        data-testid={`${title}-drag`}
      >
        <div data-testid={title}>
          {tasks.map((task) => (
            <DraggableTask
              key={task[taskIdLabel]}
              task={task}
              view={view}
              color={color}
              draggable={draggable}
              setDraggable={!isRestricted ? setCardTarget : (f) => f}
              idKey={taskIdLabel}
              component={taskComponent}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

ColumnDrag.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  view: PropTypes.string,
  tasks: PropTypes.array,
  taskIdLabel: PropTypes.string,
  isRestricted: PropTypes.bool,
  dropDrag: PropTypes.func,
  setDraggable: PropTypes.func,
  id: PropTypes.string,
  draggable: PropTypes.bool,
  taskComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  columnHeaderComponent: PropTypes.func,
}

ColumnDrag.defaultProps = {
  title: 'Column Title',
  view: 'kanban',
  color: '000',
  tasks: [],
  taskIdLabel: 'id',
  taskComponent: null,
  isRestricted: false,
  dropDrag: (f) => f,
  setDraggable: (f) => f,
  columnHeaderComponent: (f) => f,
}

export default ColumnDrag
