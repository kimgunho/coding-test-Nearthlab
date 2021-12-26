import { useRecoilValue } from 'recoil';
import classNames from 'classnames/bind';

import styles from './List.module.scss';

import { photosState } from '../../recoil/state';

const cx = classNames.bind(styles);

function List({ total }) {
  const photos = useRecoilValue(photosState);
  const totalCount = total ? String(total) : 'loading...';
  return (
    <div className={cx('container')}>
      <p className={cx('total')}>
        전체
        {totalCount.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}개
      </p>
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
                <p className={cx(['result', { sucess: item.completed }])}>
                  {item.completed ? '완료' : '미완료'}
                </p>
              </div>
              <div className={cx('info')}>
                <h3 className={cx('title')}>{title[0]}</h3>
                <p className={cx('label')}>라벨 {item.labels.length}개</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default List;
