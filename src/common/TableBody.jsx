import _ from "lodash";

function TableBody({ columns, items }) {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  const genKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  return (
    <tbody>
      {items.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={genKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
