import { getTodos, deleteTodo } from "../services/todoService";
import { MdDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../common/Table";
import TodoNavbar from "./TodoNavbar";
import { toast } from "react-toastify";
import Pagination from "../common/Pagination";
import Loading from "../common/Loading";
import { paginate } from "../utils/paginate";
import _ from "lodash";

function UserTodos() {
  const pageSize = 6;
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [prevPage, setPrevPage] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [userTodos, setUserTodos] = useState([]);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await getTodos(id);

        setUserTodos(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    getData();
  }, [id, setLoading]);

  const handleSort = (newSortColumn) => {
    setSortColumn(newSortColumn);
  };

  const handlePrevPage = () => {
    setPrevPage((prev) => prev - 1);
    setNextPage((next) => next - 1);
  };

  const handleNextpage = () => {
    setNextPage((next) => next + 1);
    setPrevPage((prev) => prev + 1);
  };

  const handleDelete = async (todo) => {
    const originalTodos = userTodos;
    const newTodos = originalTodos.filter((td) => td._id !== todo._id);

    setUserTodos(newTodos);

    try {
      await deleteTodo(todo);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.warn("This todo has already been deleted.");
      setUserTodos(originalTodos);
    }
  };

  const columns = [
    { path: "title", label: "User Tasks" },
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

  const sorted = _.orderBy(userTodos, [sortColumn.path], [sortColumn.order]);

  const items = paginate(sorted, nextPage, pageSize);

  return (
    <>
      <TodoNavbar />
      {loading ? (
        <Loading />
      ) : (
        <main className="container">
          {userTodos.length === 0 ? (
            <h1>User doesn't have todos</h1>
          ) : (
            <>
              <Table
                items={items}
                columns={columns}
                onSort={handleSort}
                sortColumn={sortColumn}
              />
              <div className="custom-paginate">
                <Pagination
                  prevPage={prevPage}
                  nextPage={nextPage}
                  onPrevPage={handlePrevPage}
                  onNextPage={handleNextpage}
                  itemsCount={userTodos.length}
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

export default UserTodos;
