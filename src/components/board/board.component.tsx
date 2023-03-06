import React, { useState } from 'react';
import ColumnsContainer from './columns/columnContainer';
import ColumnDrag from './columns/columnDrag.component';
import TaskCard from './taskCard/taskCard';
import ColumnHeader from './columns/columnHeader.component';
import './draggable.scss';

interface column {
  [key: string]: string | boolean;
  id: string;
  title: string;
  color: string;
  isRestricted: boolean;
}

interface card {
  [key: string]: string;
}

interface cardComponentProps {
  card: card;
  color: string;
}

interface BoardProps {
  cardIdLabel: string;
  view: string;
  itemsList: [];
  columnsList: column[];
  statusLabel: string;
  cardComponent(props: cardComponentProps): React.ReactNode;
  columnHeaderComponent(title: string, length: number, color: string): React.ReactNode;
}

const Board = ({
  cardIdLabel,
  view = 'kanban',
  itemsList,
  columnsList,
  statusLabel,
  cardComponent,
  columnHeaderComponent,
}: BoardProps) => {
  const [cardList, setCardList] = useState<card[]>(itemsList);

  const changeCardStatus = (droppedCard: card, newStatus: string) => {
    setCardList(
      cardList.map((card) =>
        card[cardIdLabel] === droppedCard[cardIdLabel]
          ? { ...card, statusId: newStatus }
          : { ...card },
      ),
    );
  };

  const getCardListByColumn = (columnId: string | number) => {
    return cardList.filter((card) => card[statusLabel] === columnId);
  };

  return (
    <ColumnsContainer
      view={view}
      dropDrag={changeCardStatus}
      taskIdLabel={cardIdLabel}
      statusLabel={statusLabel}
    >
      {columnsList.map((column) => (
        <ColumnDrag
          key={column.id}
          column={column}
          cardIdLabel={cardIdLabel}
          cardList={getCardListByColumn(column.id)}
          cardComponent={cardComponent ?? TaskCard}
          columnHeaderComponent={columnHeaderComponent}
        />
      ))}
    </ColumnsContainer>
  );
};

Board.defaultProps = {
  view: 'kanban',
  itemsList: [],
  columnsList: [],
  taskComponent: TaskCard,
  columnHeaderComponent: (title: string, taskLength: number, color: string) => (
    <ColumnHeader title={title} taskLength={taskLength} color={color} />
  ),
};

export default Board;
