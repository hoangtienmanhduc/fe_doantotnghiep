/* eslint-disable react/jsx-pascal-case */
import Image from '~/components/Image';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarDays,
    faCalendarMinus,
    faChartColumn,
    faDollarSign,
    faEnvelopeOpenText,
    faFileInvoice,
    faFileInvoiceDollar,
    faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import Chart from 'react-google-charts';
import Table_Home from '~/components/Table/Table';
import { useState } from 'react';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { getUserInfo } from '~/api/user/UserService';
import { Button } from 'primereact/button';

const cx = classNames.bind(styles);

const optionmenu = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
    { value: 'option6', label: 'Option 6' },
    { value: 'option7', label: 'Option 7' },
    { value: 'option8', label: 'Option 8' },
    { value: 'option9', label: 'Option 9' },
    // Thêm các option khác nếu cần
];

const data = [
    ['Điểm TB của bạn và lớp học phần', 'Điểm của bạn', 'Điểm lớp học'],
    ['Pháp luận đại cương', 1000, 400],
    ['Toán cao cấp', 800, 600],
    ['Nguyên lí kế toán', 1100, 500],
    ['Khoa học dữ liệu', 1200, 1000],
    ['Tin học cơ bản', 1000, 400],
    ['Tin học cơ bản', 1000, 400],
    ['Tin học cơ bản', 1000, 400],
];

const data2 = [
    ['Task', 'Hours per Day'],
    ['Đã học', 11],
    ['Còn lại', 2],
];

const options = {
    legend: 'none',
    pieSliceText: 'label',
    slices: {
        4: { offset: 0.2 },
        12: { offset: 0.3 },
        14: { offset: 0.4 },
        15: { offset: 0.5 },
    },
};

const QueryKey = 'Home';

