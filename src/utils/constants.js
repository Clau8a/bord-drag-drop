export const dummyData = [
  {
    taskId: 1,
    title: 'Task 1',
    statusId: '1',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  },
  { taskId: 2, title: 'Task 2', statusId: 'pending' },
  { taskId: 3, title: 'this is a Task title with a very very long text', statusId: '2' },
  { taskId: 4, title: 'Task 4', statusId: 'pending' },
  { taskId: 5, title: 'Task 5', statusId: 'pending' },
  { taskId: 6, title: 'Task 6', statusId: 'pending' },
  { taskId: 7, title: 'Task 7', statusId: 'pending' },
  { taskId: 8, title: 'Task 8', statusId: 'pending' },
  { taskId: 9, title: 'Task 9', statusId: 'pending' },
  { taskId: 10, title: 'Task 10', statusId: 'done' },
  { taskId: 11, title: 'Task 11', statusId: 'pending' },
  { taskId: 12, title: 'Task 12', statusId: 'pending' },
  { taskId: 13, title: 'Task 13', statusId: 'pending' },
];

export const columnsArray = [
  { id: '1', title: 'column 1', color: '#222', isRestricted: true },
  { id: '2', title: 'column 2', color: 'blue' },
  { id: 'pending', title: 'pending', color: '#f3f' },
  { id: 'done', title: 'Done', color: '#8c00ff' },
  { id: 'cancel', title: 'cancel', color: '#ff8300' },
];

export const DEFAULT_VIEW = 'kanban';

export const getView = (view) => (view === DEFAULT_VIEW ? 'list' : DEFAULT_VIEW);
