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
import { Button } from 'primereact/button';

const cx = classNames.bind(styles);

const MenuSidebar = () => {
    return (
        <React.Fragment>
            {/* <div style={{ width: '100%' }}>
                <Button
                    to="/home"
                    sidebar
                    leftIcon={<FontAwesomeIcon style={{ marginRight: '25px' }} icon={faHouseChimney} />}
                >
                    Trang chủ
                </Button>
            </div>
            <div className={cx('accordion_container')}>
                <div className={cx('accordion')}>
                    <Button style={{ fontSize: '12px' }} label="THÔNG TIN CHUNG" icon="pi pi-screen" />
                </div>
                <div>
                    <div className="">
                        <Button to="/" text label="Thông tin sinh viên" />
                    </div>
                    <div className="">
                        <Button to="/" text label="Ghi chú nhắc nhở" />
                    </div>
                    <div className="">
                        <Button to="/capnhatthongtinsinhvien" text label="Đề xuất cập nhật thông tin" />
                    </div>
                    <div className="">
                        <Button to="/" text label="Cập nhật thông tin ngân hàng" />
                    </div>
                </div>
            </div>
            <div className={cx('accordion_container')}>
                <div className={cx('accordion')}>
                    <button style={{ fontSize: '12px' }} type="button" className={cx('accordion_title')}>
                        <FontAwesomeIcon
                            style={{ marginRight: '8px', fontSize: '15px', marginLeft: '5px' }}
                            icon={faGraduationCap}
                        />
                        HỌC TẬP
                        <FontAwesomeIcon style={{ marginLeft: '82px', fontSize: '15px' }} icon={faAngleDown} />
                    </button>
                </div>
                <div>
                    <div className="">
                        <Button style={{ fontSize: '10px' }} to="/ketquahoctap" text>
                            Kết quả học tập
                        </Button>
                    </div>
                    <div className="">
                        <Button style={{ fontSize: '10px' }} to="/lichhoc" text>
                            Lịch theo tuấn
                        </Button>
                    </div>
                    <div className="">
                        <Button style={{ fontSize: '10px' }} to="/lichtheotiendo" text>
                            Lịch theo tiến độ
                        </Button>
                    </div>
                    <div className="">
                        <Button style={{ fontSize: '10px' }} to="/" text>
                            Lịch học lớp danh nghĩa
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('accordion_container')}>
                <div className={cx('accordion')}>
                    <button style={{ fontSize: '12px' }} type="button" className={cx('accordion_title')}>
                        <FontAwesomeIcon
                            style={{ marginRight: '8px', fontSize: '15px', marginLeft: '5px' }}
                            icon={faCheckToSlot}
                        />
                        ĐĂNG KÝ HỌC PHẦN
                        <FontAwesomeIcon style={{ marginLeft: '17px', fontSize: '15px' }} icon={faAngleDown} />
                    </button>
                </div>
                <div>
                    <div className="">
                        <Button style={{ fontSize: '10px' }} to="/chuongtrinhkhung" text>
                            Chương trình khung
                        </Button>
                    </div>
                    <div className="">
                        <Button style={{ fontSize: '10px' }} to="/dangkyhocphan" text>
                            Đăng kí học phần
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('accordion_container')}>
                <div className={cx('accordion')}>
                    <button style={{ fontSize: '12px' }} type="button" className={cx('accordion_title')}>
                        <FontAwesomeIcon
                            style={{ marginRight: '8px', fontSize: '15px', marginLeft: '5px' }}
                            icon={faMoneyCheckDollar}
                        />
                        HỌC PHÍ
                        <FontAwesomeIcon style={{ marginLeft: '85px', fontSize: '15px' }} icon={faAngleDown} />
                    </button>
                </div>
                <div>
                    <div className="">
                        <Button style={{ fontSize: '10px' }} to="/tracuucongno" text>
                            Tra cứu công nợ
                        </Button>
                    </div>
                    <div className="">
                        <Button style={{ fontSize: '10px' }} to="/thanhtoantructuyen" text>
                            Thanh toán trực tuyến
                        </Button>
                    </div>
                    <div className="">
                        <Button style={{ fontSize: '10px' }} to="/phieutonghop" text>
                            Phiếu thu tổng hợp
                        </Button>
                    </div>
                </div>
            </div> */}
        </React.Fragment>
    );
};

export default MenuSidebar;
