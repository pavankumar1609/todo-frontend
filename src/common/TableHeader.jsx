import { FaSortDown, FaSortUp } from "react-icons/fa";

function TableHeader({ columns, sortColumn, onSort }) {
  const raiseSort = (path) => {
    const newSortColumn = { ...sortColumn };

    if (path === sortColumn.path) {
      newSortColumn.order = newSortColumn.order === "asc" ? "desc" : "asc";
    } else {
      newSortColumn.path = path;
      newSortColumn.order = "asc";
    }

    onSort(newSortColumn);
  };

  const renderArrows = (path, sortColumn) => {
    if (path !== sortColumn.path || path === undefined) return null;

    if (sortColumn.order === "asc") return <FaSortUp />;

    return <FaSortDown />;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderArrows(column.path, sortColumn)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
