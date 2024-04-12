/* eslint-disable react/jsx-pascal-case */
import { useState } from 'react';
import styles from '~/pages/LecturerDashboard/Kehoachgiangday/Kehoachgiangday.module.scss';
import classNames from 'classnames/bind';
import { getRefId, getUserId, getUserRole } from '~/components/authentication/AuthUtils';
import { getListTermInfo } from '~/api/term/TermService';
import { useQuery } from '@tanstack/react-query';
import { Dropdown } from 'primereact/dropdown';
import { UserRoles } from '~/App';
import { getListScheduleInfo } from '~/api/schedule/ScheduleSevice';

const cx = classNames.bind(styles);
const QueryKeyTerm = 'Term-Options';
const QueryKey = 'Schedule-List';

function Lichthiketthuchocphan() {
    const [selectedTerm, setSelectedTerm] = useState(null);

    // Use Query
    const { data: termOptions } = useQuery([QueryKeyTerm, getUserId()], () => getListTermInfo(getUserId()), {
        enabled: !!getUserId(),
    });

    const { data: scheduleDataList } = useQuery(
        [QueryKey, getUserId(), getRefId(), selectedTerm],
        () =>
            getListScheduleInfo(getUserId(), {
                lecturerId: getUserRole() === UserRoles.LECTURER ? getRefId() : null,
                scheduleType: 'test',
                // termId: selectedTerm,
            }),
        {
            enabled: !!getUserId() && !!getRefId(),
        },
    );

    return (
        <div className={cx('container')}>
            <div className="flex align-items-center justify-content-between">
                <h2 className="mb-0 text-primary">KẾ HOẠCH GIẢNG DẠY</h2>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="w-full">
                        <Dropdown
                            value={selectedTerm || null}
                            onChange={(e) => setSelectedTerm(e?.target.value)}
                            options={termOptions}
                            optionLabel="name"
                            optionValue="id"
                            filter
                            placeholder="Hãy chọn học kỳ"
                            className="w-full"
                        />
                    </span>
                </div>
            </div>
            <hr />
            <div className="w-full">
                <table border="1" className="w-full">
                    <thead>
                        <tr style={{ height: '50px', backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th style={{ height: '50px', width: '50px' }} rowSpan="1">
                                STT
                            </th>
                            <th style={{ width: '350px' }} rowSpan="1">
                                Mã học phần
                            </th>
                            <th style={{ width: '200px' }} rowSpan="1">
                                Lớp học phần
                            </th>
                            <th style={{ width: '100px' }} colSpan="1">
                                Ngày thi
                            </th>
                            <th style={{ width: '100px' }} colSpan="1">
                                Giờ thi
                            </th>
                            <th style={{ width: '100px' }} colSpan="1">
                                Phòng thi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {scheduleDataList && scheduleDataList?.length > 0 ? (
                            scheduleDataList.map((schedule, idx) => (
                                <tr key={idx} className="text-800">
                                    <th style={{ height: '50px', width: '50px' }} rowSpan="1">
                                        {idx + 1}
                                    </th>
                                    <th style={{ width: '350px', color: '#00BFFF' }} rowSpan="1">
                                        {schedule.sectionCode}
                                    </th>
                                    <th style={{ width: '350px', color: '#00BFFF' }} rowSpan="1">
                                        {schedule.sectionName} ({schedule.sectionClassCode})
                                    </th>
                                    <th style={{ width: '350px', color: '#00BFFF' }} rowSpan="1">
                                        {new Date(schedule.learningDate).toLocaleDateString()}
                                    </th>
                                    <th style={{ width: '350px', color: '#00BFFF' }} rowSpan="1">
                                        Tiết {schedule.periodStart} - {schedule.periodEnd}
                                    </th>
                                    <th style={{ width: '350px', color: '#00BFFF' }} rowSpan="1">
                                        {schedule.room}
                                    </th>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <th colSpan="7">
                                    <p className="text-600">Hiện chưa có lớp đăng ký dạy nào trong học kỳ này</p>
                                </th>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Lichthiketthuchocphan;
