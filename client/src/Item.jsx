import PropTypes from "prop-types"

const Item = ({ onCheckHandle, onDeleteHandle, item }) => {
  return (
    <>
      <li>
        <label>
            <input type="checkbox" id={item.id} onChange={() => onCheckHandle(item.id)} checked={item.completed} />
          {item.title}
        </label>
        <button className="btn btn-edit"><i className="fas fa-ellipsis-v"></i></button>
          <button className="btn btn-danger" onClick={() => onDeleteHandle(item.id)}>Delete</button>
      </li>
    </>
  )
}

Item.propTypes = { 
  item: PropTypes.object,
  onCheckHandle: PropTypes.func.isRequired,
  onDeleteHandle: PropTypes.func.isRequired,
  }
export default Item