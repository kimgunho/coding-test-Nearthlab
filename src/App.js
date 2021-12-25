import classNames from 'classnames/bind';

import styles from './App.module.scss';

import List from './components/List';

const cx = classNames.bind(styles);

function App() {
  return (
    <div className={cx('wrapper')}>
      <List />
    </div>
  );
}

export default App;
