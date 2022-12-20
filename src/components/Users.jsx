import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import TodoNavbar from "./TodoNavbar";
import Pagination from "../common/Pagination";
import { getUsersByAdmin, deleteUserByAdmin } from "../services/userService";
import { paginate } from "../utils/paginate";
import Table from "../common/Table";
import Loading from "../common/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import _ from "lodash";

function Users() {
  const pageSize = 6;
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [prevPage, setPrevPage] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const { data: users } = await getUsersByAdmin();

      setUsers(users);
      setLoading(false);
    };

    getData();
  }, [setLoading]);

  const handleDelete = async (user) => {
    const originalUsers = users;
    const newUsers = users.filter((u) => u._id !== user._id);

    setUsers(newUsers);
    try {
      await deleteUserByAdmin(user);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.warn("This user has already been deleted.");
        setUsers(originalUsers);
      }
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

  const columns = [
    {
      path: "name",
      label: "User Name",
    },
    {
      path: "email",
      label: "User Email",
      content: (user) => (
        <Link style={{ textDecoration: "none" }} to={`${user._id}`}>
          {user.email}
        </Link>
      ),
    },
    {
      key: "delete",
      content: (user) => (
        <MdDeleteOutline
          color={"red"}
          size={"1.5em"}
          className="clickable"
          onClick={() => handleDelete(user)}
        />
      ),
    },
  ];

  const sorted = _.orderBy(users, [sortColumn.path], [sortColumn.order]);

  const items = paginate(sorted, nextPage, pageSize);

  return (
    <>
      <TodoNavbar />
      {loading ? (
        <Loading />
      ) : (
        <main className="container">
          {users.length === 0 ? (
            <h1>there are no users in the database</h1>
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
                  itemsCount={users.length}
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

export default Users;
