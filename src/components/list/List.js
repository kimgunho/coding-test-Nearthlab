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
        {photos?.map((item) => {
          const splitCut = item.photoUrl.split('/');
          const title = splitCut[splitCut.length - 1].split('.');
          return (
            <li key={item.id}>
              <div
                className={cx('photo')}
                style={{ backgroundImage: `url(${item.photoUrl})` }}
              >
                <p
                  className={cx([
                    'result',
                    { sucess: item.labels.length === 0 },
                  ])}
                >
                  {item.labels.length === 0 ? '완료' : '미완료'}
                </p>
              </div>
              <div className={cx('info')}>
                <h3 className={cx('title')}>파일 이름 : {title[0]}</h3>
                <p
                  className={cx([
                    'label',
                    { hidden: item.labels.length === 0 },
                  ])}
                >
                  라벨 {item.labels.length}개
                </p>
              </div>
            </li>
          );
        })}
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
