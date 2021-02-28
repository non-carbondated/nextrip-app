import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders navigation buttons', () => {
  render(<App />)

  const realTimeDeparturesButton = screen.getByRole('button', { name: 'Real time departures' })
  const aboutButton = screen.getByRole('button', { name: 'About' })

  expect(realTimeDeparturesButton).toBeInTheDocument()
  expect(aboutButton).toBeInTheDocument()
})

test('renders the Real time departures page by default', () => {
  render(<App />)

  expect(screen.getByRole('heading', { name: 'Real time departures' })).toBeInTheDocument()
})

test('renders the About page when the About navigation button is clicked', () => {
  render(<App />)

  userEvent.click(screen.getByRole('button', { name: 'About' }))

  expect(screen.getByRole('heading', { name: 'About this project' })).toBeInTheDocument()
})

test('renders the Real time departures page when the Real time departures navigation button is clicked', () => {
  render(<App />)

  userEvent.click(screen.getByRole('button', { name: 'Real time departures' }))

  expect(screen.getByRole('heading', { name: 'Real time departures' })).toBeInTheDocument()
})
