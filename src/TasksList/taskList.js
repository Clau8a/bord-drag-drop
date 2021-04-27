import React from 'react';
import ColumnsContainer from '../components/ColumnsContainer';
import ColumnDrag from '../components/column';
import TaskCard from './taskCard';

const TasksList = () => {
  const [tasks, setTask] = React.useState([
    { id_task: 1, title: 'Task 1', statusId: '1' },
    { id_task: 2, title: 'Task 2', statusId: 'pending' },
    { id_task: 3, title: 'Task three with a very long title', statusId: '2' },
    { id_task: 4, title: 'Task 4', statusId: 'pending' },
    { id_task: 5, title: 'Task 5', statusId: 'pending' },
    { id_task: 6, title: 'Task 6', statusId: 'pending' },
    { id_task: 7, title: 'Task 7', statusId: 'pending' },
    { id_task: 8, title: 'Task 8', statusId: 'pending' },
    { id_task: 9, title: 'Task 9', statusId: 'pending' },
    { id_task: 10, title: 'Task 10', statusId: 'pending' },
    { id_task: 11, title: 'Task 11', statusId: 'pending' },
    { id_task: 12, title: 'Task 12', statusId: 'pending' },
    { id_task: 13, title: 'Task 13', statusId: 'pending' },
  ]);

  const ChangeTaskStatus = (taskChanged, newStatus) => {
    setTask(tasks.map(task => task.id_task === taskChanged.id_task ? { ...task, statusId: newStatus } : { ...task }));
  };

  return (
    <ColumnsContainer
      view="kanban"
      dropDrag={ChangeTaskStatus}
      taskIdLabel="id_task"
    >
      <ColumnDrag
        id="1"
        title="column 1"
        color="#222"
        tasks={tasks.filter(task => task.statusId === '1')}
        taskComponent={TaskCard}
      />
      <ColumnDrag
        id="2"
        title="column 2"
        color="blue"
        tasks={tasks.filter(task => task.statusId === '2')}
        taskComponent={TaskCard}
      />
      <ColumnDrag
        id="pending"
        title="pending"
        color="#f3f"
        tasks={tasks.filter(task => task.statusId === 'pending')}
        taskComponent={TaskCard}
      />
      <ColumnDrag
        id="done"
        title="Done"
        color="#8c00ff"
        tasks={tasks.filter(task => task.statusId === 'done')}
        taskComponent={TaskCard}
      />
      <ColumnDrag
        id="cancel"
        title="Cancel"
        color="#ff8300"
        tasks={tasks.filter(task => task.statusId === 'cancel')}
        taskComponent={TaskCard}
      />
    </ColumnsContainer>
  );
};


export default TasksList;