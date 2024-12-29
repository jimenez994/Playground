const Item = ({onCheckHandle, onDeleteHandle, item}) => {
  return (
    <>
      <li>
        <label>
            <input type="checkbox" id={item.id} onChange={() => onCheckHandle(item.id)} checked={item.completed} />
          {item.title}
        </label>
          <button className="btn btn-danger" onClick={() => onDeleteHandle(item.id)}>Delete</button>
      </li>
    </>
  )
}
export default Item