import './App.css';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

function App() {

  const [text, setText] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  function sendMessage(e) {

    if (text !== "") {

      e.preventDefault();

      setMessages((prev) => {
        return [{ sender: "user", text: text }, ...prev];
      });

      axios.post(`https://hamzailyasweatherserver.herokuapp.com/talktochatbot`, {
        text: text
      })
        .then((response) => {
          console.log("response", response.data.text);

          setMessages((prev) => {
            return [{ sender: "bot", text: response.data.text }, ...prev];
          });
          e.target.reset();
          setText("");

        }).catch(error => {
          console.log("error: ", error);

          setMessages((prev) => {
            return [{ sender: "bot", text: "Dummy Response From Chatbot" }, ...prev,];
          });
          e.target.reset();
          setText("");

        })
    } else {
      alert("Please Enter a Message");
      return;
    }
  }

  return (
    <div>
      <div className="container-fluid">

        <h1 className='text-center p-4'> React Chat-App </h1>

        <Form onSubmit={sendMessage}>
          <Form.Group
            style={{
              display: "flex",
              justifyContent: "space-between"
            }} className="mb-3 mt-3" controlId="formBasicEmail">

            <Form.Control
              onChange={(e) => { setText(e.target.value) }}
              type="text"
              placeholder="Enter Your Message"
              className="shadow-none border-dark rounded rounded-0"
            />
            <Button variant="dark" type="submit" className="rounded rounded-0 shadow-none">
              Submit
            </Button>
          </Form.Group>
        </Form>

        <br />
        <br />
        <br />

        <div style={{ display: "flex", flexDirection: "column" }}>

          {messages?.map((eachMessage, index) => (
            <div key={`${index}-message`} style={{
              display: "flex",
              justifyContent: (eachMessage.sender === "user") ? "flex-end" : "flex-start",
              alignItems: "center",
            }}>
              <p className='border p-2 rounded rounded-3 fw-bold' style={{
                backgroundColor: (eachMessage.sender === "user") ? "#2975e6" : "#4c5159",
                color: 'white',
              }}>{ eachMessage.text } </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default App;