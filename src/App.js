import classNames from 'classnames/bind';
import { useRecoilValue } from 'recoil';

import styles from './App.module.scss';
import { DetailModalState } from './recoil/state';

import Photos from './page';
import Detail from './components/detail/Detail';

const cx = classNames.bind(styles);

function App() {
  const fliterBlur = useRecoilValue(DetailModalState);
  return (
    <>
      <div className={cx(['wrapper', { blur: fliterBlur }])}>
        <Photos />
      </div>
      <Detail />
    </>
  );
}

export default App;
