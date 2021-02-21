import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import ModalForm from './ModalForm';
import Modal from "react-bootstrap/modal";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Scheduler = () => {
  const [events, setEvents] = useState([]);
  const [showAddModal, setShowAddModal] = React.useState(false);
  
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

  const handleSelect = (event, e) => {
    // const { start, end } = event;
    // const data = { title: "", start, end, allDay: false };
    setShowAddModal(true);
  };


  // const event = events.map( slot => {
  //   return  {
  //     'title': 'Book A call',
  //     'allDay': false,
  //     'start': slot.date_time,
  //     'end': '',
  //   }
  // })

  // console.log(event);

  return (
    <div>
      <Modal 
        show={showAddModal} 
        onHide={hideModals}>
        <Modal.Header closeButton>
          <Modal.Title>Add Calendar Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalForm />
        </Modal.Body>
      </Modal>  
      <Calendar
        events={[
          {
            'title': 'My event',
            'allDay': false,
            'start': new Date(2020, 10, 24, 10, 0), // 10.00 AM
            'end': new Date(2020, 10, 24, 14, 0), // 2.00 PM 
          }
        ]}
        // events ={event}
        step={60}
        view='week'
        views={['week']}
        localizer={localizer}
        style={{ height: '70vh' }}
        selectable={true}
        startAccessor='start'
        endAccessor='end'
        onSelectSlot={handleSelect}
        date={new Date(2020, 10, 24)}
      />
    </div>
  )
}

export default Scheduler;
