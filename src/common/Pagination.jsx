import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import "./Pagination.css";

function Pagination({
  editOff = true,
  prevPage,
  nextPage,
  onPrevPage,
  onNextPage,
  itemsCount,
  pageSize,
  ...rest
}) {
  const pagesCount = Math.ceil(itemsCount / pageSize);

  return (
    <ul className="pagination">
      <li>
        <MdNavigateBefore
          onClick={onPrevPage}
          className={prevPage === 0 || !editOff ? "disable" : "clickable"}
          size={"2em"}
          {...rest}
        />
      </li>
      <li>
        <MdNavigateNext
          onClick={onNextPage}
          className={
            nextPage >= pagesCount || !editOff ? "disable" : "clickable"
          }
          size={"2em"}
          {...rest}
        />
      </li>
    </ul>
  );
}

export default Pagination;
