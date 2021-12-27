import classNames from 'classnames/bind';

import styles from './App.module.scss';

import Photos from './page';
import Detail from './components/detail/Detail';

const cx = classNames.bind(styles);

function App() {
  return (
    <>
      <div className={cx('wrapper')}>
        <Photos />
      </div>
      <Detail />
    </>
  );
}

export default App;
