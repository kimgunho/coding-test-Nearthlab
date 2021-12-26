import classNames from 'classnames/bind';

import styles from './Skeleton.module.scss';

const cx = classNames.bind(styles);

function Skeleton() {
  return (
    <div className={cx('container')}>
      <p className={cx('total')}>전체 00개</p>
      <ul className={cx('photos')}>
        {Array.from({ length: 12 }).map((_, index) => {
          return (
            <li key={index}>
              <div className={cx('photo')}></div>
              <div className={cx('info')}>
                <h3 className={cx('title')}></h3>
                <p className={cx('label')}></p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Skeleton;
