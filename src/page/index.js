import { useState, useEffect } from 'react';

import Nav from '../components/list/Nav';
import List from '../components/list/List';
import Pagination from '../components/list/Paginaiton';

function Photos() {
  const [photos, setPhotos] = useState([]);
  const [maxPage, setMaxPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(null);
  const per = 12;

  useEffect(() => {
    getPhotos();
  }, [currentPage]);

  const handleCurrentPageIndex = (num) => {
    setCurrentPage(num);
  };

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

  return (
    <>
      <Nav />
      <List total={total} photos={photos} />
      <Pagination
        currentPage={currentPage}
        onPageIndex={handleCurrentPageIndex}
        maxPage={maxPage}
      />
    </>
  );
}

export default Photos;
