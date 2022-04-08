/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Task Board Example title', () => {
  render(<App />)
  const linkElement = screen.getByText(/Task Board Example/i)
  expect(linkElement).toBeInTheDocument()
})
