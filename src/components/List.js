import { useState, useEffect } from 'react';

import Pagination from './Paginaiton';

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
    <>
      <p>total : {total}</p>
      <ul>
        {photos?.map((item) => (
          <li key={item.id}>
            <div style={{ backgroundImage: `url(${item.photoUrl})` }}>
              <p>미완료</p>
              <div>
                <h3>파일 이름</h3>
                <p>라벨 8개</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Pagination onPageIndex={handleCurrentPageIndex} maxPage={maxPage} />
    </>
  );
}

export default List;
