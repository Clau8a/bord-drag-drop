import React from 'react'
import Board from './board.component'
// import TaskCard from './taskCard/taskCard'
// import ColumnHeader from './columns/columnHeader.component'
import { dummyData, columnsArray } from '../../utils/constants'
import CustomColumnHeader from '../custom/customColumnHeader.component'
import CustomCard from '../custom/customCard.component'
import ColumnHeader from './columns/columnHeader.component'
import TaskCard from './taskCard/taskCard'

import { expect } from '@storybook/jest'
import { waitFor, within, fireEvent } from '@storybook/testing-library'

export default {
  title: 'DragAndDrop/Board',
  component: Board,
  argTypes: {
    view: {
      description: 'defines the view of the bord',
      options: ['kanban', 'list'],
      control: { type: 'select' },
    },
    data: { description: 'array with the datasource', control: { type: null } },
    columns: { description: 'array with the columns configuration', control: { type: null } },
    taskComponent: {
      description: 'add a custom component',
      options: ['default', 'custom'],
      control: { type: 'select' },
    },
    columnHeaderComponent: {
      description: 'add a custom component',
      options: ['default', 'custom'],
      control: { type: 'select' },
    },
    statusLabel: {
      description: 'key use to match the task status with the column status',
      control: { type: 'text' },
    },
  },
}

const chooseColumnComponent = (value) => {
  if (value === 'custom') {
    return CustomColumnHeader
  } else {
    return ColumnHeader
  }
}

const chooseTaskComponent = (value) => {
  if (value === 'custom') {
    return CustomCard
  } else {
    return TaskCard
  }
}

const Template = (args) => {
  const ColumnComponent = chooseColumnComponent(args.columnHeaderComponent)
  const TaskComponent = chooseTaskComponent(args.taskComponent)
  return (
    <div className='task-list'>
      <Board
        data={dummyData}
        columns={columnsArray}
        {...args}
        taskComponent={TaskComponent}
        columnHeaderComponent={(title, taskLength, color) => (
          <ColumnComponent title={title} taskLength={taskLength} color={color} />
        )}
      />
    </div>
  )
}

export const Sample = Template.bind({})
Sample.args = {
  statusLabel: 'statusId',
  view: 'kanban',
}

export const Default = Template.bind({})
Default.args = {
  statusLabel: 'statusId',
  view: 'kanban',
  taskComponent: 'default',
  columnHeaderComponent: 'default',
  data: [{ id_task: 2, title: 'Task 2', statusId: 'pending' }],
  columns: [
    { id: 'pending', title: 'pending', color: '#f3f' },
    { id: 'done', title: 'done', color: '#8c00ff' },
  ],
}

Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const pendingColumn = canvas.getByTestId('pending')
  const doneColumnDrag = canvas.getByTestId('done-drag')
  const doneColumn = canvas.getByTestId('done')
  const task = canvas.getByTestId('draggableTask-2')
  const pendingTasks = args.data.filter((task) => task.statusId === 'pending').length

  await expect(pendingColumn.children.length).toBe(pendingTasks)

  setTimeout(async () => {
    fireEvent.dragStart(task)
    fireEvent.dragEnter(doneColumnDrag)
    fireEvent.dragOver(doneColumnDrag)
    fireEvent.drop(doneColumnDrag)

    const doneColumnLength = doneColumn?.children?.length || 0

    await expect(doneColumnLength).toBe(1)

    await waitFor(() => expect(pendingColumn.children.length).toBe(0))
  }, 3000)
}

export const Customize = Template.bind({})
Customize.args = {
  view: 'kanban',
  data: dummyData,
  statusLabel: 'statusId',
  columns: columnsArray,
  taskComponent: 'custom',
  columnHeaderComponent: 'custom',
}
