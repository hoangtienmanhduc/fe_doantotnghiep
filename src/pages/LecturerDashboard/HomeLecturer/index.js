/* eslint-disable react/jsx-pascal-case */
import styles from '~/pages/LecturerDashboard/HomeLecturer/HomeLecturer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function HomeLecturer() {
    return (
        <div className={cx('wrapper')}>
            <div></div>
            <div style={{ width: '100%', height: '50px', marginTop: '25px' }}>
                <h2 style={{ marginTop: '5px', marginLeft: '10px' }}>THÔNG BÁO</h2>
                <p style={{ marginLeft: '10px' }}>
                    _______________________________________________________________________________________________________________________________________________________________________________________________________________
                </p>
                <div></div>
            </div>
        </div>
    );
}

export default HomeLecturer;
