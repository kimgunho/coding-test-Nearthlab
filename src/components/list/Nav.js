import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Nav.module.scss';

const cx = classNames.bind(styles);

function Nav() {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    getLabels();
  }, []);

  const getLabels = async () => {
    const url = 'https://tester-api.nearthlab.com/v1/labelTypes';
    const response = await fetch(url);
    const results = await response.json();
    setLabels(results);
  };
  return (
    <div className={cx('container')}>
      <h2 className={cx('title')}>라벨 종류 선택</h2>
      <form>
        <ul className={cx('labels')}>
          {labels?.map((label) => (
            <li key={label.id}>
              <input id={`label${label.id}`} type="checkbox" />
              <label htmlFor={`label${label.id}`}>{label.title}</label>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default Nav;
