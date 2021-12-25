import { useState, useRef, useEffect } from 'react';

function Pagination({ onPageIndex, maxPage, currentPage }) {
  const [pageRange, setPageRange] = useState([]);
  const pageParent = useRef();
  const firstPageRange = 'first';
  const lastPageRange = 'last';

  useEffect(() => {
    getPaginaitonRange();
  }, [currentPage]);

  const getPaginaitonRange = () => {
    if (currentPage === 1) {
      setPageRange([currentPage, currentPage + 1, currentPage + 2]);
    } else if (currentPage === maxPage) {
      setPageRange([currentPage - 2, currentPage - 1, currentPage]);
    } else {
      setPageRange([currentPage - 1, currentPage, currentPage + 1]);
    }
  };

  const handleCurrentPageIndex = (event) => {
    const {
      target: { innerText },
    } = event;
    if (innerText !== undefined) {
      if (innerText === firstPageRange) {
        onPageIndex(1);
      } else if (innerText === lastPageRange) {
        onPageIndex(Number(maxPage));
      } else {
        onPageIndex(Number(innerText));
      }
    }
  };

  return (
    <ul ref={pageParent} onClick={handleCurrentPageIndex}>
      <li>{firstPageRange}</li>
      {pageRange.map((_, index) => {
        if (_ === 0) {
          return;
        } else if (_ === maxPage + 1) {
          return;
        }
        return <li key={index}>{_}</li>;
      })}
      <li>{lastPageRange}</li>
    </ul>
  );
}

export default Pagination;
