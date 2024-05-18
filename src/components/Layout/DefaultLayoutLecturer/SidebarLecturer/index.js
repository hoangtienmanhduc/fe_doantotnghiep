import images from '~/assets/images';
import styles from './SidebarLecturer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SidebarLecturer() {
    return (
        <div className="w-full">
            <p
                className="text-primary"
                style={{
                    fontWeight: 'bold',
                    marginLeft: '15px',
                    marginTop: '10px',
                    marginBottom: '5px',
                }}
            >
                CÁC CHỨC NĂNG CHUNG
            </p>
            <button className={cx('button')} onClick={() => (window.location.href = '/kehoachgiangday')}>
                <img style={{ width: '40px', height: '40px' }} src={images.Logo} alt="Logo"></img>
                <p>Kế hoạch giảng dạy</p>
            </button>
            <button className={cx('button')} onClick={() => (window.location.href = '/lichtrinhgiangday')}>
                <img style={{ width: '40px', height: '40px' }} src={images.Logo} alt="Logo"></img>
                <p>Lịch giảng dạy</p>
            </button>
            <button className={cx('button')} onClick={() => (window.location.href = '/lichthiketthuchocphan')}>
                <img style={{ width: '40px', height: '40px' }} src={images.Logo} alt="Logo"></img>
                <p>Lịch thi</p>
            </button>
            <p
                className="text-primary"
                style={{
                    fontWeight: 'bold',
                    marginLeft: '15px',
                    marginTop: '10px',
                    marginBottom: '5px',
                }}
            >
                TIN TỨC -THÔNG BÁO
            </p>
            <div className="mx-3">
                <p className="font-semibold">Hiện không có thông báo nào...</p>
            </div>
        </div>
    );
}

export default SidebarLecturer;
