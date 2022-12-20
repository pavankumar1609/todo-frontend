import { useEffect, useState, useContext } from "react";
import { getTodos, saveTodo, deleteTodo } from "../services/todoService";
import Todo from "../components/Todo";
import Pagination from "../common/Pagination";
import TodoForm from "./TodoForm";
import { paginate } from "../utils/paginate";
import UserContext from "../contexts/userContext";
import auth from "../services/authService";
import Loading from "../common/Loading";
import { toast } from "react-toastify";
import "./TodoList.css";

function TodoList() {
  const user = useContext(UserContext);
  const pageSize = 4;
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState({});
  const [editOff, setEditOff] = useState(true);
  const [task, setTask] = useState("");
  const [prevPage, setPrevPage] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data: todos } = await getTodos(user._id);

        setTodos(todos);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.status === 400) {
          auth.logoutUser();
          window.location.href = "/";
        }
      }
    };

    getData();
  }, [user._id, setLoading]);

  const handleAdd = async (todo) => {
    try {
      setDisabled((prev) => !prev);
      const { data: newTodo } = await saveTodo(todo);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setDisabled((prev) => !prev);
      toast.success("Task added successfully!😀");
    } catch (error) {
      setDisabled((prev) => !prev);
    }
  };

  const validateTask = (task) => {
    if (task.trim() === "") return "Task is required filed";
    if (task.trim().length < 5) return "Task must be at least 5 characters";
    if (task.trim().length > 255) return "Task must be at most 7 characters";
  };

  const handleTask = (task) => {
    const error = validateTask(task);
    setError(error);
    setTask(task);
  };

  const handleUpdate = async (todo) => {
    const originalTodos = todos;

    if (todo.completed) return;
    setEditOff((prev) => !prev);
    setCurrentTodo(editOff ? todo : {});
    setTask(todo.title);

    if (!editOff) {
      if (error) return;
      if (task.trim() === todo.title) return;

      const newTodos = [...originalTodos];
      const index = newTodos.indexOf(todo);
      newTodos[index] = { ...todo };
      newTodos[index].title = task;
      setTodos(newTodos);

      try {
        await saveTodo(newTodos[index]);
      } catch (error) {
        setTodos(originalTodos);
      }
    }
  };

  const handleComplete = async (todo) => {
    const originalTodos = todos;

    if (!editOff) return;
    const newTodos = [...originalTodos];
    const index = newTodos.findIndex((td) => td._id === todo._id);
    newTodos[index] = { ...todo };
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);

    try {
      await saveTodo(newTodos[index]);
    } catch (error) {
      setTodos(originalTodos);
    }
  };

  const handleDelete = async (todo) => {
    const originalTodos = todos;

    if (!editOff) return;
    const newTodos = originalTodos.filter((td) => td._id !== todo._id);
    setTodos(newTodos);

    try {
      await deleteTodo(todo);
    } catch (error) {
      if (error.response && error.response.status === 404)
        setTodos(originalTodos);
    }
  };

  const handlePrevPage = () => {
    setPrevPage((prev) => prev - 1);
    setNextPage((next) => next - 1);
  };

  const handleNextpage = () => {
    setNextPage((next) => next + 1);
    setPrevPage((prev) => prev + 1);
  };

  const items = paginate(todos, nextPage, pageSize);

  return (
    <>
      <TodoForm onAdd={handleAdd} disabled={disabled} />
      <div className="todo-list">
        <h1 className="my-tasks">
          My <span>Tasks</span>
        </h1>
        <Pagination
          editOff={editOff}
          prevPage={prevPage}
          nextPage={nextPage}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextpage}
          itemsCount={todos.length}
          pageSize={pageSize}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        items.map((todo) => (
          <Todo
            key={todo._id}
            error={error}
            editOff={editOff}
            value={task}
            onChange={handleTask}
            todo={todo}
            currentTodo={currentTodo}
            onComplete={handleComplete}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))
      )}
    </>
  );
}

export default TodoList;