function Home() {
    const { data: userInfo } = useQuery([QueryKey, getUserId()], () => getUserInfo(getUserId(), getUserId()), {
        enabled: !!getUserId(),
    });

    const [selectedOption, setSelectedOption] = useState(optionmenu);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };
    return (
        <div className="w-full">
            <div className="col-12 grid align-items-stretch p-0 mb-3">
                <div className="xs:col-6 sm:col-6 md:col-6 col-12 h-full">
                    <h2>
                        Thông tin sinh viên
                        <hr />
                    </h2>

                    <div className="flex align-items-center h-full">
                        <div className="flex flex-column align-items-center col-6">
                            <Image src="https://i.imgur.com/FnS0hfi.jpg" className={cx('user-avata')} alt="name" />
                            <Button text>Xem chi tiết</Button>
                        </div>
                        <div className="flex justify-content-between col-6">
                            <div>
                                <span className="flex align-items-center">
                                    <p className="text-600 font-semibold mr-2">MSSV:</p>
                                    <p>{userInfo?.code}</p>
                                </span>
                                <span className="flex align-items-center">
                                    <p className="text-600 font-semibold mr-2">Họ tên:</p>
                                    <p>{userInfo?.firstName + ' ' + userInfo?.lastName}</p>
                                </span>
                                <span className="flex align-items-center">
                                    <p className="text-600 font-semibold mr-2">Giới tính:</p>
                                    <p>{userInfo?.gender}</p>
                                </span>
                                <span className="flex align-items-center">
                                    <p className="text-600 font-semibold mr-2">Ngày sinh:</p>
                                    <p>{userInfo?.dob}</p>
                                </span>
                                <span className="flex align-items-center">
                                    <p className="text-600 font-semibold mr-2">Nơi sinh:</p>
                                    <p>{userInfo?.provinceName}</p>
                                </span>
                            </div>
                            <div>
                                <span className="flex align-items-center">
                                    <p className="text-600 font-semibold mr-2">Lớp học:</p>
                                    <p>{userInfo?.specializationClassName}</p>
                                </span>
                                <span className="flex align-items-center">
                                    <p className="text-600 font-semibold mr-2">Khóa học:</p>
                                    <p>{userInfo?.schoolYear}</p>
                                </span>
                                <span className="flex align-items-center">
                                    <p className="text-600 font-semibold mr-2">Bậc đào tạo:</p>
                                    <p>Đại học</p>
                                </span>
                                <span className="flex align-items-center">
                                    <p className="text-600 font-semibold mr-2">Loại hình đào tạo:</p>
                                    <p>{userInfo?.typeOfEducation}</p>
                                </span>
                                <span className="flex align-items-center">
                                    <p className="text-600 font-semibold mr-2">Ngành:</p>
                                    <p>{userInfo?.specializationName}</p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xs:col-6 sm:col-6 md:col-6 col-12 h-full">
                    <h2>
                        Nhắc nhở mới, chưa xem <i className="pi pi-bell"></i>
                        <hr />
                    </h2>
                    <div className="flex col-12 p-0 m-0 justify-content-around gap-2 align-items-center">
                        <div className="col-6 bg-blue-200 border-round flex flex-column align-items-center">
                            <h2 className=" flex align-items-center text-blue-400">
                                Lịch học trong tuần <i className="pi pi-calendar text-3xl ml-3"></i>
                            </h2>
                            <span className="text-blue-500 text-3xl mb-3">
                                <p className="mr-3 m-0">0</p>
                            </span>
                            <Button
                                text
                                label="Xem chi tiết"
                                className="text-blue-400 bg-blue-100"
                                onClick={() => {}}
                            />
                        </div>
                        <div className="col-6 bg-orange-200 border-round flex flex-column align-items-center">
                            <h2 className=" flex align-items-center text-orange-400">
                                Lịch thi trong tuần <i className="pi pi-calendar-plus text-3xl ml-3"></i>
                            </h2>
                            <span className="text-orange-500 text-3xl mb-3">
                                <p className="mr-3 m-0">0</p>
                            </span>
                            <Button
                                text
                                label="Xem chi tiết"
                                className="text-orange-400 bg-orange-100"
                                onClick={() => {}}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex align-items-stretch justify-content-between gap-2 w-full m-0 overflow-x-auto">
                <div
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        style={{ fontWeight: 'normal', display: 'inline-block' }}
                        primary
                        onClick={() => window.location.assign('/lichhoc')}
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    fontSize: '25px',
                                    color: '#4da1e8',
                                }}
                                icon={faCalendarDays}
                            />
                        }
                    >
                        Lịch theo tuần
                    </Button>
                </div>
                <div
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        style={{
                            fontWeight: 'normal',
                            display: 'inline-block',
                        }}
                        onClick={() => window.location.assign('/ketquahoctap')}
                        primary
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    fontSize: '25px',
                                    color: '#4da1e8',
                                }}
                                icon={faChartColumn}
                            />
                        }
                    >
                        Kết quả học tập
                    </Button>
                </div>
                <div
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        style={{ fontWeight: 'normal', display: 'inline-block' }}
                        primary
                        onClick={() => window.location.assign('/dangkyhocphan')}
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    fontSize: '25px',
                                    color: '#4da1e8',
                                }}
                                icon={faLayerGroup}
                            />
                        }
                    >
                        Đăng kí học phần
                    </Button>
                </div>
                <div
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        style={{ fontWeight: 'normal', display: 'inline-block' }}
                        primary
                        onClick={() => window.location.assign('/tracuucongno')}
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    fontSize: '25px',
                                    color: '#4da1e8',
                                }}
                                icon={faDollarSign}
                            />
                        }
                    >
                        Tra cứu công nợ
                    </Button>
                </div>
                <div
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        style={{ fontWeight: 'normal', display: 'inline-block' }}
                        primary
                        onClick={() => window.location.assign('/thanhtoantructuyen')}
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    fontSize: '25px',
                                    color: '#4da1e8',
                                }}
                                icon={faFileInvoiceDollar}
                            />
                        }
                    >
                        Thanh toán online
                    </Button>
                </div>
                <div
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        style={{ fontWeight: 'normal', display: 'inline-block' }}
                        primary
                        onClick={() => window.location.assign('/phieutonghop')}
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    fontSize: '25px',
                                    color: '#4da1e8',
                                }}
                                icon={faFileInvoice}
                            />
                        }
                    >
                        Phiếu thu tổng hợp
                    </Button>
                </div>
                <div
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        style={{ fontWeight: 'normal', display: 'inline-block' }}
                        primary
                        onClick={() => window.location.assign('/lichtheotiendo')}
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    fontSize: '25px',
                                    color: '#4da1e8',
                                }}
                                icon={faCalendarMinus}
                            />
                        }
                    >
                        Lịch theo tiến độ
                    </Button>
                </div>
                <div
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        style={{ fontWeight: 'normal', display: 'inline-block' }}
                        primary
                        onClick={() => window.location.assign('/ghichunhacnho')}
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    fontSize: '25px',
                                    color: '#4da1e8',
                                }}
                                icon={faEnvelopeOpenText}
                            />
                        }
                    >
                        Nhắc nhở
                    </Button>
                </div>
            </div>
            <hr />
            <div className="grid col-12 surface-50 border-round p-0 m-0">
                <div className="col-4">
                    <div className="flex align-items-center justify-content-between mb-3">
                        <h2 className="mr-3">Thông tin sinh viên</h2>
                        <div>
                            <Select
                                defaultValue={selectedOption[0]} // Sử dụng defaultValue để đặt giá trị mặc định
                                onChange={handleChange}
                                options={optionmenu}
                                isSearchable={true}
                                placeholder="Chọn một option..."
                            />
                        </div>
                    </div>
                    <hr />

                    <div className="w-full">
                        <Chart chartType="Bar" data={data} className="w-full " width={'currentWidth'} />
                    </div>
                </div>
                <div className="col-4 ">
                    <div className="flex align-items-center justify-content-between mb-3">
                        <h2>Tiến độ học tập</h2>
                    </div>
                    <hr />
                    <div>
                        <Chart
                            chartType="PieChart"
                            data={data2}
                            options={options}
                            className="w-full"
                            width={'currentHeight'}
                        />
                    </div>
                </div>
                <div className="col-4 ">
                    <div className="flex align-items-center justify-content-between mb-3">
                        <h2>Lớp học phần</h2>
                        <div>
                            <Select
                                defaultValue={selectedOption[0]} // Sử dụng defaultValue để đặt giá trị mặc định
                                onChange={handleChange}
                                options={optionmenu}
                                isSearchable={true}
                                placeholder="Chọn một option..."
                            />
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div className="flex justify-content-between">
                            <p>Môn học</p>
                            <p>Số tín chỉ</p>
                        </div>
                        <Table_Home />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
