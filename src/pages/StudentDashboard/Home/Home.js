/* eslint-disable react/jsx-pascal-case */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faChartColumn, faDollarSign, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { getRefId, getUserId } from '~/components/authentication/AuthUtils';
import { getUserInfo } from '~/api/user/UserService';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import PieChartDemo from '~/components/chart/ProgressChart';
import { getListStudentProgramInfo } from '~/api/program/ProgramSevice';
import { useMemo } from 'react';

const QueryKey = 'Home';
const Home = () => {
    const { data: userInfo } = useQuery([QueryKey, getUserId()], () => getUserInfo(getUserId(), getUserId()), {
        enabled: !!getUserId(),
    });

    // Use Query
    const { data: programData } = useQuery(
        [QueryKey, getRefId()],
        () => getListStudentProgramInfo(getUserId(), getRefId()),
        {
            enabled: !!getUserId() && !!getRefId(),
        },
    );

    const creditData = useMemo(() => {
        let total = 0; // Total
        let learned = 0;
        let left = 0;
        if (programData) {
            const termList = [...programData?.program?.programTerms];
            let courseLeft = [...programData?.courses];

            if (termList && termList?.length > 0) {
                for (let i = 0; i < termList?.length; i++) {
                    if (termList[i].programCompulsoryCourses?.length > 0) {
                        for (let j = 0; j < termList[i].programCompulsoryCourses?.length; j++) {
                            total += termList[i].programCompulsoryCourses[j].credits;

                            if (courseLeft.some((course) => termList[i].programCompulsoryCourses[j].id === course.id)) {
                                learned += termList[i].programCompulsoryCourses[j].credits;
                            }
                        }
                    }

                    if (termList[i].programElectiveCourses?.length > 0) {
                        total += termList[i].minimumElective;

                        if (
                            courseLeft.some((course) =>
                                termList[i].programElectiveCourses.some(
                                    (courseElective) => courseElective === course.id,
                                ),
                            )
                        ) {
                            learned += termList[i].minimumElective;
                        }
                    }
                }
            }

            return {
                learned: learned,
                left: total - learned,
            };
        }

        return {};
    }, [programData]);

    return (
        <div className="w-full mt-3">
            <div className="col-12 flex flex-wrap align-items-stretch p-0 mb-3 surface-50 border-round-xl">
                <div className="xs:col-6 sm:col-6 md:col-6 col-12 h-full">
                    <h2>
                        <i className="pi pi-user mr-2"></i>Thông tin sinh viên
                        <hr />
                    </h2>
                    <div className="flex flex-column align-items-center justify-content-center col-12">
                        <Avatar className="bg-primary text-white" icon="pi pi-user" size="xlarge" shape="circle" />
                        <Button className="my-2" text label="Xem chi tiết" />
                    </div>
                    <div className="flex align-items-center h-full">
                        <div className="flex justify-content-around align-items-end col-12">
                            <div className="">
                                <span className="mb-2 flex align-items-center">
                                    <h3 className="text-primary m-0 text-600 font-semibold mr-2">MSSV:</h3>
                                    <p className="m-0">{userInfo?.code}</p>
                                </span>
                                <span className="mb-2 flex align-items-center">
                                    <h3 className="text-primary m-0 text-600 font-semibold mr-2">Họ tên:</h3>
                                    <p className="m-0">
                                        {userInfo?.lastName ? userInfo.lastName : ''}{' '}
                                        {userInfo?.firstName ? userInfo.firstName : ' '}
                                    </p>
                                </span>
                                <span className="mb-2 flex align-items-center">
                                    <h3 className="text-primary m-0 text-600 font-semibold mr-2">Giới tính:</h3>
                                    <p className="m-0">
                                        {userInfo?.gender === 'unknown'
                                            ? 'Chưa đặt'
                                            : userInfo?.gender === 'male'
                                            ? 'Nam'
                                            : userInfo?.gender === 'female'
                                            ? 'Nữ'
                                            : '-'}
                                    </p>
                                </span>
                                <span className="mb-2 flex align-items-center">
                                    <h3 className="text-primary m-0 text-600 font-semibold mr-2">Ngày sinh:</h3>
                                    <p className="m-0">{userInfo?.dob}</p>
                                </span>
                                <span className="mb-2 flex align-items-center">
                                    <h3 className="text-primary m-0 text-600 font-semibold mr-2">Nơi sinh:</h3>
                                    <p className="m-0">{userInfo?.provinceName}</p>
                                </span>
                            </div>
                            <div className="">
                                <span className="mb-2 flex align-items-center">
                                    <h3 className="text-primary m-0 text-600 font-semibold mr-2">Lớp học:</h3>
                                    <p className="m-0">{userInfo?.specializationClassName}</p>
                                </span>
                                <span className="mb-2 flex align-items-center">
                                    <h3 className="text-primary m-0 text-600 font-semibold mr-2">Khóa học:</h3>
                                    <p className="m-0">{userInfo?.schoolYear}</p>
                                </span>
                                <span className="mb-2 flex align-items-center">
                                    <h3 className="text-primary m-0 text-600 font-semibold mr-2">Bậc đào tạo:</h3>
                                    <p className="m-0">Đại học</p>
                                </span>
                                <span className="mb-2 flex align-items-center">
                                    <h3 className="text-primary m-0 text-600 font-semibold mr-2">Loại hình đào tạo:</h3>
                                    <p className="m-0">
                                        {userInfo?.typeOfEducation === 'general_program'
                                            ? 'Hệ đại trà'
                                            : userInfo?.typeOfEducation === 'high_quality_program'
                                            ? 'Hệ chất lượng cao'
                                            : '-'}
                                    </p>
                                </span>
                                <span className="mb-2 flex align-items-center">
                                    <h3 className="text-primary m-0 text-600 font-semibold mr-2">Ngành:</h3>
                                    <p className="m-0">{userInfo?.specializationName}</p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xs:col-6 sm:col-6 md:col-6 col-12 h-full">
                    <h2>
                        <i className="pi pi-bell mr-2"></i>Tiến độ học tập
                        <hr />
                    </h2>
                    <div className="h-full flex flex-column col-12 p-0 m-0 justify-content-around gap-2 align-items-center">
                        {/* <div className="col-12 bg-blue-100 border-round flex flex-column align-items-center">
                            <h2 className="flex align-items-center text-blue-400">
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
                        <div className="col-12 bg-orange-100 border-round flex flex-column align-items-center">
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
                        </div> */}
                        {console.log(creditData)}
                        {console.log(programData)}
                        <PieChartDemo data={creditData} />
                    </div>
                </div>
            </div>
            <div className="grid align-items-stretch justify-content-start gap-2 w-full m-0">
                <div
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        label=" Lịch theo tuần"
                        icon="pi pi-calendar"
                        style={{ fontWeight: 'normal' }}
                        primary
                        onClick={() => window.location.assign('/lichhoc')}
                    />
                </div>
                <div
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        label="Kết quả học tập"
                        style={{
                            fontWeight: 'normal',
                        }}
                        onClick={() => window.location.assign('/ketquahoctap')}
                        primary
                        icon="pi pi-chart-bar"
                    />
                </div>
                <div
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        style={{ fontWeight: 'normal' }}
                        primary
                        label="Đăng kí học phần"
                        icon="pi pi-calendar-plus"
                        onClick={() => window.location.assign('/dangkyhocphan')}
                    />
                </div>
                <div
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        style={{ fontWeight: 'normal' }}
                        primary
                        onClick={() => window.location.assign('/tracuucongno')}
                        label="Tra cứu công nợ"
                        icon="pi pi-dollar"
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    fontSize: '10rem',
                                    color: '#4da1e8',
                                }}
                                icon={faDollarSign}
                            />
                        }
                    />
                </div>
                <div
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        style={{ fontWeight: 'normal' }}
                        primary
                        icon="pi pi-book"
                        label="Chương trình khung"
                        onClick={() => window.location.assign('/chuongtrinhkhung')}
                        s
                    />
                </div>
                {/* <div
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Button
                        style={{ fontWeight: 'normal' }}
                        primary
                        onClick={() => window.location.assign('/thanhtoantructuyen')}
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    fontSize: '10rem',
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
                        style={{ fontWeight: 'normal' }}
                        primary
                        onClick={() => window.location.assign('/phieutonghop')}
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    fontSize: '10rem',
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
                        style={{ fontWeight: 'normal' }}
                        primary
                        onClick={() => window.location.assign('/lichtheotiendo')}
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    fontSize: '10rem',
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
                        style={{ fontWeight: 'normal' }}
                        primary
                        onClick={() => window.location.assign('/ghichunhacnho')}
                        leftIcon={
                            <FontAwesomeIcon
                                style={{
                                    fontSize: '10rem',
                                    color: '#4da1e8',
                                }}
                                icon={faEnvelopeOpenText}
                            />
                        }
                    >
                        Nhắc nhở
                    </Button>
                </div> */}
            </div>
        </div>
    );
};

export default Home;
