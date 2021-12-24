import { useRef } from 'react';

function Pagination({ onPageIndex, maxPage }) {
  const pageParent = useRef();
  const handleCurrentPageIndex = (event) => {
    const {
      target: { innerText },
    } = event;
    console.log(innerText);
    if (innerText !== undefined) {
      if (innerText === 'first') {
        onPageIndex(1);
      } else if (innerText === 'last') {
        onPageIndex(Number(maxPage));
      } else {
        onPageIndex(Number(innerText));
      }
    }
  };

  return (
    <ul ref={pageParent} onClick={handleCurrentPageIndex}>
      <li>first</li>
      {Array.from({ length: maxPage }, (_, index) => (
        <li key={index}>{index + 1}</li>
      ))}
      <li>last</li>
    </ul>
  );
}

export default Pagination;
