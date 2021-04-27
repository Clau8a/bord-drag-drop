import React from 'react';
import PropTypes from 'prop-types';
import Column from './column';
import './draggable.scss';

// region P a n e l   d r a g g a b l e
// contenedor de las columnas o listas de tarjetas
const ColumnsContainer = ({
  statusLabel, idKey, view, clickOnCard, pannels, cards: tasks, component, dropDrag,
}) => {
  const [currentDragging, setCurrentDragging] = React.useState(null);
  const [mappedData, setMapData] = React.useState([]);

  React.useEffect(() => {
    function mapData() {
      if (pannels.length === 0) {
        return [];
      }

      if (tasks.length === 0) {
        return pannels;
      }

      const panelsIdList = pannels.map(elm => elm.id);
      const panelsList = pannels.map(elm => ({ ...elm, cards: [] }));
      for (let i = 0; i < tasks.length; i += 1) {
        const task = tasks[i];
        const idx = panelsIdList.indexOf(task[statusLabel]);
        panelsList[idx] = {
          ...panelsList[idx],
          counter: panelsList[idx].counter + 1,
          cards: [...panelsList[idx].cards, task],
        };
      }
      return panelsList;
    }
    setMapData(mapData());

    return () => {
      // setMapData([]);
    };
  }, [ pannels, tasks, statusLabel]);

  const handleOnDropTask =  (card, newStatus) => {
    if (card !== null) {
      if (card[statusLabel] !== newStatus) {
        dropDrag(card, newStatus);
      }
    }
  };

  return (
    <div className={`card-box-container ${view}`}>
      {
        mappedData.map(container => (
          <Column
            key={container.id}
            title={container.title}
            counter={container.counter}
            color={container.color}
            id={container.id}
            cards={container.cards || []}
            view={view}
            dropDrag={handleOnDropTask}
            draggable={currentDragging}
            setDraggable={setCurrentDragging}
            clickOnCard={clickOnCard}
            idKey={idKey}
            statusLabel={statusLabel}
            component={component}
            isRestricted={container.isRestricted}
            hide={container.hide}
          />
        ))
      }
    </div>
  );
};

ColumnsContainer.propTypes = {
  view: PropTypes.string,
  clickOnCard: PropTypes.func,
  dropDrag: PropTypes.func,
  pannels: PropTypes.array,
  cards: PropTypes.array,
  idKey: PropTypes.string,
  statusLabel: PropTypes.string,
  component: PropTypes.func,
};

ColumnsContainer.defaultProps = {
  view: 'kanban',
  clickOnCard: f => f,
  dropDrag: () => true,
  pannels: [],
  cards: [],
  idKey: 'id_task',
  statusLabel: 'status',
  component: null,
};
// endregion

export default ColumnsContainer;
