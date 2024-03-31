import { useState } from 'react';
import styles from './Ghichunhacnho.module.scss';
import classNames from 'classnames/bind';
import Select from 'react-select';

const cx = classNames.bind(styles);

const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    // Thêm các option khác nếu cần
];

function Ghichunhacnho() {
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
                    <h2>Ghi chú nhắc nhở</h2>
                    <div style={{ display: 'flex' }}>
                        <p style={{ fontWeight: 'bold', marginRight: '15px', marginTop: '8px', fontSize: '13px' }}>
                            Lọc bản tin
                        </p>
                        <div style={{ width: '170px' }}>
                            <Select
                                defaultValue={selectedOption[0]} // Sử dụng defaultValue để đặt giá trị mặc định
                                onChange={handleChange}
                                options={options}
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
                    <p style={{ fontWeight: 'bold' }}>Không tìm thấy thông tin nhắc nhở</p>
                </div>
                <div style={{ height: '15px', width: '100%' }}></div>
            </div>
        </div>
    );
}

export default Ghichunhacnho;
