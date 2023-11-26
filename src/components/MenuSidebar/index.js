import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MenuSidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faCheckToSlot,
    faDisplay,
    faGraduationCap,
    faHouseChimney,
    faMoneyCheckDollar,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';

const cx = classNames.bind(styles);

const MenuSidebar = () => {
    const [thongTinChung, setThongTinChung] = useState(false);
    const [hocTap, setHocTap] = useState(false);
    const [dangKyHocPhan, setDangKyHocPhan] = useState(false);
    const [hocPhi, setHocPhi] = useState(false);

    const buttonThongTinChung = () => {
        setThongTinChung((prevContentVisible) => !prevContentVisible);
        setHocTap(false);
        setDangKyHocPhan(false);
        setHocPhi(false);
    };

    const buttonHocTap = () => {
        setHocTap((prevContentVisible) => !prevContentVisible);
        setThongTinChung(false);
        setDangKyHocPhan(false);
        setHocPhi(false);
    };

    const buttonDangKyHocPhan = () => {
        setDangKyHocPhan((prevContentVisible) => !prevContentVisible);
        setThongTinChung(false);
        setHocTap(false);
        setHocPhi(false);
    };

    const buttonHocPhi = () => {
        setHocPhi((prevContentVisible) => !prevContentVisible);
        setThongTinChung(false);
        setHocTap(false);
        setDangKyHocPhan(false);
    };

    return (
        <div>
            <div style={{ width: '100%' }}>
                <Button
                    to="/"
                    sidebar
                    leftIcon={<FontAwesomeIcon style={{ marginRight: '25px' }} icon={faHouseChimney} />}
                >
                    Trang chủ
                </Button>
            </div>
            <div className={cx('accordion_container')}>
                <div className={cx('accordion')}>
                    <button
                        style={{ fontSize: '12px' }}
                        type="button"
                        className={cx('accordion_title')}
                        onClick={buttonThongTinChung}
                    >
                        <FontAwesomeIcon
                            style={{ marginRight: '8px', fontSize: '15px', marginLeft: '5px' }}
                            icon={faDisplay}
                        />
                        THÔNG TIN CHUNG
                        <FontAwesomeIcon style={{ marginLeft: '25px', fontSize: '15px' }} icon={faAngleDown} />
                    </button>
                </div>
                <div
                    className={cx('accordion_content', {
                        [cx('show_content')]: thongTinChung,
                    })}
                >
                    <div className={cx('list_item_container')}>
                        <Button style={{ fontSize: '10px' }} to="/" text>
                            Thông tin sinh viên
                        </Button>
                    </div>
                    <div className={cx('list_item_container')}>
                        <Button style={{ fontSize: '10px' }} to="/" text>
                            Ghi chú nhắc nhở
                        </Button>
                    </div>
                    <div className={cx('list_item_container')}>
                        <Button style={{ fontSize: '10px' }} to="/" text>
                            Đề xuất cập nhật thông tin
                        </Button>
                    </div>
                    <div className={cx('list_item_container')}>
                        <Button style={{ fontSize: '10px' }} to="/" text>
                            Cập nhật thông tin ngân hàng
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('accordion_container')}>
                <div className={cx('accordion')}>
                    <button
                        style={{ fontSize: '12px' }}
                        type="button"
                        className={cx('accordion_title')}
                        onClick={buttonHocTap}
                    >
                        <FontAwesomeIcon
                            style={{ marginRight: '8px', fontSize: '15px', marginLeft: '5px' }}
                            icon={faGraduationCap}
                        />
                        HỌC TẬP
                        <FontAwesomeIcon style={{ marginLeft: '82px', fontSize: '15px' }} icon={faAngleDown} />
                    </button>
                </div>
                <div
                    className={cx('accordion_content', {
                        [cx('show_content')]: hocTap,
                    })}
                >
                    <div className={cx('list_item_container')}>
                        <Button style={{ fontSize: '10px' }} to="/" text>
                            Kết quả học tập
                        </Button>
                    </div>
                    <div className={cx('list_item_container')}>
                        <Button style={{ fontSize: '10px' }} to="/" text>
                            Lịch theo tuấn
                        </Button>
                    </div>
                    <div className={cx('list_item_container')}>
                        <Button style={{ fontSize: '10px' }} to="/" text>
                            Lịch theo tiến độ
                        </Button>
                    </div>
                    <div className={cx('list_item_container')}>
                        <Button style={{ fontSize: '10px' }} to="/" text>
                            Lịch học lớp danh nghĩa
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('accordion_container')}>
                <div className={cx('accordion')}>
                    <button
                        style={{ fontSize: '12px' }}
                        type="button"
                        className={cx('accordion_title')}
                        onClick={buttonDangKyHocPhan}
                    >
                        <FontAwesomeIcon
                            style={{ marginRight: '8px', fontSize: '15px', marginLeft: '5px' }}
                            icon={faCheckToSlot}
                        />
                        ĐĂNG KÝ HỌC PHẦN
                        <FontAwesomeIcon style={{ marginLeft: '17px', fontSize: '15px' }} icon={faAngleDown} />
                    </button>
                </div>
                <div
                    className={cx('accordion_content', {
                        [cx('show_content2')]: dangKyHocPhan,
                    })}
                >
                    <div className={cx('list_item_container')}>
                        <Button style={{ fontSize: '10px' }} to="/" text>
                            Chương trình khung
                        </Button>
                    </div>
                    <div className={cx('list_item_container')}>
                        <Button style={{ fontSize: '10px' }} to="/" text>
                            Đăng kí học phần
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('accordion_container')}>
                <div className={cx('accordion')}>
                    <button
                        style={{ fontSize: '12px' }}
                        type="button"
                        className={cx('accordion_title')}
                        onClick={buttonHocPhi}
                    >
                        <FontAwesomeIcon
                            style={{ marginRight: '8px', fontSize: '15px', marginLeft: '5px' }}
                            icon={faMoneyCheckDollar}
                        />
                        HỌC PHÍ
                        <FontAwesomeIcon style={{ marginLeft: '85px', fontSize: '15px' }} icon={faAngleDown} />
                    </button>
                </div>
                <div
                    className={cx('accordion_content', {
                        [cx('show_content3')]: hocPhi,
                    })}
                >
                    <div className={cx('list_item_container')}>
                        <Button style={{ fontSize: '10px' }} to="/" text>
                            Tra cứu công nợ
                        </Button>
                    </div>
                    <div className={cx('list_item_container')}>
                        <Button style={{ fontSize: '10px' }} to="/" text>
                            Thanh toán trực tuyến
                        </Button>
                    </div>
                    <div className={cx('list_item_container')}>
                        <Button style={{ fontSize: '10px' }} to="/" text>
                            Phiếu thu tổng hợp
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuSidebar;
