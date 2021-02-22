import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Modal } from "react-bootstrap";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";

const buttonStyle = { marginRight: 10, marginTop: 10 };

const localizer = momentLocalizer(moment);

const Scheduler = () => {
  const [events, setEvents] = useState([]);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [start, setStart] = React.useState(null);
  const [end, setEnd] = React.useState(null);
  const [reason, setReason] = React.useState("");

  const handleStartChange = date => setStart(date);
  const handleEndChange = date => setEnd(date);
  const handleReasonChange = ev => setReason(ev.target.value);
  
  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch('https://private-37dacc-cfcalendar.apiary-mock.com/mentors/1/agenda');
      res
        .json()
        .then(res => setEvents(res.calendar))
        .catch(err => console.log(err));
    }
    fetchEvents();
  }, []);

  const hideModals = () => {
    setShowAddModal(false);
  };

  const event = events.map((slot, index) => {
    return  {
      'allDay': false,
      'start': moment.utc(slot.date_time).toDate(),
      'end': moment.utc(slot.date_time).add(60, 'minutes').toDate(),
      'reason': ''
    }
  })

  const handleSelect = (event) => {
    setShowAddModal(true);
    let { start, end, reason } = event;
    start = new Date(start);
    end = new Date(end);
    const data = { start, end, reason };
    setStart(data.start);
    setEnd(data.end);
    setReason(data.reason);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { start, end, reason };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    const response = await fetch('https://book-mentor.herokuapp.com/event', requestOptions);
    const result = await response.json();
    console.log(result);
    hideModals();
    alert(`Time-${result.start},
        Reason-${ result.reason}`)
  }

  const minTime = new Date();
  minTime.setHours(6,0,0);
  const maxTime = new Date();
  maxTime.setHours(22,0,0);

  return (
    <div>
      <h2 className='text-center text-primary pb-3 pt-2'> Book A Mentor </h2>
      <Modal 
        show={showAddModal} 
        onHide={hideModals}>
        <Modal.Header closeButton>
          <Modal.Title>Book A Call</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="start">
                <Form.Label>Start</Form.Label>
                <br />
                <DatePicker
                  showTimeSelect
                  className="form-control"
                  selected={start}
                  onChange={handleStartChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="end">
                <Form.Label>End</Form.Label>
                <br />
                <DatePicker
                  showTimeSelect
                  className="form-control"
                  selected={end}
                  onChange={handleEndChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="reason">
                <Form.Label>Reason</Form.Label>
                <Form.Control
                  type="text"
                  name="reason"
                  placeholder="Reason"
                  value={reason || ""}
                  onChange={handleReasonChange}
                  isInvalid={!reason}
                />
                <Form.Control.Feedback type="invalid">{!reason}</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Button type="submit" style={buttonStyle}>
              Confirm Call
            </Button>
          </Form>
        </Modal.Body>
      </Modal>  
      <Calendar
        events ={event}
        formats={{ dateFormat: 'yyyy, mm, dd' }}
        step={60}
        localizer={localizer}
        style={{ height: '100vh' }}
        min = {minTime}
        max = {maxTime}
        views={['week']}
        defaultView='week'
        selectable={true}
        startAccessor='start'
        endAccessor='end'
        onSelectEvent={handleSelect}
      />
    </div>
  )
}

export default Scheduler;
