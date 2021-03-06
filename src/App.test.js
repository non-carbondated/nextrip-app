import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders navigation buttons', () => {
  render(<App />)

  const realTimeDeparturesButton = screen.getByRole('link', { name: 'Real time departures' })
  const aboutButton = screen.getByRole('link', { name: 'About' })

  expect(realTimeDeparturesButton).toBeInTheDocument()
  expect(aboutButton).toBeInTheDocument()
})

test('renders the Real time departures page by default', () => {
  render(<App />)

  expect(screen.getByRole('heading', { name: 'Real time departures' })).toBeInTheDocument()
})

test('renders the About page when the About navigation button is clicked', async () => {
  render(<App />)

  userEvent.click(screen.getByRole('link', { name: 'About' }))

  expect(await screen.findByRole('heading', { name: 'About this project' })).toBeInTheDocument()
})

test('renders the Real time departures page when the Real time departures navigation button is clicked', async () => {
  render(<App />)

  // navigate away before clicking real time departures nav button
  userEvent.click(screen.getByRole('link', { name: 'About' }))
  expect(await screen.findByRole('heading', { name: 'About this project' })).toBeInTheDocument()

  userEvent.click(screen.getByRole('link', { name: 'Real time departures' }))

  expect(await screen.findByRole('heading', { name: 'Real time departures' })).toBeInTheDocument()
})
