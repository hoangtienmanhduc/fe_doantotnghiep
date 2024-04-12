import styles from './DefaultLayoutLecturer.module.scss';
import classNames from 'classnames/bind';
import HeaderLecturer from '../components/HeaderLecturer';
import SidebarLecturer from './SidebarLecturer';
import Header from '../components/Header/Header';

const cx = classNames.bind(styles);

function DefaultLayoutLecturer({ children }) {
    return (
        <div className="w-full">
            <Header />
            <HeaderLecturer />
            <div className={cx('container')}>
                <SidebarLecturer />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayoutLecturer;
