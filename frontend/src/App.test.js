import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('loads the calendar with the current month', () => {
    render(<App />)
    const month = new Date().toLocaleString('en-US', {
      month: 'long', 
      year: 'numeric'
    });

    const calendarMonth = screen.getByText(`${month}`);
    expect(calendarMonth).toBeInTheDocument();
  });
});