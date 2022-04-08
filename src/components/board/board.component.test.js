/* eslint-disable react/react-in-jsx-scope */
import Board from './board.component'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { columnsArray, dummyData } from '../../utils/constants'

test('render 5 columns', () => {
  render(<Board columns={columnsArray} data={dummyData} />)
  const columns = screen.getAllByTestId('column')
  expect(columns.length).toBe(5)
})

test('drag one task from pending column to done column', () => {
  const data = [{ id_task: 2, title: 'Task 2', statusId: 'pending' }]
  const columns = [
    { id: 'pending', title: 'pending', color: '#f3f' },
    { id: 'done', title: 'done', color: '#8c00ff' },
  ]
  render(<Board view='kanban' columns={columns} data={data} />)
  const pendingColumn = screen.getAllByTestId('pending')
  const doneColumnDrag = screen.getByTestId('done-drag')
  const doneTasks = screen.getAllByTestId('done')
  const task = screen.getByTestId('task')

  expect(pendingColumn.length).toBe(1)

  fireEvent.dragStart(task)
  fireEvent.dragEnter(doneColumnDrag)
  fireEvent.dragOver(doneColumnDrag)
  fireEvent.drop(doneColumnDrag)

  waitFor(() => {
    expect(doneTasks.length).toBe(1)
    expect(pendingColumn.length).toBe(0)
  })
})
