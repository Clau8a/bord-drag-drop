import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ColumnsContainer from './columns/columnContainer'
import ColumnDrag from './columns/columnDrag'
import TaskCard from './taskCard/taskCard'
import ColumnHeader from './columns/columnHeader.component'
import './draggable.scss'

const Board = ({
  taskIdLabel: cardIdLabel,
  view,
  data,
  columns,
  statusLabel,
  taskComponent: cardComponent,
  columnHeaderComponent,
}) => {
  const [cardList, setCardList] = useState(data)

  const changeCardStatus = (droppedCard, newStatus) => {
    setCardList(
      cardList.map((card) =>
        card[cardIdLabel] === droppedCard[cardIdLabel]
          ? { ...card, statusId: newStatus }
          : { ...card },
      ),
    )
  }

  const getCardListByColumn = (columnId) => {
    return cardList.filter((card) => card[statusLabel] === columnId)
  }

  return (
    <ColumnsContainer
      view={view}
      dropDrag={changeCardStatus}
      taskIdLabel={cardIdLabel}
      statusLabel={statusLabel}
    >
      {columns.map((column) => (
        <ColumnDrag
          key={column.id}
          column={column}
          cardIdLabel={cardIdLabel}
          cardList={getCardListByColumn(column.id)}
          cardComponent={cardComponent}
          columnHeaderComponent={columnHeaderComponent}
        />
      ))}
    </ColumnsContainer>
  )
}

Board.propTypes = {
  taskIdLabel: PropTypes.string.isRequired,
  view: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.array,
  taskComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  columnHeaderComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  statusLabel: PropTypes.string.isRequired,
}

Board.defaultProps = {
  view: 'kanban',
  data: [],
  columns: [],
  taskComponent: TaskCard,
  columnHeaderComponent: (title, taskLength, color) => (
    <ColumnHeader title={title} taskLength={taskLength} color={color} />
  ),
}

export default Board
