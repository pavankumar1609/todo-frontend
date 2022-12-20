import TodoNavbar from "./TodoNavbar";
import TodoList from "./TodoList";

function Todos() {
  return (
    <>
      <TodoNavbar />
      <main className="container">
        <TodoList />
      </main>
    </>
  );
}

export default Todos;
