import React from 'react';
import ColumnsContainer from '../components/ColumnsContainer';
import TaskCard from './taskCard';

const TasksList = () => {
  const pannels = [{
    title: 'panel',
    counter: 0,
    color: 'bg-blue',
    id: '1',
  },
  {
    title: 'panel 2',
    counter: 0,
    color: '#222',
    id: '2',
  }
  ];

  const [tasks, setTask] = React.useState([{ id_task: 1, title: 'Test task', statusId: '1' }]);

  const handleCardClick = () => { };

  const ChangeTaskStatus = (taskChanged, newStatus) => {
    setTask(tasks.map(task => task.id_task === taskChanged.id_task ? { ...task, statusId: newStatus }: { ...task }));
  };

  return (
    <ColumnsContainer
      view="kanban"
      dropDrag={ChangeTaskStatus}
      // initialData={mapedCards}
      pannels={pannels}
      cards={tasks}
      clickOnCard={handleCardClick}
      idKey="id_task"
      statusLabel="statusId"
      component={TaskCard}
    />

  );
};


export default TasksList;