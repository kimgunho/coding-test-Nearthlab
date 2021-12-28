import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useRecoilState, useRecoilValue } from 'recoil';
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
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [photoTitle, setPhotoTitle] = useState('');
  const [detailModalActive, setDetailModalActive] =
    useRecoilState(DetailModalState);
  const [currentDetailId, setCurrentDetailId] =
    useRecoilState(currentDetailIdState);
  const [photos, setPhotos] = useRecoilState(photosState);
  const labelsTitle = useRecoilValue(labelsInfoState);

  // 선택된 data-id와 photos의 id를 비교한 후 선택된 photo 추출
  useEffect(() => {
    const selectPhoto = photos.find(({ id }) => id === Number(currentDetailId));
    redefinePhotoTitle(selectPhoto);
    setCurrentPhoto(selectPhoto);
  }, [currentDetailId]);

  const redefinePhotoTitle = (object) => {
    const photoUrlArray = object?.photoUrl.split('/');
    if (photoUrlArray !== undefined) {
      const titleCut = photoUrlArray[photoUrlArray.length - 1].split('.');
      setPhotoTitle(titleCut[0]);
    }
  };

  const handleClearDetail = () => {
    setDetailModalActive(false);
    setCurrentDetailId(null);
  };

  const getLabelTitle = (id) => {
    let typeTitle = '';

    labelsTitle.forEach((label) => {
      if (id === label.id) {
        typeTitle = label.title;
      }
    });

    return typeTitle;
  };

  const handleUpdatePhotos = (id, completedValue) => {
    setCurrentPhoto((prev) => ({
      ...prev,
      completed: completedValue,
    }));

    const index = photos.findIndex((photo) => photo.id === id);

    if (index !== -1) {
      let virtualPhotos = [...photos];
      let targetPhoto = { ...virtualPhotos[index] };
      targetPhoto.completed = completedValue;
      virtualPhotos[index] = targetPhoto;
      setPhotos(virtualPhotos);
    } else {
      console.error('존재하지 않는 데이터입니다.');
    }
  };

  return (
    <>
      <div className={cx(['container', { on: detailModalActive }])}>
        <div className={cx('contents')}>
          <h2 className={cx('title')}>
            파일 상세 정보
            <button onClick={handleClearDetail} className={cx('close')}>
              ✕
            </button>
          </h2>
          {currentPhoto !== null ? (
            <>
              <div className={cx('inner')}>
                <div className={cx('info')}>
                  <img src={currentPhoto?.photoUrl} alt={photoTitle} />
                  <ul>
                    <li>
                      <span className={cx('title')}>파일명</span>
                      <span className={cx('text')}>{photoTitle}</span>
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
                      currentPhoto?.labels.map((label, index) => (
                        <li key={label.id}>
                          <h4 className={cx('title')}>라벨 #{index + 1}</h4>
                          <ul className={cx('info')}>
                            <li>
                              <h5 className={cx('subTitle')}>유형</h5>
                              <p className={cx('text')}>
                                {getLabelTitle(label.typeId)}
                              </p>
                            </li>
                            <li>
                              <h5 className={cx('subTitle')}>설명</h5>
                              <p className={cx('text')}>{label.description}</p>
                            </li>
                          </ul>
                        </li>
                      ))
                    )}
                  </ul>
                  <button
                    onClick={() =>
                      handleUpdatePhotos(
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
      <div className={cx(['dimmed', { on: detailModalActive }])} />
    </>
  );
}

export default Detail;
