import { useState, useEffect } from "react"
import "./styles.css"
import NewTodoForm from "./NewTodoForm"
import ListItems from "./ListItems"
import axios from "axios"
function App() {
  const [items, setItems] = useState([])

  const loadData = () => {
    axios
      .get("/api/tasks") // Make a GET request to the /api route
      .then((response) => {
        // let data = response.data
        setItems(response.data); // Set the message from the server to the state
        console.log(items);
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Handle error
        console.log("Failed to load message."); // Optionally set error message
      });
  }

  useEffect(() => {
    loadData();
  }, []);

  // Log the updated state when it changes
  useEffect(() => {
    console.log("Updated items:", items);
  }, [items]);


  const addItem = (tittle) => { 
    axios
      .post("/api/tasks", {tittle: tittle}) 
      .then((response) => {
        setItems(currentItems => {
          return [
            response.data, ...currentItems
          ]
        })        
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Handle error
        console.log("Failed to load message."); // Optionally set error message
      });

  }

  const onDeleteHandle = (id) => {
    axios
      .delete("/api/tasks/" + id)
      .then((response) => {
        console.log(response.data.message);
        var itemDelete = id
        setItems(
          items.filter(item => item._id !== itemDelete)
        )
        })

  }

  const onCheckHandle = (id) => {
    axios
    .put("/api/tasks/toggle/" + id) 
      .then((response) => {
        let updatedTask = response.data.updatedTask      
      const updatedItems = items.map(item => {
        if (item._id === id) {
          return {
            ...item,
            completed: updatedTask.completed
          }
        } else {
          return item
        }
      })
      setItems(updatedItems)    })
    
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