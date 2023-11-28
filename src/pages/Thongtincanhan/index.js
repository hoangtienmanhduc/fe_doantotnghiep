import Image from '~/components/Image';
import styles from './Thongtincanhan.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Thongtincanhan() {
    return (
        <div className={cx('wrapper')}>
            <div style={{ height: '1px', width: '100%' }}></div>
            <div style={{ display: 'flex' }}>
                <div className={cx('image')}>
                    <Image src="https://i.imgur.com/FnS0hfi.jpg" className={cx('user-avata')} alt="name" />
                    <div>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <p>MSSV:</p>
                            <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>19435491</p>
                        </div>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <p>Họ tên:</p>
                            <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>Hoàng Tiến Mạnh Đức</p>
                        </div>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <p>Giới tính:</p>
                            <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>Nam</p>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        width: '650px',
                        height: '200px',
                        marginTop: '20px',
                        marginLeft: '35px',
                    }}
                >
                    <h2 style={{ marginTop: '5px', marginLeft: '10px' }}>Thông tin học vấn</h2>
                    <p style={{ marginLeft: '10px' }}>
                        __________________________________________________________________________________________________________
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', marginTop: '5px', marginLeft: '10px' }}>
                            <p>Trạng thái:</p>
                            <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>Đang học</p>
                        </div>
                        <div style={{ display: 'flex', marginTop: '5px' }}>
                            <p>Mã hồ sơ:</p>
                            <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>19XHB16698251</p>
                        </div>
                        <div style={{ display: 'flex', marginTop: '5px', marginRight: '100px' }}>
                            <p>Ngày vào trường:</p>
                            <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>20/7/2019</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '300px', marginLeft: '10px' }}>
                            <div style={{ display: 'flex', marginTop: '7px' }}>
                                <p>Lớp học:</p>
                                <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>DHKTPM17A</p>
                            </div>
                            <div style={{ display: 'flex', marginTop: '7px' }}>
                                <p>Bậc đào tạo:</p>
                                <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>Đại học</p>
                            </div>
                            <div style={{ display: 'flex', marginTop: '7px' }}>
                                <p>Khoa:</p>
                                <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>Khoa Công nghệ Thông tin</p>
                            </div>
                            <div style={{ display: 'flex', marginTop: '7px' }}>
                                <p>Chuyên ngành:</p>
                                <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>Kỹ thuật phần mềm - 7480103</p>
                            </div>
                        </div>
                        <div style={{ width: '260px', marginRight: '10px' }}>
                            <div style={{ display: 'flex', marginTop: '7px' }}>
                                <p>Cơ sở:</p>
                                <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>Cơ sở 1 (Thành phố Hồ Chí Minh)</p>
                            </div>
                            <div style={{ display: 'flex', marginTop: '7px' }}>
                                <p>Loại hình đào tạo:</p>
                                <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>Chính quy</p>
                            </div>
                            <div style={{ display: 'flex', marginTop: '7px' }}>
                                <p>Ngành:</p>
                                <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>Kỹ thuật phần mềm</p>
                            </div>
                            <div style={{ display: 'flex', marginTop: '7px' }}>
                                <p>Khóa học:</p>
                                <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>2019 - 2020</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 style={{ marginTop: '50px', marginLeft: '30px' }}>Thông tin cá nhân</h2>
                <p style={{ marginLeft: '20px' }}>
                    __________________________________________________________________________________________________________________________________________________
                </p>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                    <div style={{ width: '200px', marginLeft: '30px' }}>
                        <div style={{ display: 'flex', marginTop: '7px' }}>
                            <p>Ngày sinh:</p>
                            <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>12/05/2001</p>
                        </div>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <p>Số CMND:</p>
                            <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>2419310138</p>
                        </div>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <p>Đối tượng:</p>
                            <p style={{ marginLeft: '3px', fontWeight: 'bold' }}></p>
                        </div>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <p>Ngày vào Đoàn:</p>
                            <p style={{ marginLeft: '3px', fontWeight: 'bold' }}></p>
                        </div>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <p>Điện thoại:</p>
                            <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>0334548131</p>
                        </div>
                    </div>
                    <div style={{ width: '200px', marginLeft: '70px' }}>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <p>Dân tộc:</p>
                            <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>Kinh</p>
                        </div>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <p>Ngày cấp:</p>
                            <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>30/01/2019</p>
                        </div>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <p>Diện chính sách:</p>
                            <p style={{ marginLeft: '3px', fontWeight: 'bold' }}></p>
                        </div>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <p>Ngày vào Đảng:</p>
                            <p style={{ marginLeft: '3px', fontWeight: 'bold' }}></p>
                        </div>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <p>Email:</p>
                            <p style={{ marginLeft: '3px', fontWeight: 'bold' }}></p>
                        </div>
                    </div>
                    <div style={{ width: '140px', marginLeft: '30px' }}>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <p>Tôn giáo:</p>
                            <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>Không</p>
                        </div>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <p>Nơi cấp:</p>
                            <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>Đăk Lăk</p>
                        </div>
                    </div>
                    <div style={{ width: '140px', marginLeft: '80px' }}>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <p>Khu vực:</p>
                            <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>Khu vực 1</p>
                        </div>
                    </div>
                </div>
                <div style={{ width: '650px', marginLeft: '30px' }}>
                    <div style={{ display: 'flex', marginTop: '10px' }}>
                        <p>Địa chỉ liên hệ:</p>
                        <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>
                            Hoàng Tiến Mạnh Đức : Thôn 3, xã Krông Jing, Huyện M\\\'Đrăk, Tỉnh Đăk Lăk
                        </p>
                    </div>
                    <div style={{ display: 'flex', marginTop: '10px' }}>
                        <p>Nơi sinh:</p>
                        <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>Tỉnh Đồng Tháp</p>
                    </div>
                    <div style={{ display: 'flex', marginTop: '10px' }}>
                        <p>Hộ khẩu thường trú:</p>
                        <p style={{ marginLeft: '3px', fontWeight: 'bold' }}>
                            Thôn 3, Xã Krông Jing, Huyện M\\\'Đrắk, Tỉnh Đắk Lắk
                        </p>
                    </div>
                </div>
            </div>
            <div style={{ height: '1px', width: '100%' }}></div>
        </div>
    );
}

export default Thongtincanhan;
