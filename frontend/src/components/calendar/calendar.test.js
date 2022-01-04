import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Calendar from './calendar';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Calendar', () => {
  test('has current date as a cell in the grid ', () => {
    render(<Calendar />);

    const today = (new Date()).toLocaleString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });

    const gridcell = screen.getByRole('gridcell', { name: 'January 2, 2022' });
    expect(gridcell).toBeInTheDocument();
  });

  test('clicking on todays date opens the week view of today', async () => {
    act(() => {
      ReactDOM.render(<Calendar />, container);
    });
    
    const today = (new Date()).toLocaleString('en-US', {
      month: 'long',  
      day: 'numeric',
      year: 'numeric',
    });

    const gridcell = screen.getByRole('gridcell', { name: today });

    act(() => {
      fireEvent.mouseDown(gridcell);
      fireEvent.mouseUp(gridcell);
    });

    await waitFor(() => {
      expect(screen.getByText(today)).toBeInTheDocument();
    });
  });
}); 