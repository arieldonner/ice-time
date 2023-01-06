import React from 'react';
import Navbar from '../components/navbar';
import NotFound from '../components/not-found';
import EventTile from '../components/event-tile';

export default class Upcoming extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: new Date(), events: [], upcoming: [], dates: [], loading: true, error: false };
  }

  componentDidMount() {
    fetch('/api/events', {
      headers: {
        'x-access-token': localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(res => {
        const upcomingArr = [];
        const dates = [];
        for (let i = 0; i < res.length; i++) {
          const oneDay = new Date(res[i].startDate.slice(0, 10));
          const converted = oneDay.toISOString();
          if (converted > this.state.value.toISOString()) {
            upcomingArr.push(res[i]);
            dates.push(res[i].startDate);
          }
        }
        const unique = dates.filter((v, i, a) => a.indexOf(v) === i);
        this.setState({ events: res, upcoming: upcomingArr, dates: unique, loading: false, error: false });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <h1 className="heading cookie">Upcoming</h1>
          <div className='d-flex align-items-center justify-content-center mb-2'>
            <a href='#'><i className="fa-solid fa-calendar-days" /></a>
            <a href='#create-event' className='btn btn-primary col-3 col-md-2 col-lg-1 offset-7 offset-md-5 offset-lg-3'>New+</a>
          </div>
          {this.state.error === true &&
            <NotFound />
          }
          {this.state.loading === true &&
            <div className='d-flex justify-content-center'>
              <div className="lds-default"><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /></div>
            </div>
          }
          <div className='container d-flex flex-column align-items-center justify-content-center'>
            <div className='row'>
              <div className='col-12'>
                {this.state.dates.map((event, index) => (
                  <div key={index} className='col-12'>
                    <h1 className='date mb-3'>{event.slice(0, 10)}</h1>
                    <EventTile value={new Date(event)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
