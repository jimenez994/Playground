import { useState } from "react"
import "./styles.css"
import NewTodoForm from "./NewTodoForm"
import ListItems from "./ListItems"
function App() {
  const [items, setItems] = useState([])

  const addItem = (tittle) => {    
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
      <NewTodoForm onSubmit={addItem} />
      <ListItems items={items} onCheckHandle={ onCheckHandle } onDeleteHandle={ onDeleteHandle }/>
    </>
  )
}

export default App