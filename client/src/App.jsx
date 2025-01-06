import { useState } from "react"
import "./styles.css"
import NewTodoForm from "./NewTodoForm"
import ListItems from "./ListItems"
import axios from "axios"
function App() {
  const [items, setItems] = useState([])

  const addItem = (tittle) => { 
    axios
      .get("/api") // Make a GET request to the /api route
      .then((response) => {
        console.log(response.data.message); // Set the message from the server to the state
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Handle error
        console.log("Failed to load message."); // Optionally set error message
      });
    setItems(currentItems => {
      return [
        ...currentItems, {
          id: crypto.randomUUID(),
          title: tittle,
          completed: false
        }
      ]
    })
  }

  const onDeleteHandle = (id) => {
    var itemDelete = id
    setItems(
      items.filter(item => item.id !== itemDelete)
    )
  }

  const onCheckHandle = (id) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed
        }
      } else {
        return item
      }
    })
    setItems(updatedItems)
  }
  

  return (
    <>
      <h1>Todo List</h1>
      <NewTodoForm onSubmit={addItem} />
      <ListItems items={items} onCheckHandle={ onCheckHandle } onDeleteHandle={ onDeleteHandle }/>
    </>
  )
}

export default App