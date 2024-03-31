import images from '~/assets/images';
import styles from './SidebarLecturer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SidebarLecturer() {
    return (
        <div className={cx('wrapper')}>
            <div>
                <p
                    style={{
                        fontWeight: 'bold',
                        marginLeft: '15px',
                        marginTop: '20px',
                        marginBottom: '5px',
                        color: '#1E90FF',
                    }}
                >
                    Trần Thanh Lương
                </p>
                <button className={cx('button')} onClick={() => (window.location.href = '/')}>
                    <img style={{ width: '40px', height: '40px' }} src={images.Logo} alt="Logo"></img>
                    <p>Thông tin cá nhân</p>
                </button>
                <button className={cx('button')} onClick={() => (window.location.href = '/')}>
                    <img style={{ width: '40px', height: '40px' }} src={images.Logo} alt="Logo"></img>
                    <p>Lý lịch cán bộ - viên chức</p>
                </button>
                <button className={cx('button')} onClick={() => (window.location.href = '/')}>
                    <img style={{ width: '40px', height: '40px' }} src={images.Logo} alt="Logo"></img>
                    <p>Tích hợp tài khoản</p>
                </button>
                <button className={cx('button')} onClick={() => (window.location.href = '/')}>
                    <img style={{ width: '40px', height: '40px' }} src={images.Logo} alt="Logo"></img>
                    <p>Đổi mật khẩu</p>
                </button>
                <button className={cx('button')} onClick={() => (window.location.href = '/')}>
                    <img style={{ width: '40px', height: '40px' }} src={images.Logo} alt="Logo"></img>
                    <p>Đăng xuất</p>
                </button>
                <p
                    style={{
                        fontWeight: 'bold',
                        marginLeft: '15px',
                        marginTop: '10px',
                        marginBottom: '5px',
                        color: '#1E90FF',
                    }}
                >
                    CÁC CHỨC NĂNG CHUNG
                </p>
                <button className={cx('button')} onClick={() => (window.location.href = '/')}>
                    <img style={{ width: '40px', height: '40px' }} src={images.Logo} alt="Logo"></img>
                    <p>Tin tức - thông báo</p>
                </button>
                <button className={cx('button')} onClick={() => (window.location.href = '/')}>
                    <img style={{ width: '40px', height: '40px' }} src={images.Logo} alt="Logo"></img>
                    <p>Lịch công việc</p>
                </button>
                <button className={cx('button')} onClick={() => (window.location.href = '/')}>
                    <img style={{ width: '40px', height: '40px' }} src={images.Logo} alt="Logo"></img>
                    <p>Tin nhắn</p>
                </button>
                <button className={cx('button')} onClick={() => (window.location.href = '/')}>
                    <img style={{ width: '40px', height: '40px' }} src={images.Logo} alt="Logo"></img>
                    <p>Công việc - sự kiện</p>
                </button>
                <p
                    style={{
                        fontWeight: 'bold',
                        marginLeft: '15px',
                        marginTop: '10px',
                        marginBottom: '5px',
                        color: '#1E90FF',
                    }}
                >
                    TIN TỨC _ THÔNG BÁO
                </p>
            </div>
        </div>
    );
}

export default SidebarLecturer;
