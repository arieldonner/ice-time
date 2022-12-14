import React from 'react';
import Navbar from '../components/navbar';
import EventForm from '../components/event-form';
import { AppContext } from '../lib';

export default class EditEventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { eventId: this.props.eventId };
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <h1 className="heading cookie">Edit Event</h1>
          <EventForm eventId={this.state.eventId}/>
        </div>
      </div>
    );
  }
}

EditEventPage.contextType = AppContext;
