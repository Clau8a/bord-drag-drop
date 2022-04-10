import React from 'react'
import ColumnHeader from './columnHeader.component'
import './columns.scss'

export default {
  title: 'DragAndDrop/Column',
  component: ColumnHeader,
  argTypes: {
    title: { control: { type: 'text' } },
    taskLength: { control: { type: 'number' } },
    color: { control: 'color' },
  },
}

const Template = (args) => <ColumnHeader {...args} />

export const Customize = Template.bind({})
Customize.args = {
  taskLength: 1,
  title: 'Custom column',
}
