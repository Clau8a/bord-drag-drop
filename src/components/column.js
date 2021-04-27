import React from 'react';
import PropTypes from 'prop-types';
import Task from './draggableTask';


// region C A R D   C O N T A I N E R   d r a g g a b l e

const DraggableCardContainer = (props) => {
  const {
    title, counter, color, view, dropDrag, id, draggable,
    cards, component,
    setDraggable, statusLabel, idKey, isRestricted, hide,
  } = props;
  const [isOpenCollapse, setIsOpenCollapse] = React.useState(true);
  const [over, setOver] = React.useState('');
  React.useEffect(() => {
    if (view === 'kanban') {
      setIsOpenCollapse(true);
    }
  }, [view]);

  function formatCounter(newCounter) {
    return newCounter > 9 ? '+9' : (`0${newCounter}`);
  }

  function drop(e, iDropedElement) {
    // sending to pa
    dropDrag(draggable, iDropedElement);
    // clean target card
    setDraggable(null);
    setOver('');
  }

  function setCardTarget(card) {
    setDraggable(card);
  }

  function setCollapse() {
    if (view === 'list') {
      setIsOpenCollapse(!isOpenCollapse);
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    if (isRestricted && draggable.is_supervisor === 0) {
      setOver('over block');
    } else {
      setOver('over');
    }
  };

  console.log('color', color);
  return (
    <div className={`cards-container ${hide}`}>

      <div className="container-header" onClick={setCollapse}>
        <label className="counter" style={{ backgroundColor: `#${color}` }}>{formatCounter(counter)} {color}</label>
        <label className="title">{title}</label>
      </div>

      <div
        className={`cardD-container ${over}`}
        onDrop={(e) => drop(e, id)}
        onDragOver={handleDragOver}
        onDragLeave={(e) => { e.preventDefault(); setOver(''); }}
        style={{ cursor: `${isRestricted ? 'no-drop' : 'auto'}` }}
      >
        {/* <MDBCollapse isOpen={isOpenCollapse}> */}
        <div>
          {
            cards.map(card => (
              <Task
                key={card[idKey]}
                card={card}
                clickOnCard={card.clickOnCard ? card.clickOnCard : props.clickOnCard}
                view={view}
                color={color}
                draggable={draggable}
                setDraggable={setCardTarget}
                statusLabel={statusLabel}
                idKey={idKey}
                component={component}
              // clickOnCard={() => Details(history, `/cotizaciones/${elm.id}`)}
              />
            ))
          }
        </div>
        {/* </MDBCollapse> */}
      </div>
    </div>
  );
};

DraggableCardContainer.propTypes = {
  title: PropTypes.string,
  counter: PropTypes.number,
  color: PropTypes.string.isRequired,
  view: PropTypes.string,
  clickOnCard: PropTypes.func,
  cards: PropTypes.array,
  idKey: PropTypes.string,
  statusLabel: PropTypes.string,
  component: PropTypes.func,
  isRestricted: PropTypes.bool,
  hide: PropTypes.string,
  dropDrag: PropTypes.func,
  setDraggable: PropTypes.func,
};

DraggableCardContainer.defaultProps = {
  title: 'Card Title',
  counter: 0,
  view: 'kanban',
  clickOnCard: f => f,
  cards: [],
  idKey: 'idKey',
  statusLabel: 'statusLabel',
  component: null,
  isRestricted: false,
  hide: '',
  dropDrag: f => f,
  setDraggable: f => f,
};
// endregion

export default DraggableCardContainer;
