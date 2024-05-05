import styles from '~/pages/LecturerDashboard/Thongtinlophocphan/Thongtinlophocphan.module.scss';
import classNames from 'classnames/bind';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, { useMemo } from 'react';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { useQuery } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { getSectionClassInfo } from '~/api/section/SectionClassService';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

const QueryKey = 'SectionClass-Info';
function Thongtinlophocphan() {
    const { id: idString } = useParams();
    const id = useMemo(() => {
        return !!idString ? parseInt(idString) : null;
    }, [idString]);
    const [tabIndex, setTabIndex] = React.useState('1');

    const handleChange = (index) => {
        setTabIndex(index);
    };

    const { data: sectionClassInfo } = useQuery([QueryKey, getUserId()], () => getSectionClassInfo(getUserId(), id), {
        enabled: !!getUserId() && !!id,
    });

    const studentData = [
        { maSinhVien: '123456', ngaySinh: '12/02/2001', hoTen: 'Hoàng Đức', lop: 'DHKTPM15A' },
        { maSinhVien: '123457', ngaySinh: '13/02/2001', hoTen: 'Nguyễn Văn A', lop: 'DHKTPM15A' },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <div>
                        <h2>THÔNG TIN LỚP HỌC PHẦN</h2>
                    </div>
                </div>
                <hr />
                <div className="col-12">
                    <div className="p-inputgroup flex-1 flex justify-content-end">
                        <Button label="In ấn" icon="pi pi-print" />
                        {/* <Button label="Gửi tin nhắn đến SV của lớp" icon="pi pi-send" /> */}
                        <Button
                            label="Xử lý điểm quá trình học tập"
                            icon="pi pi-calculator"
                            onClick={() => window.location.assign(`/quanlydiemquatrinhhoctap/${sectionClassInfo.id}`)}
                        />
                        {/* <Button label="Danh sách lớp giảng dạy" icon="pi pi-bars" /> */}
                    </div>
                </div>
                <TabContext value={tabIndex}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={(e, idx) => handleChange(idx)} aria-label="lab API tabs example">
                            <Tab label="Thông tin về lớp học phần" value="1" />
                            <Tab label="Danh sách sinh viên" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <div className="w-full">
                            <Fieldset legend="Thông tin lớp học phần" className="mb-3">
                                <div className="flex align-items-center w-full">
                                    <div className="col-4">
                                        <p>Mã lớp học phần:</p>
                                    </div>
                                    <div className="col-8">
                                        <p
                                            style={{
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {sectionClassInfo?.code}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex align-items-center w-full">
                                    <div className="col-4">
                                        <p>Tên lớp học phần:</p>
                                    </div>
                                    <div className="col-8">
                                        <p
                                            style={{
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {sectionClassInfo?.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex align-items-center w-full">
                                    <div className="col-4">
                                        <p>Giảng viên phụ trách:</p>
                                    </div>
                                    <div className="col-8">
                                        <p
                                            style={{
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {sectionClassInfo?.lecturerName}
                                        </p>
                                    </div>
                                </div>
                            </Fieldset>
                            <Fieldset legend="Thông tin thời gian và lịch học">
                                {sectionClassInfo?.timeAndPlaces?.length > 0 &&
                                    sectionClassInfo?.timeAndPlaces.map((timeAndPlace, idx) => {
                                        return (
                                            <div key={idx} className="surface-50 border-round-xl col-12">
                                                <div className="flex align-items-center w-full">
                                                    <div className="col-4">
                                                        <p>Tiết học:</p>
                                                    </div>
                                                    <div className="col-8">
                                                        <p
                                                            style={{
                                                                fontWeight: 'bold',
                                                            }}
                                                        >
                                                            {timeAndPlace?.periodStart} - {timeAndPlace?.periodEnd}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex align-items-center w-full">
                                                    <div className="col-4">
                                                        <p>Phòng học:</p>
                                                    </div>
                                                    <div className="col-8">
                                                        <p
                                                            style={{
                                                                fontWeight: 'bold',
                                                            }}
                                                        >
                                                            {timeAndPlace?.room}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </Fieldset>
                        </div>
                    </TabPanel>
                    <TabPanel value="2">
                        <div className="sutface-50 border-round-xl col-12">
                            <div className="flex align-items-center w-full">
                                <div className="col-4">
                                    <p>Tên lớp học phần:</p>
                                </div>
                                <div className="col-8">
                                    <p
                                        style={{
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {sectionClassInfo?.name}
                                    </p>
                                </div>
                            </div>
                            <div className="flex align-items-center w-full">
                                <div className="col-4">
                                    <p>Giảng viên phụ trách:</p>
                                </div>
                                <div className="col-8">
                                    <p
                                        style={{
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {sectionClassInfo?.lecturerName}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <p style={{ fontWeight: 'bold' }}>Danh sách sinh viên</p>
                            <table style={{ marginLeft: '15px', marginTop: '10px' }} border="1" width={1160}>
                                <thead>
                                    <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                                        <th style={{ height: '50px', width: '50px' }} rowSpan="1">
                                            STT
                                        </th>
                                        <th style={{ width: '200px' }} rowSpan="1">
                                            Mã số sinh viên
                                        </th>

                                        <th style={{ width: '350px' }} rowSpan="1">
                                            Họ và tên
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sectionClassInfo?.students &&
                                        sectionClassInfo.students?.length > 0 &&
                                        sectionClassInfo.students.map((student, index) => (
                                            <tr key={index}>
                                                <th style={{ height: '35px', width: '50px' }}>{index + 1}</th>
                                                <th style={{ width: '200px' }}>{student.studentCode}</th>
                                                <th style={{ width: '350px' }}>{student.studentName}</th>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </TabPanel>
                </TabContext>
            </div>
        </div>
    );
}

export default Thongtinlophocphan;
