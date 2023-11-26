import Header from '~/components/Layout/components/Header';
import styles from './HeaderOnly.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className="container">{children}</div>
        </div>
    );
}

export default HeaderOnly;
