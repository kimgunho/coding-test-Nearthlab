import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSetRecoilState, useRecoilState } from 'recoil';

import styles from './Nav.module.scss';
import { labelsState, querysState } from '../../recoil/state';

const cx = classNames.bind(styles);

function Nav() {
  const [labels, setLabels] = useState([]);
  const [typesId, setTypesId] = useRecoilState(labelsState);
  const setQuerys = useSetRecoilState(querysState);

  useEffect(() => {
    getLabels();
  }, []);

  useEffect(() => {
    const { typeId1, typeId2, typeId3, typeId4 } = typesId;
    getQuerys(typeId1, typeId2, typeId3, typeId4);
  }, [typesId]);

  const getQuerys = (...args) => {
    let query = '';
    for (let arg of args) {
      arg !== null ? (query += `&labelTypeIds[]=${arg}`) : (query += '');
    }
    setQuerys(query);
  };

  const getLabels = async () => {
    const url = 'https://tester-api.nearthlab.com/v1/labelTypes';
    const response = await fetch(url);
    const results = await response.json();
    setLabels(results);
  };

  const onChange = (event) => {
    const {
      target: { value, checked, name },
    } = event;
    if (checked) {
      setTypesId((prev) => {
        return {
          ...prev,
          [name]: Number(value),
        };
      });
    } else {
      setTypesId((prev) => {
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
        {labels?.map((label) => (
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
