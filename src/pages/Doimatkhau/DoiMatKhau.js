import Button from '~/components/Button';
import styles from './Doimatkhau.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Doimatkhau() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div style={{ height: '10px', width: '100%' }}></div>
                <div className={cx('header')}>
                    <div style={{ textAlign: 'center' }}>
                        <h2>Đổi mật khẩu</h2>
                    </div>

                    <p style={{ textAlign: 'center' }}>
                        ________________________________________________________________________________________________
                    </p>
                    <div style={{ marginTop: '15px' }}>
                        <p style={{ marginLeft: '50px' }}>Mật khẩu cũ(*)</p>
                        <div className={cx('search')}>
                            <input type="password" placeholder="Nhập mật khẩu cũ" spellCheck={false} />
                        </div>
                    </div>
                    <div style={{ marginTop: '15px' }}>
                        <p style={{ marginLeft: '50px' }}>Mật khẩu mới(*)</p>
                        <div className={cx('search')}>
                            <input type="password" placeholder="Nhập mật khẩu mới" spellCheck={false} />
                        </div>
                    </div>
                    <div style={{ marginTop: '15px' }}>
                        <p style={{ marginLeft: '50px' }}>Xác nhận mật khẩu(*)</p>
                        <div className={cx('search')}>
                            <input type="password" placeholder="Xác nhận mật khẩu" spellCheck={false} />
                        </div>
                    </div>
                    <Button style={{ marginLeft: '175px' }} login>
                        Lưu
                    </Button>
                </div>
            </div>
            <div style={{ height: '250px', width: '100%' }}></div>
        </div>
    );
}

export default Doimatkhau;
