import images from '~/assets/images';
import styles from './HeaderLecturer.module.scss';
import classNames from 'classnames/bind';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const buttonClickKeHoachGiangDay = (popupState) => {
    window.location.href = 'kehoachgiangday';
    popupState.close(); // Đóng popup sau khi click
};

const buttonClickLichTrinhGiangDay = (popupState) => {
    window.location.href = 'lichtrinhgiangday';
    popupState.close(); // Đóng popup sau khi click
};

const buttonClickLichThiKetThucHocPhan = (popupState) => {
    window.location.href = 'lichthiketthuchocphan';
    popupState.close(); // Đóng popup sau khi click
};

function HeaderLecturer() {
    return (
        <header className="col-12 mb-2 border-bottom-1 border-500">
            <div className="w-full h-full flex align-items-center">
                <div className="h-6rem">
                    <img src={images.Logo} className="h-full" alt="Logo"></img>
                </div>
                <div>
                    <h2 style={{ fontWeight: 'bold', fontSize: '13px', color: '#DC143C' }}>Trang Giảng viên</h2>
                </div>

                <div style={{ marginLeft: '85px', display: 'flex' }}>
                    <div>
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <React.Fragment>
                                    <Button
                                        className={cx('button')}
                                        style={{
                                            height: '50px',
                                            width: '150px',
                                            fontSize: '9px',
                                            borderLeft: '1px solid white',
                                            borderRight: '1px solid white',
                                        }}
                                        variant="contained"
                                        {...bindTrigger(popupState)}
                                    >
                                        Đào tạo - Giảng dạy
                                        <FontAwesomeIcon
                                            style={{
                                                marginLeft: '5px',
                                                color: 'white',
                                                fontSize: '10',
                                                marginBottom: '5px',
                                            }}
                                            icon={faCaretDown}
                                        />
                                    </Button>
                                    <Menu {...bindMenu(popupState)}>
                                        <p
                                            style={{
                                                marginLeft: '10px',
                                                width: '180px',
                                                fontSize: '11px',
                                                fontWeight: 'bold',
                                                color: '#1E90FF',
                                            }}
                                        >
                                            Công tác giảng dạy
                                        </p>
                                        <MenuItem
                                            className={cx('text')}
                                            onClick={() => buttonClickKeHoachGiangDay(popupState)}
                                        >
                                            Kế hoạch giảng dạy
                                        </MenuItem>
                                        <MenuItem
                                            className={cx('text')}
                                            onClick={() => buttonClickLichTrinhGiangDay(popupState)}
                                        >
                                            Lịch giảng dạy
                                        </MenuItem>
                                        <MenuItem
                                            className={cx('text')}
                                            onClick={() => buttonClickLichThiKetThucHocPhan(popupState)}
                                        >
                                            Lịch thi
                                        </MenuItem>
                                        <p
                                            style={{
                                                marginLeft: '10px',
                                                width: '180px',
                                                fontSize: '11px',
                                                fontWeight: 'bold',
                                                color: '#1E90FF',
                                            }}
                                        >
                                            Số liệu thống kê
                                        </p>
                                        <MenuItem className={cx('text')} onClick={popupState.close}>
                                            Kết quả khảo sát giảng dạy
                                        </MenuItem>
                                        <MenuItem className={cx('text')} onClick={popupState.close}>
                                            Thống kê giờ giảng
                                        </MenuItem>
                                        <MenuItem className={cx('text')} onClick={popupState.close}>
                                            Thống kê giờ chuẩn giảng dạy
                                        </MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>
                    </div>
                    <div>
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <React.Fragment>
                                    <Button
                                        style={{
                                            height: '50px',
                                            width: '215px',
                                            fontSize: '9px',
                                            borderLeft: '1px solid white',
                                            borderRight: '1px solid white',
                                        }}
                                        variant="contained"
                                        {...bindTrigger(popupState)}
                                    >
                                        Tác nghiệp và & Tra cứu thông tin
                                        <FontAwesomeIcon
                                            style={{
                                                marginLeft: '5px',
                                                color: 'white',
                                                fontSize: '10',
                                                marginBottom: '5px',
                                            }}
                                            icon={faCaretDown}
                                        />
                                    </Button>
                                    <Menu {...bindMenu(popupState)}>
                                        <p
                                            style={{
                                                marginLeft: '10px',
                                                width: '200px',
                                                fontSize: '11px',
                                                fontWeight: 'bold',
                                                color: '#1E90FF',
                                            }}
                                        >
                                            Công tác giảng dạy
                                        </p>
                                        <MenuItem className={cx('text')} onClick={popupState.close}>
                                            Kế hoạch giảng dạy
                                        </MenuItem>
                                        <MenuItem className={cx('text')} onClick={popupState.close}>
                                            Lịch giảng dạy
                                        </MenuItem>
                                        <MenuItem className={cx('text')} onClick={popupState.close}>
                                            Lịch thi
                                        </MenuItem>
                                        <p
                                            style={{
                                                marginLeft: '10px',
                                                width: '180px',
                                                fontSize: '11px',
                                                fontWeight: 'bold',
                                                color: '#1E90FF',
                                            }}
                                        >
                                            Số liệu thống kê
                                        </p>
                                        <MenuItem className={cx('text')} onClick={popupState.close}>
                                            Kết quả khảo sát giảng dạy
                                        </MenuItem>
                                        <MenuItem className={cx('text')} onClick={popupState.close}>
                                            Thống kê giờ giảng
                                        </MenuItem>
                                        <MenuItem className={cx('text')} onClick={popupState.close}>
                                            Thống kê giờ chuẩn giảng dạy
                                        </MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>
                    </div>
                    <div>
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <React.Fragment>
                                    <Button
                                        style={{
                                            height: '50px',
                                            width: '150px',
                                            fontSize: '9px',
                                            borderLeft: '1px solid white',
                                            borderRight: '1px solid white',
                                        }}
                                        variant="contained"
                                        {...bindTrigger(popupState)}
                                    >
                                        Quản lý - điều hành
                                        <FontAwesomeIcon
                                            style={{
                                                marginLeft: '5px',
                                                color: 'white',
                                                fontSize: '10',
                                                marginBottom: '5px',
                                            }}
                                            icon={faCaretDown}
                                        />
                                    </Button>
                                    <Menu {...bindMenu(popupState)}>
                                        <p
                                            style={{
                                                marginLeft: '10px',
                                                width: '180px',
                                                fontSize: '11px',
                                                fontWeight: 'bold',
                                                color: '#1E90FF',
                                            }}
                                        >
                                            Công tác giảng dạy
                                        </p>
                                        <MenuItem className={cx('text')} onClick={popupState.close}>
                                            Kế hoạch giảng dạy
                                        </MenuItem>
                                        <MenuItem className={cx('text')} onClick={popupState.close}>
                                            Lịch giảng dạy
                                        </MenuItem>
                                        <MenuItem className={cx('text')} onClick={popupState.close}>
                                            Lịch thi
                                        </MenuItem>
                                        <p
                                            style={{
                                                marginLeft: '10px',
                                                width: '180px',
                                                fontSize: '11px',
                                                fontWeight: 'bold',
                                                color: '#1E90FF',
                                            }}
                                        >
                                            Số liệu thống kê
                                        </p>
                                        <MenuItem className={cx('text')} onClick={popupState.close}>
                                            Kết quả khảo sát giảng dạy
                                        </MenuItem>
                                        <MenuItem className={cx('text')} onClick={popupState.close}>
                                            Thống kê giờ giảng
                                        </MenuItem>
                                        <MenuItem className={cx('text')} onClick={popupState.close}>
                                            Thống kê giờ chuẩn giảng dạy
                                        </MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderLecturer;
