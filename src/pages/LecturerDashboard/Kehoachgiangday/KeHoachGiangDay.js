/* eslint-disable react/jsx-pascal-case */
import { useState } from 'react';
import styles from '~/pages/LecturerDashboard/Kehoachgiangday/Kehoachgiangday.module.scss';
import classNames from 'classnames/bind';
import { getRefId, getUserId } from '~/components/authentication/AuthUtils';
import { getListTermInfo } from '~/api/term/TermService';
import { useQuery } from '@tanstack/react-query';
import { Dropdown } from 'primereact/dropdown';
import { getListSectionClassInfo, getPageSectionClassInfo } from '~/api/section/SectionClassService';
import { dayInWeekOptions } from '~/pages/AdminDashboard/section-class/SectionClassConstant';

const cx = classNames.bind(styles);
const QueryKeyTerm = 'Term-Options';
const QueryKeySectionClassOptions = 'Section-Class-List-By-Lecturer';

const Kehoachgiangday = () => {
    const [selectedTerm, setSelectedTerm] = useState(null);

    // Use Query
    const { data: termOptions } = useQuery([QueryKeyTerm, getUserId()], () => getListTermInfo(getUserId()), {
        enabled: !!getUserId(),
    });

    const { data: sectionClassList } = useQuery(
        [QueryKeySectionClassOptions, getUserId(), selectedTerm],
        () =>
            getListSectionClassInfo(
                getUserId(),
                { lecturerId: getRefId(), termId: selectedTerm != null ? selectedTerm : null },
                null,
                true,
            ),
        { enabled: !!getUserId() && !!getRefId() },
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
                            <th rowSpan="1">STT</th>
                            <th style={{ width: '350px' }} rowSpan="1">
                                Lớp học phần
                            </th>
                            <th style={{ width: '200px' }} rowSpan="1">
                                Thời khóa biểu
                            </th>
                            <th style={{ width: '200px' }} rowSpan="1">
                                Giảng viên
                            </th>

                            <th style={{ width: '100px' }} colSpan="1">
                                Số sinh viên
                            </th>
                        </tr>
                    </thead>
                    {console.log(sectionClassList)}
                    <tbody>
                        {sectionClassList && sectionClassList?.length > 0 ? (
                            sectionClassList.map((sectionClass, idx) => (
                                <tr key={idx} className="text-800">
                                    <th style={{ height: '50px', width: '50px' }} rowSpan="1">
                                        {idx + 1}
                                    </th>
                                    <th style={{ width: '350px', color: '#00BFFF' }} rowSpan="1">
                                        {sectionClass.code}
                                    </th>
                                    <th style={{ width: '200px' }} rowSpan="1">
                                        {sectionClass?.timeAndPlaces && sectionClass.timeAndPlaces.length > 0
                                            ? sectionClass.timeAndPlaces.map((timeAndPlace, idx) => (
                                                  <div key={idx}>
                                                      {
                                                          dayInWeekOptions.find(
                                                              (day) => day.key === timeAndPlace.dayOfTheWeek,
                                                          ).label
                                                      }{' '}
                                                      (Tiết {timeAndPlace.periodStart} - {timeAndPlace.periodEnd})
                                                  </div>
                                              ))
                                            : ''}
                                    </th>
                                    <th style={{ width: '200px' }} rowSpan="1">
                                        {sectionClass.lecturerCode} - {sectionClass.lecturerName}
                                    </th>
                                    <th style={{ width: '100px' }} rowSpan="1">
                                        0
                                    </th>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <th colSpan="5">
                                    <p className="text-600">Hiện chưa có lớp đăng ký dạy nào trong học kỳ này</p>
                                </th>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Kehoachgiangday;
