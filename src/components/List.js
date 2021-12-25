import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './List.module.scss';

import Pagination from './Paginaiton';

const cx = classNames.bind(styles);

function List() {
  const [photos, setPhotos] = useState([]);
  const [maxPage, setMaxPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(null);
  const per = 12;

  useEffect(() => {
    getPhotos();
  }, [currentPage]);

  const getPhotos = async () => {
    try {
      const url = `https://tester-api.nearthlab.com/v1/photos?page=${currentPage}&per=${per}`;
      const response = await fetch(url);
      const data = await response.json();
      setPhotos(data.photos);
      setTotal(data.meta.total);
      setMaxPage(data.meta.maxPage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCurrentPageIndex = (num) => {
    setCurrentPage(num);
  };

  return (
    <div className={cx('container')}>
      <p className={cx('total')}>전체 {total}개</p>
      <ul className={cx('photos')}>
        {photos?.map((item) => (
          <li key={item.id}>
            <div
              className={cx('photo')}
              style={{ backgroundImage: `url(${item.photoUrl})` }}
            >
              <p className={cx('result')}>미완료</p>
            </div>
            <div className={cx('info')}>
              <h3 className={cx('title')}>파일 이름</h3>
              <p className={cx('label')}>라벨 8개</p>
            </div>
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        onPageIndex={handleCurrentPageIndex}
        maxPage={maxPage}
      />
    </div>
  );
}

export default List;
