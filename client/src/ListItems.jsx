import Item from "./Item";
import PropTypes from "prop-types";

const ListItems = ({ onCheckHandle, onDeleteHandle, items }) => {
  
  return (
    <>
    <h1>Todo List</h1>
      <ul className="list">
        {items.length === 0 && "No todos"}
        {items.map(item => {
          return (<Item key={item.id} item={item} onCheckHandle={onCheckHandle} onDeleteHandle={onDeleteHandle}/>)
        })}
      </ul>
    </>
  )
}

ListItems.propTypes = {
  onCheckHandle: PropTypes.func,
  onDeleteHandle: PropTypes.func,
  items: PropTypes.array
}

export default ListItems