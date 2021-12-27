import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import classNames from 'classnames/bind';
import moment from 'moment';
import 'moment/locale/ko';

import styles from './Detail.module.scss';

import {
  labelsInfoState,
  DetailModalState,
  currentDetailIdState,
  photosState,
} from '../../recoil/state';

const cx = classNames.bind(styles);

function Detail() {
  const [detailActive, setDetailActive] = useRecoilState(DetailModalState);
  const [currentDetailId, setCurrentDetailId] =
    useRecoilState(currentDetailIdState);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [photos, setPhotos] = useRecoilState(photosState);
  const labelsInfo = useRecoilValue(labelsInfoState);

  useEffect(() => {
    const selectPhoto = photos.find(({ id }) => id === Number(currentDetailId));
    setCurrentPhoto(selectPhoto);
  }, [currentDetailId]);

  const handleClearDetail = () => {
    setDetailActive(false);
    setCurrentDetailId(null);
  };

  const checkLabels = (id) => {
    let typeTitle = '';
    switch (id) {
      case 1:
        typeTitle = labelsInfo[0].title;
        break;
      case 2:
        typeTitle = labelsInfo[1].title;
        break;
      case 3:
        typeTitle = labelsInfo[2].title;
        break;
      case 4:
        typeTitle = labelsInfo[3].title;
        break;
      default:
        console.error('no typeId');
    }

    return typeTitle;
  };

  const handleChangePhoto = (id, value) => {
    setCurrentPhoto((prev) => {
      return {
        id: prev.id,
        photoUrl: prev.photoUrl,
        photoTakenAt: prev.photoTakenAt,
        createdAt: prev.createdAt,
        completed: !prev.completed,
        labels: prev.labels,
      };
    });

    const index = photos.findIndex((photo) => photo.id === id);

    if (index !== -1) {
      let virtualPhotos = [...photos];
      let photoIndexObject = { ...virtualPhotos[index] };
      photoIndexObject.completed = value;
      virtualPhotos[index] = photoIndexObject;
      setPhotos(virtualPhotos);
    } else {
      console.log('no...');
    }
  };

  return (
    <div className={cx(['container', { on: detailActive }])}>
      <div className={cx('contents')}>
        <h2 className={cx('title')}>
          파일 상세 정보{' '}
          <button onClick={handleClearDetail} className={cx('close')}>
            ✕
          </button>
        </h2>
        {currentPhoto !== null ? (
          <>
            <div className={cx('inner')}>
              <div className={cx('info')}>
                <img src={currentPhoto?.photoUrl} alt="" />
                <ul>
                  <li>
                    <span className={cx('title')}>파일명</span>
                    <span className={cx('text')}>
                      {currentPhoto?.photoUrl
                        .split('/')
                        .map((line, index) =>
                          index === currentPhoto?.photoUrl.split('/').length - 1
                            ? line.replace(/\.jpg/g, '')
                            : '',
                        )}
                    </span>
                  </li>
                  <li>
                    <span className={cx('title')}>촬영시간</span>
                    <span className={cx('text')}>
                      {moment(currentPhoto?.photoTakenAt).format(
                        'YYYY.MM.DD a HH:mm:ss',
                      )}
                    </span>
                  </li>
                  <li>
                    <span className={cx('title')}>등록일</span>
                    <span className={cx('text')}>
                      {moment(currentPhoto?.createdAt).format('YYYY.MM.DD')}
                    </span>
                  </li>
                </ul>
              </div>
              <div className={cx('labels')}>
                <h3 className={cx('title')}>라벨 정보</h3>
                <ul>
                  {currentPhoto?.labels.length === 0 ? (
                    <li className={cx('notLabel')}>
                      라벨이 존재하지 않습니다.
                    </li>
                  ) : (
                    ''
                  )}
                  {currentPhoto?.labels.map((label, index) => (
                    <li key={label.id}>
                      <h4 className={cx('title')}>라벨 #{index + 1}</h4>
                      <ul className={cx('info')}>
                        <li>
                          <h5 className={cx('subTitle')}>유형</h5>
                          <p className={cx('text')}>
                            {checkLabels(label.typeId)}
                          </p>
                        </li>
                        <li>
                          <h5 className={cx('subTitle')}>설명</h5>
                          <p className={cx('text')}>{label.description}</p>
                        </li>
                      </ul>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() =>
                    handleChangePhoto(
                      currentPhoto?.id,
                      !currentPhoto?.completed,
                    )
                  }
                  className={cx([
                    'button',
                    !currentPhoto?.completed ? 'on' : 'off',
                  ])}
                >
                  {!currentPhoto?.completed ? '완료' : '미완료'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
}

export default Detail;
