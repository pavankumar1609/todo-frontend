import { getAllTodos, deleteTodo } from "../services/todoService";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import TodoNavbar from "./TodoNavbar";
import Pagination from "../common/Pagination";
import { paginate } from "../utils/paginate";
import Table from "../common/Table";
import Loading from "../common/Loading";
import { toast } from "react-toastify";
import _ from "lodash";

function Admin() {
  const pageSize = 6;
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [prevPage, setPrevPage] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const { data: todos } = await getAllTodos();

      setTodos(todos);
      setLoading(false);
    };

    getData();
  }, [setLoading]);

  const handleDelete = async (todo) => {
    const originalTodos = todos;
    const newTodos = originalTodos.filter((td) => td._id !== todo._id);

    setTodos(newTodos);

    try {
      await deleteTodo(todo);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.warn("This todo has already been deleted.");
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

  const handleSort = (newSortColumn) => {
    setSortColumn(newSortColumn);
  };

  const sorted = _.orderBy(todos, [sortColumn.path], [sortColumn.order]);

  const items = paginate(sorted, nextPage, pageSize);

  const columns = [
    { path: "title", label: "User Task" },
    {
      key: "delete",
      content: (todo) => (
        <MdDeleteOutline
          color={"red"}
          size={"1.5em"}
          className="clickable"
          onClick={() => handleDelete(todo)}
        />
      ),
    },
  ];

  return (
    <>
      <TodoNavbar />
      {loading ? (
        <Loading />
      ) : (
        <main className="container">
          {todos.length === 0 ? (
            <h1>There are no todos in the database</h1>
          ) : (
            <>
              <Table
                columns={columns}
                sortColumn={sortColumn}
                onSort={handleSort}
                items={items}
              />
              <div className="custom-paginate">
                <Pagination
                  prevPage={prevPage}
                  nextPage={nextPage}
                  onPrevPage={handlePrevPage}
                  onNextPage={handleNextpage}
                  itemsCount={todos.length}
                  pageSize={pageSize}
                />
              </div>
            </>
          )}
        </main>
      )}
    </>
  );
}

export default Admin;
