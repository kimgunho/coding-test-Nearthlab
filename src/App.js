import classNames from 'classnames/bind';

import styles from './App.module.scss';

import Photos from './page';

const cx = classNames.bind(styles);

function App() {
  return (
    <div className={cx('wrapper')}>
      <Photos />
    </div>
  );
}

export default App;
