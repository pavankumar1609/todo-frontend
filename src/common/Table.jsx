import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import "./Table.css";

function Table({ items, columns, sortColumn, onSort }) {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} items={items} />
    </table>
  );
}

export default Table;
