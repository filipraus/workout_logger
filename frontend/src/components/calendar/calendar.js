import React from 'react';

import './calendar.css';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import Workout from '../workout/workout';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    }
  }

  handleDateClicked(date) {
    this.setState({
      date: date,
    });
  }

  render() {
    return (
      <div>
        {this.state.date == '' &&
          <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView='dayGridMonth'
            headerToolbar={{ left: 'prev', center: 'title', right: 'next' }}
            titleFormat={{ month: 'long' }}
            dateClick={(info) => this.handleDateClicked(info.dateStr)}
            height='445px'
          />
        }
        {this.state.date &&
          <Workout date={this.state.date} />
        }
      </div>
    )
  }
}

export default Calendar;