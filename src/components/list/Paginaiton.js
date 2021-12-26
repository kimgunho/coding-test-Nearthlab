import classNames from 'classnames/bind';
import { useRecoilValue } from 'recoil';
import { useState, useRef, useEffect } from 'react';

import styles from './Pagination.module.scss';

import { currentPageState } from '../../recoil/state';

const cx = classNames.bind(styles);

function Pagination({ onPageIndex, maxPage }) {
  const [pageRange, setPageRange] = useState([]);
  const [activeIndex, setActiveIndex] = useState(1);
  const currentPage = useRecoilValue(currentPageState);
  const pageParent = useRef();
  const firstPageRange = '<';
  const lastPageRange = '>';

  useEffect(() => {
    if (currentPage === 1) {
      setActiveIndex(1);
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
    if (innerText.length >= 4) {
      return;
    }
    if (innerText === firstPageRange) {
      onPageIndex(1);
    } else if (innerText === lastPageRange) {
      onPageIndex(Number(maxPage));
    } else {
      onPageIndex(Number(innerText));
    }
  };

  return (
    <ul
      className={cx('pagination')}
      ref={pageParent}
      onClick={handleCurrentPageIndex}
    >
      <li onClick={() => setActiveIndex(1)}>{firstPageRange}</li>
      {pageRange.map((_, index) => {
        if (_ === 0) {
          return;
        } else if (_ === maxPage + 1) {
          return;
        }
        return (
          <li
            onClick={() => setActiveIndex(_)}
            className={cx({ active: _ === activeIndex })}
            key={index}
          >
            {_}
          </li>
        );
      })}
      <li onClick={() => setActiveIndex(maxPage)}>{lastPageRange}</li>
    </ul>
  );
}

export default Pagination;
