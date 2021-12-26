import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import Nav from '../components/list/Nav';
import List from '../components/list/List';
import Pagination from '../components/list/Paginaiton';
import Skeleton from '../components/shared/Skeleton';

import { querysState, currentPageState, photosState } from '../recoil/state';

function Photos() {
  const setPhotos = useSetRecoilState(photosState);
  const [maxPage, setMaxPage] = useState(null);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [total, setTotal] = useState(null);
  const [per, setPer] = useState(null);
  const [loading, setLoading] = useState(true);
  const query = useRecoilValue(querysState);

  useEffect(() => {
    getPhotos();
  }, [currentPage, query, per]);

  useEffect(() => {
    function getPerCount() {
      window.innerWidth > 740 ? setPer(12) : setPer(24);
    }
    getPerCount();
    window.addEventListener('resize', getPerCount);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [per]);

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
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav />
      {loading ? <Skeleton /> : <List total={total} />}
      <Pagination onPageIndex={handleCurrentPageIndex} maxPage={maxPage} />
    </>
  );
}

export default Photos;
