import React from 'react';
import { convertTime } from '../lib';
import NotFound from './not-found';

export default class EventTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: null, loading: false, error: false };
  }

  componentDidMount() {
    const currentSelect = this.props.value.toISOString().split('T')[0] + 'T00:00:00Z';
    fetch(`/api/events/${currentSelect}`, {
      headers: {
        'x-access-token': localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(res => {
        if (!Response.ok) {
          this.setState({ event: null, loading: false, error: false });
        }
        const sorted = res.sort(function (a, b) {
          return a.startTime.localeCompare(b.startTime);
        });
        this.setState({ event: sorted, loading: false, error: false });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      const currentSelect = this.props.value.toISOString().split('T')[0] + 'T00:00:00Z';
      this.setState({ loading: true });
      fetch(`/api/events/${currentSelect}`, {
        headers: {
          'x-access-token': localStorage.getItem('jwt')
        }
      })
        .then(res => res.json())
        .then(res => {
          if (!Response.ok) {
            this.setState({ event: null, loading: false, error: false });
          }
          const sorted = res.sort(function (a, b) {
            return a.startTime.localeCompare(b.startTime);
          });
          this.setState({ event: sorted, loading: false, error: false });
        })
        .catch(() => {
          this.setState({ error: true });
        });
    }
  }

  render() {
    if (!this.state.event) {
      return (
        <div className='row justify-content-center'>
          {this.state.loading === true &&
            <div className='d-flex justify-content-center'>
              <div className="lds-default"><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /></div>
            </div>
          }
          <div className='tile col col-md-10 ps-4'>
            <div className='row text-center'>
              <h3>No Events</h3>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className='row justify-content-center'>
        {this.state.error === true &&
          <NotFound />
        }
        {this.state.loading === true &&
          <div className='d-flex justify-content-center'>
            <div className="lds-default"><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /></div>
          </div>
        }
        {this.state.event.map(event => (
          <a key={event.eventId} href={`#edit-event?eventId=${event.eventId}`} className='tile col-12 col-md-11 col-lg-10 ps-4 mb-3 text-decoration-none tile-hover'>
            <div className='row align-items-center'>
              <div className='col-8 col-lg-9'>
                <h3 className='blue'>{event.eventName}</h3>
                <p className='black'>Location: <span className='blue'>{event.locationName}</span></p>
              </div>
              <div className='col-4 col-md-3 text-end pe-4 pe-md-0 pe-lg-4'>
                <p className='mb-1 black'>{convertTime(event.startTime)}</p>
                <p className='black'>{convertTime(event.endTime)}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    );
  }
}
