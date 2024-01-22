import styles from './Dangkyhocphan.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useState } from 'react';
import Select from 'react-select';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRefId, getUserId } from '~/components/authentication/AuthUtils';
import { getListTermInfo } from '~/api/term/TermService';
import { Dropdown } from 'primereact/dropdown';
import { getListSectionInfo } from '~/api/section/SectionService';
import { getListSectionClassInfo, registerGenericSectionClass } from '~/api/section/SectionClassService';
import { showNotification } from '~/components/notification/NotificationService';
import { HTTP_STATUS_OK } from '~/utils/Constants';

const cx = classNames.bind(styles);

const courses = [
    {
        id: 1,
        name: 'HỌC MỚI',
    },
    {
        id: 2,
        name: 'HỌC LẠI',
    },
    {
        id: 3,
        name: 'HỌC CẢI THIỆN',
    },
];

const QueryKeyTerm = 'Term-Register-Options';
const QueryKeySection = 'Section-Register';
const QueryKeySectionClass = 'Section-Class-Register';
const QueryKeySectionClassStudent = 'Section-Class-Student-Register';

function Dangkyhocphan() {
    const { data: termOptions } = useQuery([QueryKeyTerm, getUserId()], () => getListTermInfo(getUserId()), {
        enabled: !!getUserId(),
    });

    const [selectedTerm, setSelectedTerm] = useState(termOptions && termOptions[0] ? termOptions[0]?.id : null);

    const { data: sectionList } = useQuery(
        [QueryKeySection, getUserId(), selectedTerm],
        () => getListSectionInfo(getUserId(), { termId: selectedTerm }),
        {
            enabled: !!getUserId() && !!selectedTerm,
        },
    );

    const [selectedUpperTableRow, setSelectedUpperTableRow] = useState(null);

    const { data: sectionClassTheoryList } = useQuery(
        [QueryKeySectionClass, getUserId(), selectedUpperTableRow?.id],
        () =>
            getListSectionClassInfo(getUserId(), { sectionId: selectedUpperTableRow?.id, sectionClassType: 'theory' }),
        {
            enabled: !!getUserId() && !!selectedUpperTableRow,
        },
    );

    const [selectedLowerTableRow, setSelectedLowerTableRow] = useState(null);

    const { data: sectionClassList } = useQuery(
        [QueryKeySectionClass, getUserId(), selectedLowerTableRow?.id],
        () =>
            getListSectionClassInfo(getUserId(), {
                sectionId: selectedLowerTableRow?.id,
                lecturerId: selectedLowerTableRow?.lecturerId,
            }),
        {
            enabled: !!getUserId() && !!selectedLowerTableRow?.id,
        },
    );

    const [selectedCourse, setSelectedCourse] = useState(courses[0]);

    const handleChange = useCallback((selectedTerm) => {
        setSelectedTerm(selectedTerm);

        const selectedCourseId = selectedTerm.value;
        const matchingCourse = courses.find((course) => course.id === selectedCourseId);

        if (matchingCourse) {
            setSelectedCourse(matchingCourse);
        }
    }, []);

    const handleCourseChange = (course) => {
        setSelectedCourse(course);
    };

    // Section Select
    const handleUpperTableSelect = (row) => {
        setSelectedUpperTableRow(row);
    };

    const handleLowerTableSelect = (row) => {
        setSelectedLowerTableRow(row);
    };

    const { data: sectionClassStudentList, refetch } = useQuery(
        [QueryKeySectionClassStudent, getUserId()],
        () =>
            getListSectionClassInfo(getUserId(), {
                sectionId: selectedLowerTableRow?.id,
                lecturerId: selectedLowerTableRow?.lecturerId,
                studentId: getRefId(),
            }),
        {
            enabled: !!getUserId() && !!getRefId() && !!selectedLowerTableRow?.id,
        },
    );

    const { mutate } = useMutation((toPostData) => registerGenericSectionClass(getUserId(), toPostData), {
        onSuccess: (data) => {
            if (!!data && data === HTTP_STATUS_OK) {
                showNotification('success', 'Success', 'Register Successfully !!');
                refetch();
            }
        },
    });

    const handleOnSubmit = useCallback(() => {
        if (sectionClassList && !!selectedLowerTableRow) {
            let toPostData = {
                sectionId: selectedLowerTableRow?.sectionId,
                lecturerId: selectedLowerTableRow?.lecturerId,
                studentId: getRefId(),
            };

            mutate(toPostData);
        }
    }, [mutate, sectionClassList, selectedLowerTableRow]);

    return (
        <div className={cx('wrapper')}>
            <div style={{}}>
                <div
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        marginTop: '15px',
                    }}
                >
                    <h1 style={{ color: '#006994' }}>ĐĂNG KÝ HỌC PHẦN</h1>
                </div>
                <div
                    style={{
                        width: '80%',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: '180px',
                        marginTop: '15px',
                    }}
                >
                    <p style={{ fontSize: '15px', fontWeight: 'bold', marginRight: '25px' }}>Đợt đăng kí</p>
                    {termOptions && (
                        <div style={{ width: '180px' }}>
                            <Dropdown
                                className="p-2"
                                value={selectedTerm || (!!termOptions[0] && termOptions[0].id)}
                                onChange={(e) => handleChange(e?.target?.value)}
                                options={termOptions}
                                optionLabel="name"
                                optionValue="id"
                                isSearchable={true}
                                placeholder="Chọn một option..."
                                maxMenuHeight={250}
                            />
                        </div>
                    )}
                    <div style={{ display: 'flex' }}>
                        {courses.map((course) => (
                            <div style={{ color: 'red', fontSize: '15px', fontWeight: 'bold' }} key={course.id}>
                                <input
                                    style={{ marginLeft: '15px', marginTop: '8px' }}
                                    type="radio"
                                    checked={selectedCourse.id === course.id}
                                    onChange={() => handleCourseChange(course)}
                                />
                                {course.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        marginTop: '25px',
                    }}
                >
                    <p style={{ fontSize: '17px', fontWeight: 'bold', color: '#FF8C00' }}>
                        MÔN HỌC PHẦN ĐANG CHỜ ĐĂNG KÍ
                    </p>
                </div>
                <div style={{ width: '98%', marginLeft: '12px', marginTop: '25px' }}>
                    <table border="1" width={1125}>
                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th style={{ height: '50px', width: '35px' }} rowSpan="1"></th>
                            <th rowSpan="1">ID</th>
                            <th rowSpan="1">Mã HP</th>
                            <th rowSpan="1">Tên môn học</th>
                            <th rowSpan="1">TC</th>
                            <th rowSpan="1">Bắt buộc</th>
                            <th style={{ width: '200px' }} rowSpan="1">
                                Học phần: học trước (a), tiên quyết (b), song hành (c)
                            </th>
                        </tr>
                        {sectionList &&
                            sectionList?.length > 0 &&
                            sectionList.map((rowData) => (
                                <tr key={rowData.id} onClick={() => handleUpperTableSelect(rowData)}>
                                    <th>
                                        <input
                                            type="radio"
                                            checked={selectedUpperTableRow && selectedUpperTableRow.id === rowData.id}
                                        />
                                    </th>
                                    <th style={{ height: '30px' }}>{rowData.id}</th>
                                    <th>{rowData.code}</th>
                                    <th>{rowData.name}</th>
                                    <th>{rowData.credit}</th>
                                    <th>
                                        {rowData.sectionType === 'elective' ? (
                                            <FontAwesomeIcon
                                                style={{ color: 'green', fontSize: '20px' }}
                                                icon={faCircleCheck}
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                style={{ color: 'red', fontSize: '20px' }}
                                                icon={faCircleXmark}
                                            />
                                        )}
                                    </th>
                                    <th>
                                        {rowData.requireCourse &&
                                            rowData?.requireCourse?.length > 0 &&
                                            rowData?.requireCourse?.map((courseId) => {
                                                return courseId + '(b),';
                                            })}
                                    </th>
                                </tr>
                            ))}
                    </table>
                </div>
                <div
                    style={{
                        width: '100%',
                        marginTop: '25px',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <p style={{ fontSize: '17px', fontWeight: 'bold', color: '#FF8C00' }}>LỚP HỌC PHẦN CHỜ ĐĂNG KÝ</p>
                    {/* <div style={{ display: 'flex' }}>
                        {trunglichs.map((trunglich) => (
                            <div style={{ color: 'red', fontSize: '15px', fontWeight: 'bold' }} key={trunglich.id}>
                                <input style={{ marginLeft: '15px', marginTop: '8px' }} type="radio" />
                                {trunglich.name}
                            </div>
                        ))}
                    </div> */}
                </div>
                <div
                    style={{
                        width: '98%',
                        marginLeft: '12px',
                        marginTop: '25px',
                    }}
                >
                    <table border="1" width={1125}>
                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th style={{ height: '50px', width: '35px' }} rowSpan="1"></th>
                            <th rowSpan="1">ID</th>
                            <th rowSpan="1">Mã LHP</th>
                            <th rowSpan="1">Tên lớp học phần</th>
                            <th rowSpan="1">Sĩ số tối đa</th>
                            <th rowSpan="1">Đã đăng kí</th>
                            <th rowSpan="1">Trạng thái</th>
                        </tr>
                        {sectionClassTheoryList &&
                            sectionClassTheoryList?.length > 0 &&
                            sectionClassTheoryList.map((rowData) => (
                                <tr key={rowData.id}>
                                    <th>
                                        <input
                                            type="radio"
                                            checked={selectedLowerTableRow && selectedLowerTableRow.id === rowData.id}
                                            onChange={() => handleLowerTableSelect(rowData)}
                                        />
                                    </th>
                                    <th style={{ height: '30px' }}>{rowData.id}</th>
                                    <th>{rowData.classCode}</th>
                                    <th>{rowData.sectionName}</th>
                                    <th>{rowData.numberOfStudents}</th>
                                    <th>{rowData.registered}</th>
                                    <th>{rowData.sectionClassStatus}</th>
                                </tr>
                            ))}
                    </table>
                </div>
                <div
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        marginTop: '20px',
                    }}
                >
                    <p style={{ fontSize: '17px', fontWeight: 'bold', color: '#FF8C00' }}>CHI TIẾT LỚP HỌC PHẦN</p>
                </div>
                <div
                    style={{
                        width: '40%',
                        textAlign: 'center',
                        marginTop: '30px',
                        marginLeft: '350px',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    {/* <p style={{ fontSize: '15px', marginTop: '5px' }}>Nhóm thực hành</p> */}
                    {/* {termOptions && (
                        <div style={{ width: '180px' }}>
                            <Dropdown
                                value={selectedTerm || (!!termOptions[0] && termOptions[0].id)}
                                onChange={(e) => handleChange(e?.target?.value)}
                                options={termOptions}
                                optionLabel="name"
                                optionValue="id"
                                isSearchable={true}
                                className="p-2"
                                placeholder="Chọn một option..."
                                maxMenuHeight={250}
                            />
                        </div>
                    )}
                    <button style={{ width: '140px', backgroundColor: '#FF8C00' }}>
                        <p style={{ fontWeight: 'bold', color: 'white' }}>Xem lịch trùng</p>
                    </button> */}
                </div>
                {console.log(sectionClassStudentList)}
                {console.log(getRefId())}
                <div
                    style={{
                        width: '98%',
                        marginLeft: '12px',
                        marginTop: '15px',
                    }}
                >
                    <table border="1" width={1125}>
                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th style={{ height: '50px' }} rowSpan="1">
                                ID
                            </th>
                            <th rowSpan="1">Lịch học</th>
                            <th rowSpan="1">Phòng</th>
                            <th rowSpan="1">Giảng viên</th>
                            <th rowSpan="1">Thời gian</th>
                            <th></th>
                        </tr>
                        {sectionClassList &&
                            sectionClassList?.length > 0 &&
                            sectionClassList.map((rowData) => (
                                <tr key={rowData.id}>
                                    <th style={{ height: '40px' }}>{rowData.id}</th>
                                    <th>
                                        {`${rowData?.sectionClassType} - 
                                            ${rowData.dayInWeek} (${rowData.periodFrom} - ${rowData.periodTo})`}
                                    </th>
                                    <th>{rowData.room}</th>
                                    <th>{rowData.lecturerName}</th>
                                    <th>{`(${rowData.periodFrom} - ${rowData.periodTo})`}</th>
                                    <th>
                                        <button style={{ width: '70px', height: '30px', backgroundColor: '#00C0FF' }}>
                                            <p style={{ fontWeight: 'bold', color: 'white' }}>Xem</p>
                                        </button>
                                    </th>
                                </tr>
                            ))}
                    </table>
                </div>
                <div
                    style={{
                        width: '100%',
                        marginTop: '25px',
                        textAlign: 'center',
                    }}
                >
                    <button
                        style={{ width: '140px', backgroundColor: '#FF8C00', height: '30px' }}
                        onClick={handleOnSubmit}
                    >
                        <p style={{ fontWeight: 'bold', color: 'white' }}>Đăng kí môn học</p>
                    </button>
                </div>
                <div
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        marginTop: '20px',
                    }}
                >
                    <p style={{ fontSize: '17px', fontWeight: 'bold', color: '#FF8C00' }}>
                        LỚP HỌC PHẦN ĐÃ ĐĂNG KÍ TRONG HỌC KÌ NÀY
                    </p>
                </div>
                <div
                    style={{
                        width: '98%',
                        marginLeft: '12px',
                        marginTop: '15px',
                    }}
                >
                    <table border="1" width={1125}>
                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th style={{ height: '50px' }} rowSpan="1">
                                Thao tác
                            </th>
                            <th rowSpan="1">STT</th>
                            <th rowSpan="1">Mã LHP</th>
                            <th rowSpan="1">Tên môn học</th>
                            <th rowSpan="1">Lớp học phần dự kiến</th>
                            <th rowSpan="1">Số TC</th>
                            <th rowSpan="1">Học phí</th>
                            <th rowSpan="1">Hạn nộp</th>
                            <th rowSpan="1">Trạng thái ĐK</th>
                            <th rowSpan="1">Ngày ĐK</th>
                            <th rowSpan="1">Trạng thái LHP</th>
                        </tr>

                        {sectionClassStudentList &&
                            sectionClassStudentList?.length > 0 &&
                            sectionClassStudentList?.map((sectionClass, i) => (
                                <tr key={i}>
                                    <th style={{ height: '40px' }}></th>
                                    <th>{sectionClass?.id}</th>
                                    <th>{sectionClass?.classCode}</th>
                                    <th>{sectionClass?.sectionName}</th>
                                    <th>{sectionClass?.sectionName}</th>
                                    <th>{sectionClass?.credit}</th>
                                    <th>{sectionClass?.credit ? sectionClass?.credit * 580000 : 0}</th>
                                    <th>
                                        <FontAwesomeIcon
                                            style={{ color: 'green', fontSize: '20px' }}
                                            icon={faCircleCheck}
                                        />
                                    </th>
                                    <th>Đăng kí học mới</th>
                                    <th>16/11/2023</th>
                                    <th>{`${sectionClass?.sectionClassStatus === 'open' ? 'Đang mở' : 'Đã khóa'}`}</th>
                                </tr>
                            ))}
                    </table>
                </div>
                <div style={{ width: '100%', height: '20px' }}></div>
                <div
                    style={{
                        width: '98%',
                        marginTop: '10px',
                        backgroundColor: '#82CAFA',
                        marginLeft: '12px',
                        justifyContent: 'space-between',
                        display: 'flex',
                    }}
                >
                    <div style={{ marginLeft: '15px' }}>
                        <p>TRƯỜNG ĐẠI HỌC ĐỨC THUẬN</p>
                        <p>Địa chỉ: 182 Lê Đức Thọ - Phường 15 - Gò Vấp</p>
                        <p>Điện thoại: 1235646310</p>
                        <p>FAX: 1532315630</p>
                        <p>Email:dhdt@gmail.com</p>
                    </div>
                    <div style={{ marginRight: '15px' }}>
                        <p>Thống kê truy cập</p>
                        <p>Lượt truy cập: 13532</p>
                        <p>Đang online: 512</p>
                    </div>
                </div>
                <div style={{ width: '100%', height: '20px' }}></div>
            </div>
        </div>
    );
}

export default Dangkyhocphan;
