import React, { useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";

const buttonStyle = { marginRight: 10, marginTop: 10 };

const ModalForm = () => {
  const [start, setStart] = React.useState(null);
  const [end, setEnd] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [reason, setReason] = React.useState("");
  //const [id, setId] = React.useState(null);

  const handleStartChange = date => setStart(date);
  const handleEndChange = date => setEnd(date);
  const handleTitleChange = ev => setTitle(ev.target.value);
  const handleReasonChange = ev => setReason(ev.target.value);

  const handleSubmit = () => {

  }

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Title"
            value={title || ""}
            onChange={handleTitleChange}
            isInvalid={!title}
          />
          <Form.Control.Feedback type="invalid">{!title}</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
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
        Save
      </Button>
    </Form>
  )
}

export default ModalForm;
