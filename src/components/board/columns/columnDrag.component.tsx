import React, { useState, useEffect, DragEvent } from 'react';
import DraggableCard from '../draggableTask/draggableTask.component';

interface card {
  [key: string]: string;
}

interface cardCompomnentProps {
  card: card;
  color: string;
}

interface column {
  id: string;
  title: string;
  color: string;
  isRestricted: boolean;
}

interface ColumnDragProps {
  view?: string;
  column: column;
  cardList: card[];
  dropDrag?: (card?: card | null, newStatus: string) => void;
  draggable?: card | null;
  cardComponent(props: cardCompomnentProps): React.ReactNode;
  setDraggable?: (card: card | null) => void;
  cardIdLabel: string;
  columnHeaderComponent(title: string, length: number, color: string): React.ReactNode;
}

const ColumnDrag = ({
  view = 'kanban',
  column,
  cardList,
  dropDrag = () => {},
  draggable: draggableCardRef,
  cardComponent,
  setDraggable = () => {},
  cardIdLabel,
  columnHeaderComponent,
}: ColumnDragProps) => {
  const { id, title, isRestricted, color } = column;
  const [isOpenCollapse, setIsOpenCollapse] = useState(true);
  const [over, setOver] = useState('');

  useEffect(() => {
    if (view === 'kanban') {
      setIsOpenCollapse(true);
    }
  }, [view]);

  function drop(e: DragEvent<HTMLDivElement>, iDropedElement: string) {
    // sending to pa
    dropDrag(draggableCardRef, iDropedElement);
    // clean target card
    setDraggable(null);
    setOver('');
  }

  function setDraggableCardRef(card: card) {
    if (isRestricted) {
      return;
    }
    setDraggable(card);
  }

  function setCollapse() {
    if (view === 'list') {
      setIsOpenCollapse(!isOpenCollapse);
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isRestricted) {
      setOver('over block');
    } else {
      setOver('over');
    }
  };

  return (
    <div className='column-task-container' data-testid='column'>
      <>
        <div onClick={setCollapse} />
        {columnHeaderComponent(title, cardList.length, color)}
        <div
          className={`column-body ${over} ${isOpenCollapse ? 'open' : 'collapse'}`}
          onDrop={(e) => drop(e, id)}
          onDragOver={handleDragOver}
          onDragLeave={(e) => {
            e.preventDefault();
            setOver('');
          }}
          style={{ cursor: `${isRestricted ? 'no-drop' : 'auto'}` }}
          data-testid={`${title}-drag`}
        >
          <div data-testid={title}>
            {cardList.map((card) => (
              <DraggableCard
                key={card[cardIdLabel]}
                card={card}
                cardIdLabel={cardIdLabel}
                columnColor={color}
                draggableCardRef={draggableCardRef}
                setDraggableCardRef={setDraggableCardRef}
                cardComponent={cardComponent}
              />
            ))}
          </div>
        </div>
      </>
    </div>
  );
};

export default ColumnDrag;
