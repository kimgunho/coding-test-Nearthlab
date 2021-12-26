import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { useState, useEffect } from 'react';

import Nav from '../components/list/Nav';
import List from '../components/list/List';
import Pagination from '../components/list/Paginaiton';

import { querysState, currentPageState, photosState } from '../recoil/state';

function Photos() {
  const setPhotos = useSetRecoilState(photosState);
  const [maxPage, setMaxPage] = useState(null);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [total, setTotal] = useState(null);
  const per = 12;
  const query = useRecoilValue(querysState);

  useEffect(() => {
    getPhotos();
  }, [currentPage, query]);

  const handleCurrentPageIndex = (num) => {
    setCurrentPage(num);
  };

  const getPhotos = async () => {
    try {
      const url = `https://tester-api.nearthlab.com/v1/photos?page=${currentPage}&per=${per}${query}`;
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
      <List total={total} />
      <Pagination onPageIndex={handleCurrentPageIndex} maxPage={maxPage} />
    </>
  );
}

export default Photos;
