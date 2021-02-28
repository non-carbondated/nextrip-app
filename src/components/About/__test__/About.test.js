import { render, screen } from '@testing-library/react'
import About from '../index'

test('renders NexTrip API link', () => {
  render(<About />);
  const linkElement = screen.getByText(/NexTrip API/i);
  expect(linkElement).toBeInTheDocument();
});
