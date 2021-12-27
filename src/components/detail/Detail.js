import { useRecoilState } from 'recoil';
import classNames from 'classnames/bind';

import styles from './Detail.module.scss';

import { DetailModalState } from '../../recoil/state';

const cx = classNames.bind(styles);

function Detail() {
  const [detailActive, setDetailActive] = useRecoilState(DetailModalState);

  const handleDetailHide = () => {
    setDetailActive(false);
  };
  return (
    <div className={cx(['container', { on: detailActive }])}>
      <div className={cx('contents')}>
        <h2 className={cx('title')}>
          파일 상세 정보{' '}
          <button onClick={handleDetailHide} className={cx('close')}>
            ✕
          </button>
        </h2>
        <div className={cx('inner')}>
          <div className={cx('info')}>
            <img
              src="https://cdn.zeplin.io/5d4bb51c32e23e35167fcbbc/assets/EB9DB7A3-C1CD-4891-80B5-23A0138699F2.png"
              alt="테스트"
            />
            <ul>
              <li>
                <span className={cx('title')}>파일명</span>
                <span className={cx('text')}>DSX_212</span>
              </li>
              <li>
                <span className={cx('title')}>촬영시간</span>
                <span className={cx('text')}>2018.5.2 오전 10:23.24</span>
              </li>
              <li>
                <span className={cx('title')}>등록일</span>
                <span className={cx('text')}>2018.4.2</span>
              </li>
            </ul>
          </div>
          <div className={cx('labels')}>
            <h3 className={cx('title')}>라벨 정보</h3>
            <ul>
              <li>
                <h4 className={cx('title')}>라벨 #1</h4>
                <ul className={cx('info')}>
                  <li>
                    <h5 className={cx('subTitle')}>유형</h5>
                    <p className={cx('text')}>단순 손상</p>
                  </li>
                  <li>
                    <h5 className={cx('subTitle')}>설명</h5>
                    <p className={cx('text')}>
                      Leading Edge에 매우 초기Scratches 발생 - 조치 제안:
                      블레이드의 구조적인 문제는 야기하지 않으며, 운전에 영향을
                      미지치 않음. 지속적인 상태모니터링과 향후 예방정비 사항이
                      될 수 있음을 인지하는 것으로 충분함(Preventive Maintenance
                      Routine_PMR)
                    </p>
                  </li>
                </ul>
              </li>
              <li>
                <h4 className={cx('title')}>라벨 #1</h4>
                <ul className={cx('info')}>
                  <li>
                    <h5 className={cx('subTitle')}>유형</h5>
                    <p className={cx('text')}>단순 손상</p>
                  </li>
                  <li>
                    <h5 className={cx('subTitle')}>설명</h5>
                    <p className={cx('text')}>
                      Leading Edge에 매우 초기Scratches 발생 - 조치 제안:
                      블레이드의 구조적인 문제는 야기하지 않으며, 운전에 영향을
                      미지치 않음. 지속적인 상태모니터링과 향후 예방정비 사항이
                      될 수 있음을 인지하는 것으로 충분함(Preventive Maintenance
                      Routine_PMR)
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <button className={cx(['button', 'on'])}>완료</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
