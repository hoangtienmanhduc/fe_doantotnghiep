import styles from './Dangkyhocphan.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getRefId, getUserId } from '~/components/authentication/AuthUtils';
import { getListTermInfo } from '~/api/term/TermService';
import { Dropdown } from 'primereact/dropdown';
import { getListSectionInfo } from '~/api/section/SectionService';
import {
    getListSectionClassInfo,
    getListStudentSectionClassInfo,
    registerGenericSectionClass,
} from '~/api/section/SectionClassService';
import { showNotification } from '~/components/notification/NotificationService';
import { HTTP_STATUS_OK } from '~/utils/Constants';
import { RadioButton } from 'primereact/radiobutton';
import { convertDayInWeek } from '~/utils/Utils';

const courses = [
    {
        key: 'new_learning',
        name: 'HỌC MỚI',
    },
    {
        key: 'learn_again',
        name: 'HỌC LẠI',
    },
    {
        key: 'learn_improve',
        name: 'HỌC CẢI THIỆN',
    },
];

const QueryKeyTerm = 'Term-Register-Options';
const QueryKeySection = 'Section-Register';
const QueryKeySectionClass = 'Section-Class-Register';
const QueryKeySectionClassStudent = 'Section-Class-Student-Register';

const Dangkyhocphan = () => {
    // State
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedSectionClass, setSelectedSectionClass] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(courses[0].key);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [selectTimeAndPlaceTheory, setSelectTimeAndPlaceTheory] = useState(null);
    const [selectTimeAndPlacePractice, setSelectTimeAndPlacePractice] = useState(null);

    // Use Query
    const { data: termOptions } = useQuery([QueryKeyTerm, getUserId()], () => getListTermInfo(getUserId()), {
        enabled: !!getUserId(),
    });

    const { data: sectionList } = useQuery(
        [QueryKeySection, getUserId(), selectedTerm],

        () => getListSectionInfo(getUserId(), { termId: selectedTerm }),
        {
            enabled: !!getUserId() && !!selectedTerm,
        },
    );

    const { data: sectionClassTheoryList } = useQuery(
        [QueryKeySectionClass, getUserId(), selectedSection?.id, selectedTerm],
        () =>
            getListSectionClassInfo(getUserId(), {
                sectionId: selectedSection?.id,
                sectionClassType: 'theory',
                termId: selectedTerm,
            }),
        {
            enabled: !!getUserId() && !!selectedTerm && !!selectedSection?.id,
        },
    );

    const { data: sectionClassList } = useQuery(
        [QueryKeySectionClass, getUserId(), selectedSectionClass?.id, selectedSection?.id],
        () =>
            getListSectionClassInfo(getUserId(), {
                sectionId: selectedSection?.id,
                sectionClassId: selectedSectionClass?.id,
            }),
        {
            enabled: !!getUserId() && !!selectedSection?.id && !!selectedSectionClass?.id,
        },
    );

    const { data: sectionClassStudentList, refetch } = useQuery(
        [QueryKeySectionClassStudent, getUserId(), selectedTerm],
        () =>
            getListStudentSectionClassInfo(getUserId(), {
                studentId: getRefId(),
                termId: selectedTerm,
            }),
        {
            enabled: !!getRefId() && !!selectedTerm,
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

    // Handle
    const handleChange = useCallback((selectedTerm) => {
        setSelectedTerm(selectedTerm);

        const selectedCourseId = selectedTerm.value;
        const matchingCourse = courses.find((course) => course.id === selectedCourseId);

        if (matchingCourse) {
            setSelectedCourse(matchingCourse);
        }
    }, []);

    const handleOnSubmit = useCallback(() => {
        if (!selectedSection) {
            showNotification('error', 'Lỗi', 'Hãy chọn học phần muốn đăng ký !!');
            return;
        }

        if (!selectedSectionClass) {
            showNotification('error', 'Lỗi', 'Hãy chọn lớp học phần muốn đăng ký !!');
            return;
        }

        if (!!selectedSection && selectedSection?.practice > 0) {
            if (!selectTimeAndPlacePractice) {
                showNotification('error', 'Lỗi', 'Hãy chọn lớp thực hành cho lớp học phần muốn đăng ký !!');
                return;
            }
        }

        let toPostData = {
            sectionId: selectedSection?.id,

            sectionClassPracticeId: selectTimeAndPlacePractice?.sectionClassId,
            timeAndPlacePracticeId: selectTimeAndPlacePractice?.id,

            sectionClassTheoryId: selectTimeAndPlaceTheory?.sectionClassId,
            timeAndPlaceTheoryId: selectTimeAndPlaceTheory?.id,
        };

        mutate(toPostData);
    }, [
        mutate,
        selectTimeAndPlacePractice,
        selectTimeAndPlaceTheory?.id,
        selectTimeAndPlaceTheory?.sectionClassId,
        selectedSection,
        selectedSectionClass,
    ]);

    return (
        <React.Fragment>
            <div
                style={{
                    textAlign: 'center',
                    marginTop: '15px',
                }}
            >
                <h1 style={{ color: '#006994' }}>ĐĂNG KÝ HỌC PHẦN</h1>
            </div>
            <div className="w-full grid align-items-center justify-content-around">
                <div className="grid align-items-center sm:col-12 xs:col-12 md:col-6 lg:col-6">
                    <h2 style={{ textAlign: 'center', marginRight: '25px' }}>Đợt đăng kí</h2>
                    {termOptions && (
                        <div style={{ width: '28rem' }}>
                            <Dropdown
                                className="p-2 w-full"
                                value={selectedTerm || null}
                                onChange={(e) => handleChange(e?.target?.value)}
                                options={termOptions}
                                optionLabel="name"
                                optionValue="id"
                                placeholder="Hãy chọn học kỳ bạn muốn đăng ký học phần"
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap gap-3 sm:col-12 xs:col-12 md:col-6 lg:col-6">
                    <div className="flex align-items-center">
                        <RadioButton
                            inputId="hocmoi"
                            name="loaiDangKy"
                            value="new_learning"
                            onChange={(e) => setSelectedCourse(e.value)}
                            checked={selectedCourse === 'new_learning'}
                        />
                        <label htmlFor="hocmoi" className="ml-2">
                            HỌC MỚI
                        </label>
                    </div>
                    <div className="flex align-items-center">
                        <RadioButton
                            inputId="hoclai"
                            name="loaiDangKy"
                            value="learn_again"
                            onChange={(e) => setSelectedCourse(e.value)}
                            checked={selectedCourse === 'learn_again'}
                        />
                        <label htmlFor="hoclai" className="ml-2">
                            HỌC LẠI
                        </label>
                    </div>
                    <div className="flex align-items-center">
                        <RadioButton
                            inputId="hoccaithien"
                            name="loaiDangKy"
                            value="learn_improve"
                            onChange={(e) => setSelectedCourse(e.value)}
                            checked={selectedCourse === 'learn_improve'}
                        />
                        <label htmlFor="hoccaithien" className="ml-2">
                            HỌC CẢI THIỆN
                        </label>
                    </div>
                </div>
            </div>

            {/* LỚP HỌC PHẦN CHỜ ĐĂNG KÝ */}
            <div
                style={{
                    width: '100%',
                    textAlign: 'center',
                }}
            >
                <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#FF8C00' }}>MÔN HỌC PHẦN ĐANG CHỜ ĐĂNG KÍ</p>
            </div>
            <div style={{ marginTop: '25px' }}>
                <table border="1" className="w-full">
                    <thead>
                        <tr className="bg-primary">
                            <th rowSpan="1">Thuộc chuyên ngành</th>
                            <th rowSpan="1">Mã HP</th>
                            <th rowSpan="1">Tên môn học / Học phần</th>
                            <th rowSpan="1">Tín chỉ học tập</th>
                            <th rowSpan="1">Tín chỉ chi phí</th>
                            <th rowSpan="1">Số chỉ lý thuyết</th>
                            <th rowSpan="1">Số chỉ thực hành</th>
                            <th rowSpan="1">Bắt buộc</th>
                            <th style={{ width: '200px' }} rowSpan="1">
                                Học phần: học trước (a), tiên quyết (b), song hành (c)
                            </th>
                        </tr>
                    </thead>
                    {sectionList &&
                        sectionList?.length > 0 &&
                        sectionList.map((rowData) => (
                            <tbody key={rowData.id}>
                                <tr
                                    onClick={() => {
                                        setSelectedSection(rowData);
                                        setSelectedSectionClass(null);
                                    }}
                                    className={`cursor-pointer ${
                                        rowData?.id === selectedSection?.id ? 'bg-yellow-300' : ''
                                    }`}
                                >
                                    <th style={{ height: '3rem' }}>{rowData.specializationName}</th>
                                    <th>{rowData.code}</th>
                                    <th>{rowData.name}</th>
                                    <th>{rowData.credits}</th>
                                    <th>{rowData.costCredits}</th>
                                    <th>{rowData.theory}</th>
                                    <th>{rowData.practice}</th>
                                    <th>
                                        {rowData.sectionType === 'elective' ? (
                                            <FontAwesomeIcon
                                                style={{ color: 'red', fontSize: '20px' }}
                                                icon={faCircleXmark}
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                style={{ color: 'green', fontSize: '20px' }}
                                                icon={faCircleCheck}
                                            />
                                        )}
                                    </th>
                                    <th>
                                        {rowData.requireSection &&
                                        rowData?.requireSection?.studyFirst &&
                                        rowData?.requireSection?.studyFirst?.length > 0
                                            ? rowData?.requireSection?.studyFirst.map((sectionCode) => {
                                                  return (
                                                      <div key={sectionCode}>
                                                          {sectionCode + ' (a)'} <br />
                                                      </div>
                                                  );
                                              })
                                            : ''}
                                        {rowData.requireSection &&
                                        rowData?.requireSection?.prerequisite &&
                                        rowData?.requireSection?.prerequisite?.length > 0
                                            ? rowData?.requireSection?.prerequisite.map((sectionCode) => {
                                                  return (
                                                      <div key={sectionCode}>
                                                          {sectionCode + ' (b)'} <br />
                                                      </div>
                                                  );
                                              })
                                            : ''}
                                        {rowData.requireSection &&
                                        rowData?.requireSection?.parallel &&
                                        rowData?.requireSection?.parallel?.length > 0
                                            ? rowData?.requireSection?.parallel.map((sectionCode) => {
                                                  return (
                                                      <div key={sectionCode}>
                                                          {sectionCode + ' (c)'} <br />
                                                      </div>
                                                  );
                                              })
                                            : ''}
                                    </th>
                                </tr>
                            </tbody>
                        ))}
                </table>
            </div>
            <hr />

            {/* LỚP HỌC PHẦN CHỜ ĐĂNG KÝ */}
            <div
                style={{
                    width: '100%',
                    marginTop: '25px',
                    textAlign: 'center',
                }}
            >
                <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#FF8C00' }}>LỚP HỌC PHẦN CHỜ ĐĂNG KÝ</p>
            </div>
            <div
                style={{
                    marginTop: '25px',
                }}
            >
                <table border="1" className="w-full">
                    <thead>
                        <tr className="bg-primary">
                            <th rowSpan="1">Mã LHP</th>
                            <th rowSpan="1">Tên lớp học phần</th>
                            <th rowSpan="1">Giảng viên giảng dạy</th>
                            <th rowSpan="1">Mã giảng viên</th>
                            <th rowSpan="1">Sĩ số tối đa</th>
                            <th rowSpan="1">Đã đăng kí</th>
                            <th rowSpan="1">Trạng thái</th>
                        </tr>
                    </thead>
                    {sectionClassTheoryList &&
                        sectionClassTheoryList?.length > 0 &&
                        sectionClassTheoryList.map((rowData) => (
                            <tbody key={rowData.id}>
                                <tr
                                    onClick={() => {
                                        setSelectedSectionClass(rowData);
                                    }}
                                    className={`cursor-pointer ${
                                        rowData?.id === selectedSectionClass?.id ? 'bg-yellow-300' : ''
                                    }`}
                                >
                                    <th style={{ height: '3rem' }}>{rowData?.code}</th>
                                    <th>{rowData?.name}</th>
                                    <th>{rowData?.lecturerName}</th>
                                    <th>{rowData?.lecturerCode}</th>
                                    <th>{rowData?.numberOfStudents}</th>
                                    <th>{rowData?.registered ? rowData?.registered : 0}</th>
                                    <th>
                                        {!!rowData?.sectionClassStatus
                                            ? rowData?.sectionClassStatus === 'open'
                                                ? 'Đang mở'
                                                : 'Đã đóng'
                                            : ''}
                                    </th>
                                </tr>
                            </tbody>
                        ))}
                </table>
            </div>
            <hr />

            {/* CHI TIẾT LỚP HỌC PHẦN */}
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
                    textAlign: 'center',
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
                            />
                        </div>
                    )}
                    <button style={{ width: '140px', backgroundColor: '#FF8C00' }}>
                        <p style={{ fontWeight: 'bold', color: 'white' }}>Xem lịch trùng</p>
                    </button> */}
            </div>
            <div
                style={{
                    marginTop: '15px',
                }}
            >
                <table border="1" className="w-full">
                    <thead>
                        <tr className="bg-primary">
                            <th style={{ height: '50px' }} rowSpan="1">
                                Lịch học
                            </th>
                            <th rowSpan="1">Phòng học</th>
                            <th rowSpan="1">Giảng viên</th>
                            <th rowSpan="1">Tiết bắt đầu</th>
                            <th rowSpan="1">Tiết kết thúc</th>
                            {/* <th rowSpan="1">Thao tác</th> */}
                        </tr>
                    </thead>
                    {sectionClassList &&
                        sectionClassList?.length > 0 &&
                        sectionClassList.map((rowData) => {
                            return (
                                rowData?.timeAndPlaces &&
                                rowData?.timeAndPlaces?.length > 0 &&
                                rowData?.timeAndPlaces.map((timeAndPlace) => {
                                    return (
                                        <tbody key={rowData?.id + '-' + timeAndPlace?.id}>
                                            <tr
                                                onClick={() => {
                                                    if (rowData?.sectionClassType === 'theory') {
                                                        if (selectTimeAndPlaceTheory?.id === timeAndPlace?.id) {
                                                            setSelectTimeAndPlaceTheory(null);
                                                        } else {
                                                            setSelectTimeAndPlaceTheory(timeAndPlace);
                                                        }
                                                    } else {
                                                        if (selectTimeAndPlacePractice?.id === timeAndPlace?.id) {
                                                            setSelectTimeAndPlacePractice(null);
                                                        } else {
                                                            setSelectTimeAndPlacePractice(timeAndPlace);
                                                        }
                                                    }
                                                }}
                                                className={`cursor-pointer ${
                                                    rowData?.sectionClassType === 'theory'
                                                        ? selectTimeAndPlaceTheory?.id === timeAndPlace?.id
                                                            ? 'bg-yellow-300'
                                                            : ''
                                                        : selectTimeAndPlacePractice?.id === timeAndPlace?.id
                                                        ? 'bg-yellow-300'
                                                        : ''
                                                }`}
                                            >
                                                <th style={{ height: '3rem' }}>
                                                    {`${
                                                        rowData?.sectionClassType === 'theory'
                                                            ? 'Lý thuyết'
                                                            : 'Thực hành'
                                                    } (${convertDayInWeek(timeAndPlace.dayOfTheWeek)})`}
                                                </th>
                                                <th>{timeAndPlace.room}</th>
                                                <th>{rowData.lecturerName}</th>
                                                <th>{`${timeAndPlace.periodStart}`}</th>
                                                <th>{`${timeAndPlace.periodEnd}`}</th>
                                            </tr>
                                        </tbody>
                                    );
                                })
                            );
                        })}
                </table>
            </div>
            <hr />
            <div
                style={{
                    width: '100%',
                    marginTop: '25px',
                    textAlign: 'center',
                }}
            >
                {/* <Button /> */}
                <button style={{ backgroundColor: '#FF8C00' }} onClick={handleOnSubmit}>
                    <p style={{ fontWeight: 'bold', color: 'white' }}>Đăng kí môn học</p>
                </button>
            </div>
            <hr />
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
            <hr />
            <div
                style={{
                    marginTop: '15px',
                }}
            >
                <table border="1" className="w-full">
                    <thead>
                        <tr className="bg-primary">
                            <th style={{ height: '50px' }} rowSpan="1">
                                Mã LHP
                            </th>
                            <th rowSpan="1">Tên môn học / Học phần</th>
                            <th rowSpan="1">Số TC học tập</th>
                            <th rowSpan="1">Số TC chi phí</th>
                            <th rowSpan="1">Học phí</th>
                            <th rowSpan="1">Hạn nộp</th>
                            <th rowSpan="1">Loại ĐK</th>
                            <th rowSpan="1">Ngày ĐK</th>
                            <th rowSpan="1">Trạng thái LHP</th>
                            <th rowSpan="1">Trạng thái ĐK</th>
                        </tr>
                    </thead>
                    {sectionClassStudentList &&
                        sectionClassStudentList?.length > 0 &&
                        sectionClassStudentList?.map((studentSectionClass, i) => (
                            <tbody key={studentSectionClass?.id}>
                                <tr>
                                    <th style={{ height: '40px' }}>{studentSectionClass?.sectionClassCode}</th>
                                    <th>{studentSectionClass?.sectionName}</th>
                                    <th>{studentSectionClass?.credits}</th>
                                    <th>{studentSectionClass?.costCredits}</th>
                                    <th>{studentSectionClass?.total} VND</th>
                                    <th>{'-'}</th>

                                    <th>
                                        {studentSectionClass?.type === 'new_learning'
                                            ? 'Đăng kí học mới'
                                            : studentSectionClass?.type === 'again_learning'
                                            ? 'Đăng ký học lại'
                                            : studentSectionClass?.type === 'improve_learning'
                                            ? 'Đăng ký học cải thiện'
                                            : '-'}
                                    </th>
                                    <th>{new Date(studentSectionClass?.createdAt).toLocaleDateString()}</th>
                                    <th>{`${
                                        studentSectionClass?.sectionClassStatus === 'open' ? 'Đang mở' : 'Đã khóa'
                                    }`}</th>
                                    <th>
                                        {studentSectionClass?.status === 'registered'
                                            ? 'Đã đăng ký'
                                            : studentSectionClass?.status === 'canceled'
                                            ? 'Đã huỷ'
                                            : 'Đang chờ'}
                                    </th>
                                </tr>
                            </tbody>
                        ))}
                </table>
            </div>
            <hr />
            <div
                style={{
                    width: '100%',
                    marginTop: '10px',
                    backgroundColor: '#82CAFA',
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
        </React.Fragment>
    );
};

export default Dangkyhocphan;
