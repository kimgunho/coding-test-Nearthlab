import classNames from 'classnames/bind';

import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function Skeleton() {
  return (
    <div className={cx('container')}>
      <div className={cx('limiter')}>
        <div className={cx('circle')}></div>
      </div>
    </div>
  );
}

export default Skeleton;
