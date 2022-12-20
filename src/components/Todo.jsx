import {
  IoMdCheckmarkCircleOutline,
  IoMdCheckmarkCircle,
} from "react-icons/io";
import { TbEdit, TbEditOff } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import "./Todo.css";

function Todo({
  error,
  editOff,
  value,
  onChange,
  todo,
  currentTodo,
  onComplete,
  onUpdate,
  onDelete,
}) {
  const styles = {
    fontSize: "18px",
    wordWrap: "wrap-word",
    textAlign: "justify",
  };

  return (
    <>
      <ul className="todo-items">
        <li className={todo.completed ? "completed" : ""}>
          {todo._id === currentTodo._id ? (
            <input
              autoFocus={true}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={"Update your todo."}
              className="task-input"
            />
          ) : (
            <p style={styles}>{todo.title}</p>
          )}
        </li>
        <li>
          {todo.completed ? (
            <IoMdCheckmarkCircle
              color={"green"}
              size={"1.5em"}
              className="clickable"
              onClick={() => onComplete(todo)}
            />
          ) : (
            <IoMdCheckmarkCircleOutline
              color={"green"}
              size={"1.5em"}
              className="clickable"
              onClick={() => onComplete(todo)}
            />
          )}
        </li>
        <li>
          {todo._id === currentTodo._id ? (
            <TbEditOff
              color={"blue"}
              size={"1.5em"}
              className="clickable"
              onClick={() => !error && onUpdate(todo)}
            />
          ) : (
            <TbEdit
              color={"blue"}
              size={"1.5em"}
              className="clickable"
              onClick={() => !error && editOff && onUpdate(todo)}
            />
          )}
        </li>
        <li>
          <MdDeleteOutline
            color={"red"}
            size={"1.5em"}
            onClick={() => onDelete(todo)}
            className="clickable"
          />
        </li>
      </ul>
      {todo._id === currentTodo._id && error && (
        <p className="alert">{error}</p>
      )}
    </>
  );
}

export default Todo;
