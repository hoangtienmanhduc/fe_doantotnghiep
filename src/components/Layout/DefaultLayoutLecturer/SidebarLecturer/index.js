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
            <button
                style={{ height: '50px' }}
                className={cx('button')}
                onClick={() => (window.location.href = '/kehoachgiangday')}
            >
                <img style={{ width: '30px', height: '30px' }} src={images.So} alt="So"></img>
                <p className="font-semibold" style={{ marginLeft: '10px' }}>
                    Kế hoạch giảng dạy
                </p>
            </button>
            <button
                style={{ height: '50px' }}
                className={cx('button')}
                onClick={() => (window.location.href = '/lichtrinhgiangday')}
            >
                <img style={{ width: '30px', height: '30px' }} src={images.Lich} alt="Lich"></img>
                <p className="font-semibold" style={{ marginLeft: '10px' }}>
                    Lịch giảng dạy
                </p>
            </button>
            <button
                style={{ height: '50px' }}
                className={cx('button')}
                onClick={() => (window.location.href = '/lichthiketthuchocphan')}
            >
                <img style={{ width: '30px', height: '30px' }} src={images.Lichthi} alt="Lichthi"></img>
                <p className="font-semibold" style={{ marginLeft: '10px' }}>
                    Lịch thi
                </p>
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
