import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

function App() {
  const [name, setName] = useState("awdadwawdaw")
  const [message, setMessage] = useState("")
  const tasks = useQuery(api.tasks.get);
  const addEntry = useMutation(api.myFunctions.createTask);

  const submitHandler = async (e) => {
    e.preventDefault();

    await addEntry({ name, message })
  
  };

  return (
    <>
      <section>
        <h1>Guest Book</h1>
        <p>Leave a comment or just say hello!</p>
        
        <form onSubmit={submitHandler}>
          <p><b>Name</b></p>
          <input type="text"
            placeholder="Enter your name"
            value={name}
            onChange={e => {
              setName(e.target.value)
            }}
            required />
          <p><b>Message</b></p>
          <textarea
            placeholder="Enter your message"
            value={message}
            onChange={e => {
              setMessage(e.target.value)
            }}
            required />
            <br/>
            <button type="submit">Submit</button>
        </form>
        <div>
          {tasks && tasks.map(task => {
            return (
              <div id={task._id}>
                {task.name}
                <br />
                {task.message}
                <br />
                <br />

              </div>

            )
          })}
        </div>

      </section>
    </>
  )
}

export default App
