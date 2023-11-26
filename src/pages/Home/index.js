/* eslint-disable react/jsx-pascal-case */
import Image from '~/components/Image';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell,
    faCalendarCheck,
    faCalendarDays,
    faCalendarMinus,
    faCalendarWeek,
    faChartColumn,
    faDollarSign,
    faEnvelopeOpenText,
    faFileInvoice,
    faFileInvoiceDollar,
    faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import Chart from 'react-google-charts';
import Table_Home from '~/components/Table';
import { useState } from 'react';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { getUserInfo } from '~/api/user/UserService';

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
        <div className={cx('wrapper')}>
            {console.log(userInfo)}
            <div className={cx('header')}>
                <div className={cx('information')}>
                    <h2 style={{ marginLeft: '10px' }}>Thông tin sinh viên</h2>
                    <p style={{ textAlign: 'center' }}>
                        ______________________________________________________________________________________________________________
                    </p>
                    <div className={cx('list-infor')}>
                        <div className={cx('image')}>
                            <Image src="https://i.imgur.com/FnS0hfi.jpg" className={cx('user-avata')} alt="name" />
                            <Button text>Xem chi tiết</Button>
                        </div>
                        <div className={cx('infor1')}>
                            <div className={cx('text')}>
                                <h4 style={{ color: 'rgba(22, 24, 35, 0.6)', fontWeight: 'normal' }}>MSSV:</h4>
                                <h4 style={{ marginLeft: '3px' }}>{userInfo?.code}</h4>
                            </div>
                            <div className={cx('text')}>
                                <h4 style={{ color: 'rgba(22, 24, 35, 0.6)', fontWeight: 'normal' }}>Họ tên:</h4>
                                <h4 style={{ marginLeft: '3px' }}>{userInfo?.firstName + ' ' + userInfo?.lastName}</h4>
                            </div>
                            <div className={cx('text')}>
                                <h4 style={{ color: 'rgba(22, 24, 35, 0.6)', fontWeight: 'normal' }}>Giới tính:</h4>
                                <h4 style={{ marginLeft: '3px' }}>{userInfo?.gender}</h4>
                            </div>
                            <div className={cx('text')}>
                                <h4 style={{ color: 'rgba(22, 24, 35, 0.6)', fontWeight: 'normal' }}>Ngày sinh:</h4>
                                <h4 style={{ marginLeft: '3px' }}>{userInfo?.dob}</h4>
                            </div>
                            <div className={cx('text')}>
                                <h4 style={{ color: 'rgba(22, 24, 35, 0.6)', fontWeight: 'normal' }}>Nơi sinh:</h4>
                                <h4 style={{ marginLeft: '3px' }}>{userInfo?.address?.formattedAddress}</h4>
                            </div>
                        </div>
                        <div className={cx('infor1')}>
                            <div className={cx('text')}>
                                <h4 style={{ color: 'rgba(22, 24, 35, 0.6)', fontWeight: 'normal' }}>Lớp học:</h4>
                                <h4 style={{ marginLeft: '3px' }}>{userInfo?.specificationClassName}</h4>
                            </div>
                            <div className={cx('text')}>
                                <h4 style={{ color: 'rgba(22, 24, 35, 0.6)', fontWeight: 'normal' }}>Khóa học:</h4>
                                <h4 style={{ marginLeft: '3px' }}>{userInfo?.academicYearName}</h4>
                            </div>
                            <div className={cx('text')}>
                                <h4 style={{ color: 'rgba(22, 24, 35, 0.6)', fontWeight: 'normal' }}>Bậc đào tạo:</h4>
                                <h4 style={{ marginLeft: '3px' }}>Đại học</h4>
                            </div>
                            <div className={cx('text')}>
                                <h4 style={{ color: 'rgba(22, 24, 35, 0.6)', fontWeight: 'normal' }}>
                                    Loại hình đào tạo:
                                </h4>
                                <h4 style={{ marginLeft: '3px' }}>{userInfo?.typeOfEducation}</h4>
                            </div>
                            <div className={cx('text')}>
                                <h4 style={{ color: 'rgba(22, 24, 35, 0.6)', fontWeight: 'normal' }}>Ngành:</h4>
                                <h4 style={{ marginLeft: '3px' }}>{userInfo?.specializationName}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('button')}>
                    <div style={{ width: '100%', height: '118px', borderRadius: '5px', backgroundColor: 'white' }}>
                        <div style={{ width: '100%', height: '10px' }}></div>
                        <div style={{ width: '100%', height: '20px' }}>
                            <h4 style={{ color: 'rgba(22, 24, 35, 0.6)', fontWeight: 'normal', marginLeft: '15px' }}>
                                Nhắc nhở mới, chưa xem
                            </h4>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    height: '58px',
                                    alignItems: 'center',
                                }}
                            >
                                <h4
                                    style={{
                                        color: 'rgba(22, 24, 35, 0.6)',
                                        fontWeight: 'normal',
                                        fontSize: '40px',
                                        marginLeft: '15px',
                                    }}
                                >
                                    0
                                </h4>
                                <div
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                        backgroundColor: 'white',
                                        borderRadius: '50%',
                                        border: '1.5px solid transparent',
                                        borderColor: 'rgba(22, 24, 35, 0.34)',
                                        textAlign: 'center',
                                        marginRight: '15px',
                                    }}
                                >
                                    <FontAwesomeIcon
                                        style={{ marginTop: '8px', color: 'rgba(22, 24, 35, 0.60)' }}
                                        icon={faBell}
                                    />
                                </div>
                            </div>
                            <Button text small>
                                Xem chi tiết
                            </Button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginTop: '20px' }}>
                        <div
                            style={{
                                width: '48%',
                                height: '110px',
                                borderRadius: '5px',
                                backgroundColor: '#e0fbff',
                            }}
                        >
                            <div style={{ width: '100%', height: '10px' }}></div>
                            <div style={{ width: '100%', height: '20px' }}>
                                <h4 style={{ color: '#4da1e8', fontWeight: 'normal', marginLeft: '15px' }}>
                                    Lịch học trong tuần
                                </h4>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        height: '50px',
                                        alignItems: 'center',
                                    }}
                                >
                                    <h4
                                        style={{
                                            color: '#4da1e8',
                                            fontWeight: 'normal',
                                            fontSize: '40px',
                                            marginLeft: '15px',
                                        }}
                                    >
                                        0
                                    </h4>
                                    <div
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            backgroundColor: '#e0fbff',
                                            borderRadius: '50%',
                                            border: '1.5px solid transparent',
                                            borderColor: '#4da1e8',
                                            textAlign: 'center',
                                            marginRight: '15px',
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            style={{ marginTop: '8px', color: '#4da1e8' }}
                                            icon={faCalendarWeek}
                                        />
                                    </div>
                                </div>
                                <Button
                                    style={{ backgroundColor: '#e0fbff', color: '#4da1e8', fontWeight: 'normal' }}
                                    text
                                    small
                                >
                                    Xem chi tiêt
                                </Button>
                            </div>
                        </div>
                        <div
                            style={{
                                width: '48%',
                                height: '110px',
                                borderRadius: '5px',
                                backgroundColor: '#fff2d4',
                                marginLeft: '20px',
                            }}
                        >
                            <div style={{ width: '100%', height: '10px' }}></div>
                            <div style={{ width: '100%', height: '20px' }}>
                                <h4 style={{ color: '#ff9205', fontWeight: 'normal', marginLeft: '15px' }}>
                                    Lịch thi trong tuần
                                </h4>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        height: '50px',
                                        alignItems: 'center',
                                    }}
                                >
                                    <h4
                                        style={{
                                            color: '#ff9205',
                                            fontWeight: 'normal',
                                            fontSize: '40px',
                                            marginLeft: '15px',
                                        }}
                                    >
                                        0
                                    </h4>
                                    <div
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            backgroundColor: '#fff2d4',
                                            borderRadius: '50%',
                                            border: '1.5px solid transparent',
                                            borderColor: '#ff9205',
                                            textAlign: 'center',
                                            marginRight: '15px',
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            style={{ marginTop: '8px', color: '#ff9205' }}
                                            icon={faCalendarCheck}
                                        />
                                    </div>
                                </div>
                                <Button
                                    style={{ backgroundColor: '#fff2d4', color: '#ff9205', fontWeight: 'normal' }}
                                    text
                                    small
                                >
                                    Xem chi tiêt
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('center')}>
                <div
                    style={{
                        height: '135px',
                        width: '130px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        style={{ fontWeight: 'normal', display: 'inline-block', marginTop: '25px' }}
                        primary
                        to="/lichhoc"
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    marginBottom: '20px',
                                    marginLeft: '35px',
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
                        height: '135px',
                        width: '130px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        style={{
                            fontWeight: 'normal',
                            display: 'inline-block',
                            marginTop: '25px',
                        }}
                        to="/ketquahoctap"
                        primary
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    marginBottom: '20px',
                                    marginLeft: '35px',
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
                        height: '135px',
                        width: '130px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        style={{ fontWeight: 'normal', display: 'inline-block', marginTop: '25px' }}
                        primary
                        to="/dangkyhocphan"
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    marginBottom: '20px',
                                    marginLeft: '35px',
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
                        height: '135px',
                        width: '130px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        style={{ fontWeight: 'normal', display: 'inline-block', marginTop: '25px' }}
                        primary
                        to="/tracuucongno"
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    marginBottom: '20px',
                                    marginLeft: '40px',
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
                        height: '135px',
                        width: '130px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        style={{ fontWeight: 'normal', display: 'inline-block', marginTop: '25px' }}
                        primary
                        to="/thanhtoantructuyen"
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    marginBottom: '20px',
                                    marginLeft: '40px',
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
                        height: '135px',
                        width: '130px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        style={{ fontWeight: 'normal', display: 'inline-block', marginTop: '25px' }}
                        primary
                        to="/phieutonghop"
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    marginBottom: '20px',
                                    marginLeft: '40px',
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
                        height: '135px',
                        width: '130px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        style={{ fontWeight: 'normal', display: 'inline-block', marginTop: '25px' }}
                        primary
                        to="/lichtheotiendo"
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    marginBottom: '20px',
                                    marginLeft: '35px',
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
                        height: '135px',
                        width: '130px',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        style={{ fontWeight: 'normal', display: 'inline-block', marginTop: '25px' }}
                        primary
                        to="/ghichunhacnho"
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    marginBottom: '20px',
                                    marginLeft: '35px',
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
            <div className={cx('footer')}>
                <div style={{ width: '40%', backgroundColor: 'white', borderRadius: '5px' }}>
                    <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                        <h2 style={{ marginLeft: '10px' }}>Thông tin sinh viên</h2>
                        <div style={{ width: '150px', height: '30px', marginRight: '15px' }}>
                            <Select
                                defaultValue={selectedOption[0]} // Sử dụng defaultValue để đặt giá trị mặc định
                                onChange={handleChange}
                                options={optionmenu}
                                isSearchable={true}
                                placeholder="Chọn một option..."
                                maxMenuHeight={250}
                            />
                        </div>
                    </div>
                    <p style={{ textAlign: 'center' }}>
                        ________________________________________________________________________
                    </p>
                    <div
                        style={{
                            width: '95%',
                            height: '250px',
                            marginTop: '10px',
                            marginLeft: '10px',
                        }}
                    >
                        <Chart chartType="Bar" data={data} width="100%" height="100%" />
                    </div>
                </div>
                <div style={{ width: '25%', backgroundColor: 'white', borderRadius: '5px', marginLeft: '20px' }}>
                    <h2 style={{ height: '10%', marginTop: '10px', marginLeft: '15px' }}>Tiến độ học tập</h2>
                    <p style={{ textAlign: 'center' }}>_____________________________________________</p>
                    <div style={{ height: '80%', width: '99%' }}>
                        <Chart chartType="PieChart" data={data2} options={options} width={'100%'} height={'100%'} />
                    </div>
                </div>
                <div style={{ width: '31.5%', backgroundColor: 'white', borderRadius: '5px', marginLeft: '20px' }}>
                    <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                        <h2 style={{ marginLeft: '10px' }}>Lớp học phần</h2>
                        <div style={{ width: '150px', height: '30px', marginRight: '15px', position: 'relative' }}>
                            <Select
                                style={{ zIndex: 9999 }}
                                defaultValue={selectedOption[0]} // Sử dụng defaultValue để đặt giá trị mặc định
                                onChange={handleChange}
                                options={optionmenu}
                                isSearchable={true}
                                placeholder="Chọn một option..."
                                maxMenuHeight={250}
                            />
                        </div>
                    </div>
                    <p style={{ textAlign: 'center' }}>________________________________________________________</p>
                    <div style={{ height: '81%', width: '99%' }}>
                        <div
                            style={{
                                width: '95% ',
                                height: '20px',
                                marginLeft: '12px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: '10px',
                            }}
                        >
                            <p style={{ marginLeft: '15px', fontSize: '14px' }}>Môn học</p>
                            <p style={{ marginRight: '17px', fontSize: '14px' }}>Số tín chỉ</p>
                        </div>
                        <Table_Home />
                    </div>
                </div>
            </div>
            <div style={{ height: '20px', width: '100%', backgroundColor: 'rgba(174, 171, 171, 0)' }}></div>
        </div>
    );
}

export default Home;
