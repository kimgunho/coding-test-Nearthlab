import Pagination from './Paginaiton';

import { useState, useEffect } from 'react';

function List() {
  const [photos, setPhotos] = useState([]);
  //   const [currentPage, setCurrentPage] = useState(1);
  const currentPage = 1;
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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

      <Pagination />
    </>
  );
}

export default List;
