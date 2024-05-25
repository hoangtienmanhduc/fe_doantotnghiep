import { useState } from 'react';
import styles from './Thanhtoantructuyen.module.scss';
import classNames from 'classnames/bind';
import Select from 'react-select';

const cx = classNames.bind(styles);

const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    // Thêm các option khác nếu cần
];

function Thanhtoantructuyen() {
    const [selectedOption, setSelectedOption] = useState(options);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        // Xử lý khi một option được chọn
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper')}>
                <div style={{ height: '1px', width: '100%' }}></div>

                <div
                    style={{
                        height: '30px',
                        width: '99%',
                        marginTop: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        textAlign: 'center',
                        alignItems: 'center',
                    }}
                >
                    <h2>Thanh toán trực tuyến</h2>
                    <div style={{ display: 'flex' }}>
                        <p style={{ marginRight: '15px', marginTop: '5px', fontSize: '15px' }}>Đợt</p>
                        <div style={{ width: '150px', height: '30px' }}>
                            <Select
                                defaultValue={selectedOption[0]} // Sử dụng defaultValue để đặt giá trị mặc định
                                onChange={handleChange}
                                options={options || []}
                                isSearchable={true}
                                placeholder="Chọn một option..."
                                maxMenuHeight={250}
                            />
                        </div>
                    </div>
                </div>
                <p>
                    _______________________________________________________________________________________________________________________________________________________
                </p>
                <div
                    style={{
                        width: '100%',
                    }}
                >
                    <table border="1" width={915}>
                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th style={{ height: '50px', width: '35px' }} rowSpan="1"></th>
                            <th rowSpan="1">STT</th>
                            <th rowSpan="1">Mã</th>
                            <th rowSpan="1">Nội dung thu</th>
                            <th rowSpan="1">Tín chỉ</th>
                            <th rowSpan="1">Bắt buộc</th>
                            <th rowSpan="1">Số tiền (VND)</th>
                        </tr>
                        <tr>
                            <th colSpan="7">Không tìm thấy dữ liệu công nợ</th>
                        </tr>
                    </table>
                </div>
                <div style={{ height: '15px', width: '100%' }}></div>
            </div>
        </div>
    );
}

export default Thanhtoantructuyen;
