import { useState } from "react"

const NewTodoForm = (props) => {
  const [newItem, setItem] = useState("")
  
  const onSubmitHandler = (e) => {
    e.preventDefault()    
    if (newItem === "") return
    props.onSubmit(newItem)             
    setItem("")
  }
  
  return (
    <>
    <form className="new-item-form" onSubmit={onSubmitHandler}>
        <div className="form-row">
          <label htmlFor="item">Form</label>
          <input type="text" value={newItem} onChange={e => setItem(e.target.value)} id="item"/>
        </div>
        <button className="btn" >Add</button>
      </form>
    </>
  )

}
export default NewTodoForm