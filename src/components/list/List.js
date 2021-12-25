import classNames from 'classnames/bind';

import styles from './List.module.scss';

const cx = classNames.bind(styles);

function List({ photos, total }) {
  return (
    <div className={cx('container')}>
      <p className={cx('total')}>전체 {total}개</p>
      <ul className={cx('photos')}>
        {photos?.map((item) => {
          const splitCut = item.photoUrl.split('/');
          const title = splitCut[splitCut.length - 1].split('.');
          return (
            <li key={item.id}>
              <div
                className={cx('photo')}
                style={{ backgroundImage: `url(${item.photoUrl})` }}
              >
                <p
                  className={cx([
                    'result',
                    { sucess: item.labels.length === 0 },
                  ])}
                >
                  {item.labels.length === 0 ? '완료' : '미완료'}
                </p>
              </div>
              <div className={cx('info')}>
                <h3 className={cx('title')}>파일 이름 : {title[0]}</h3>
                <p
                  className={cx([
                    'label',
                    { hidden: item.labels.length === 0 },
                  ])}
                >
                  라벨 {item.labels.length}개
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default List;
