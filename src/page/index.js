import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import Nav from '../components/list/Nav';
import List from '../components/list/List';
import Pagination from '../components/list/Paginaiton';
import Loading from '../components/shared/Loading';

import { querysState, currentPageState, photosState } from '../recoil/state';

function Photos() {
  const [maxPage, setMaxPage] = useState(null);
  const [total, setTotal] = useState(null);
  const [per, setPer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const setPhotos = useSetRecoilState(photosState);
  const query = useRecoilValue(querysState);

  // api호출 [현재 페이지, 쿼리, per카운트가 변동시 재호출]
  useEffect(() => {
    getPhotos();
  }, [currentPage, query, per]);

  // fix : per카운트가 변경시 현재 페이지 초기페이지로 전환
  useEffect(() => {
    setCurrentPage(1);
  }, [per]);

  // 데스크탑과 모바일에서의 per카운트 구분
  useEffect(() => {
    function getPerCount() {
      const mobileResize = 740;
      window.innerWidth > mobileResize ? setPer(12) : setPer(24);
    }
    getPerCount();
    window.addEventListener('resize', getPerCount);
  }, []);

  const handleGetCurrentPage = (num) => {
    setCurrentPage(num);
  };

  const getPhotos = async () => {
    try {
      if (per === null) {
        return;
      }
      const url = `https://tester-api.nearthlab.com/v1/photos?page=${currentPage}&per=${per}${query}`;
      const response = await fetch(url);
      const json = await response.json();
      const {
        photos,
        meta: { total, maxPage },
      } = json;
      setPhotos(photos);
      setTotal(total);
      setMaxPage(maxPage);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Nav />
          <List total={total} />
          <Pagination onPageIndex={handleGetCurrentPage} maxPage={maxPage} />
        </>
      )}
    </>
  );
}

export default Photos;
