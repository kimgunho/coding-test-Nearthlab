import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSetRecoilState, useRecoilState } from 'recoil';

import styles from './Nav.module.scss';
import {
  labelsInfoState,
  labelsState,
  currentPageState,
  querysState,
} from '../../recoil/state';

const cx = classNames.bind(styles);

function Nav() {
  const [labelsTitle, setLabelsTitle] = useRecoilState(labelsInfoState);
  const [typeIds, setTypeIds] = useRecoilState(labelsState);
  const setQuerys = useSetRecoilState(querysState);
  const setCurrentPage = useSetRecoilState(currentPageState);

  // 라벨 데이터 호출 후 recoil 상태 저장
  useEffect(async () => {
    const url = 'https://tester-api.nearthlab.com/v1/labelTypes';
    const response = await fetch(url);
    const json = await response.json();
    setLabelsTitle(json);
  }, []);

  // 타입 선택별 쿼리문 호출
  useEffect(() => {
    const { typeId1, typeId2, typeId3, typeId4 } = typeIds;
    getQuerys(typeId1, typeId2, typeId3, typeId4);
    setCurrentPage(1);
  }, [typeIds]);

  const getQuerys = (...args) => {
    let query = '';
    for (let arg of args) {
      arg !== null ? (query += `&labelTypeIds[]=${arg}`) : (query += '');
    }
    setQuerys(query);
  };

  const onChange = (event) => {
    const {
      target: { value, checked, name },
    } = event;
    if (checked) {
      setTypeIds((prev) => {
        return {
          ...prev,
          [name]: Number(value),
        };
      });
    } else {
      setTypeIds((prev) => {
        return {
          ...prev,
          [name]: null,
        };
      });
    }
  };

  return (
    <div className={cx('container')}>
      <h2 className={cx('title')}>라벨 종류 선택</h2>
      <ul className={cx('labels')}>
        {labelsTitle?.map((label) => (
          <li key={label.id}>
            <input
              name={`typeId${label.id}`}
              value={label.id}
              onChange={onChange}
              id={`label${label.id}`}
              type="checkbox"
            />
            <label htmlFor={`label${label.id}`}>{label.title}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Nav;
