import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useRecoilValue } from 'recoil';

import styles from './Pagination.module.scss';
import { currentPageState } from '../../recoil/state';

const cx = classNames.bind(styles);

function Pagination({ onPageIndex, maxPage }) {
  const [pageRange, setPageRange] = useState([]);
  const [pageActiveIndex, setPageActiveIndex] = useState(1);
  const currentPage = useRecoilValue(currentPageState);
  const firstPagination = '〈';
  const lastPagination = '〉';

  // 페이지의 범위 hook
  useEffect(() => {
    if (currentPage === 1) {
      setPageActiveIndex(1);
    }
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
    const limiter = String(pageActiveIndex).length + 1;
    if (innerText.length >= limiter) {
      return;
    }
    if (innerText === firstPagination) {
      onPageIndex(1);
    } else if (innerText === lastPagination) {
      onPageIndex(maxPage);
    } else {
      onPageIndex(Number(innerText));
    }
  };

  return (
    <ul className={cx('pagination')} onClick={handleCurrentPageIndex}>
      <li onClick={() => setPageActiveIndex(1)}>{firstPagination}</li>
      {pageRange.map((_, index) => (
        <li
          onClick={() => setPageActiveIndex(_)}
          className={cx({ active: _ === pageActiveIndex })}
          key={index}
        >
          {_}
        </li>
      ))}
      <li onClick={() => setPageActiveIndex(maxPage)}>{lastPagination}</li>
    </ul>
  );
}

export default Pagination;
