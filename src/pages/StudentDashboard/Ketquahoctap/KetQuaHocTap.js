import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UserRoles } from '~/App';
import { getListRegistration } from '~/api/registration/RegistrationService';
import { getListStudentSectionInfo } from '~/api/section/SectionService';
import { getRefId, getUserId, getUserRole } from '~/components/authentication/AuthUtils';
const QueryKeySectionStudent = 'Regitrations';
function Ketquahoctap() {
    const { data: sectionStudentList, refetch } = useQuery(
        [QueryKeySectionStudent, getUserId()],
        () =>
            getListStudentSectionInfo(getUserId(), {
                studentId: getUserRole() === UserRoles.STUDENT ? getRefId() : null,
            }),
        {
            enabled: !!getRefId(),
        },
    );

    const termListGroup = useMemo(() => {
        let list = new Set();
        if (sectionStudentList && sectionStudentList?.length > 0) {
            sectionStudentList.forEach((sectionStudent) => {
                list.add(sectionStudent.termName);
            });
            return Array.from(list);
        }

        return [];
    }, [sectionStudentList]);

    return (
        <div>
            {console.log(sectionStudentList)}
            <div>
                <h1>Kết quả học tập</h1>
                <hr />
            </div>
            <div>
                <table border="1" className="w-full">
                    <thead>
                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th style={{ height: '150px' }} rowSpan="3">
                                STT
                            </th>
                            <th rowSpan="3">Tên môn học/học phần</th>
                            <th rowSpan="3">Số tín chỉ</th>
                            <th style={{ height: '50px' }} colSpan="3">
                                Giữa kì
                            </th>
                            <th colSpan="5">Điểm thường kỳ</th>
                            <th colSpan="2">Thực hành</th>
                            <th rowSpan="3">Cuối kỳ</th>
                            <th rowSpan="3">Điểm tổng kết</th>
                            <th rowSpan="3">Thang điểm 4</th>
                            <th rowSpan="3">Xếp loại</th>
                            <th style={{ width: '20px' }} rowSpan="3">
                                Đạt
                            </th>
                        </tr>
                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th style={{ width: '50px' }} rowSpan="2">
                                1
                            </th>
                            <th style={{ width: '50px' }} rowSpan="2">
                                2
                            </th>
                            <th style={{ width: '50px' }} rowSpan="2">
                                3
                            </th>
                            <th colSpan="5">LT Hệ số 1</th>
                            <th style={{ width: '40px' }} rowSpan="2">
                                1
                            </th>
                            <th style={{ width: '40px' }} rowSpan="2">
                                2
                            </th>
                        </tr>
                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th style={{ width: '50px', height: '50px' }} rowSpan="1">
                                1
                            </th>
                            <th style={{ width: '50px', height: '50px' }} rowSpan="1">
                                2
                            </th>
                            <th style={{ width: '50px', height: '50px' }} rowSpan="1">
                                3
                            </th>
                            <th style={{ width: '50px', height: '50px' }} rowSpan="1">
                                4
                            </th>
                            <th style={{ width: '50px', height: '50px' }} rowSpan="1">
                                5
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {termListGroup &&
                            termListGroup?.length > 0 &&
                            termListGroup.map((term) => {
                                return (
                                    <>
                                        <tr>
                                            <td colSpan="28" className="font-semibold text-primary pl-2 text-xl">
                                                {term}
                                            </td>
                                        </tr>
                                        {sectionStudentList &&
                                            sectionStudentList?.length > 0 &&
                                            sectionStudentList
                                                .filter((sectionStudent) => sectionStudent.termName === term)
                                                .map((sectionStudent, idx) => {
                                                    return (
                                                        <tr key={idx} className="text-center">
                                                            <td>{idx + 1}</td>
                                                            <td>{sectionStudent.sectionName}</td>
                                                            <td>{sectionStudent.credits}</td>
                                                            <td>{sectionStudent.midtermPoint1 || '-'}</td>
                                                            <td>{sectionStudent.midtermPoint2 || '-'}</td>
                                                            <td>{sectionStudent.midtermPoint3 || '-'}</td>
                                                            <td>{sectionStudent.regularPoint1 || '-'}</td>
                                                            <td>{sectionStudent.regularPoint2 || '-'}</td>
                                                            <td>{sectionStudent.regularPoint3 || '-'}</td>
                                                            <td>{sectionStudent.regularPoint4 || '-'}</td>
                                                            <td>{sectionStudent.regularPoint5 || '-'}</td>
                                                            <td>{sectionStudent.practicePoint1 || '-'}</td>
                                                            <td>{sectionStudent.practicePoint2 || '-'}</td>
                                                            <td>{sectionStudent.finalPoint || '-'}</td>
                                                            <td>
                                                                {!sectionStudent?.totalPoint
                                                                    ? ''
                                                                    : sectionStudent.totalPoint.toFixed(2)}
                                                            </td>
                                                            <td>
                                                                {!sectionStudent?.totalPoint
                                                                    ? ''
                                                                    : (sectionStudent.totalPoint * (4 / 10)).toFixed(2)}
                                                            </td>
                                                            <td>
                                                                {!sectionStudent?.totalPoint
                                                                    ? ''
                                                                    : sectionStudent.totalPoint < 3
                                                                    ? 'Yếu'
                                                                    : sectionStudent.totalPoint < 5
                                                                    ? 'Trung bình yếu'
                                                                    : sectionStudent.totalPoint < 6
                                                                    ? 'Trung bình'
                                                                    : sectionStudent.totalPoint < 8
                                                                    ? 'Khá'
                                                                    : sectionStudent.totalPoint < 9
                                                                    ? 'Giỏi'
                                                                    : sectionStudent.totalPoint <= 10
                                                                    ? 'Xuất sắc'
                                                                    : ''}
                                                            </td>
                                                            <td>
                                                                <div className="p-2">
                                                                    {sectionStudent.totalPoint >= 4 ? (
                                                                        <i className="text-white pi pi-check p-2 border-circle bg-green-300"></i>
                                                                    ) : (
                                                                        <i className="text-white pi pi-times p-2 border-circle bg-red-300"></i>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                    </>
                                );
                            })}
                    </tbody>

                    {/* <tr>
                        <td colSpan="6">Điểm trung bình học kỳ hệ 10: 6,30</td>
                        <td colSpan="6">Điểm trung bình học kỳ hệ 4: 2,21</td>
                        <td colSpan="24"></td>
                     </tr>
                    <tr>
                        <td colSpan="6">Điểm trung bình tích lũy: 7,10</td>
                        <td colSpan="6">Điểm trung bình tích lũy (hệ 4): 2,80</td>
                        <td colSpan="24"></td>
                    </tr>
                    <tr>
                        <td colSpan="6">Tổng số tín chỉ đã đăng ký: 114</td>
                        <td colSpan="6">Tổng số tín chỉ tích lũy: 110</td>
                        <td colSpan="24"></td>
                    </tr>
                    <tr>
                        <td colSpan="6">Tổng số tín chỉ đạt: 12</td>
                        <td colSpan="6">Tổng số tín chỉ nợ tính đến hiện tại: 4</td>
                        <td colSpan="24"></td>
                    </tr>
                    <tr>
                        <td colSpan="6">Xếp loại học lực tích lũy: Khá</td>
                        <td colSpan="6">Xếp loại học lực học kỳ: Trung bình</td>
                        <td colSpan="24"></td>
                    </tr> */}
                </table>
            </div>
        </div>
    );
}

export default Ketquahoctap;
