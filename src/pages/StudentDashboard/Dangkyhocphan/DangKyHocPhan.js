import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRefId, getUserId, getUserRole } from '~/components/authentication/AuthUtils';
import { getListTermInfo } from '~/api/term/TermService';
import { Dropdown } from 'primereact/dropdown';
import {
    getListSectionInfo,
    getListStudentSectionInfo,
    registerGenericSectionClass,
} from '~/api/section/SectionService';
import { getListSectionClassInfo } from '~/api/section/SectionClassService';
import { showNotification } from '~/components/notification/NotificationService';
import { HTTP_STATUS_OK } from '~/utils/Constants';
import { RadioButton } from 'primereact/radiobutton';
import { convertDayInWeek } from '~/utils/Utils';
import { UserRoles } from '~/App';

export const registrationType = [
    {
        key: 'new_learning',
        name: 'HỌC MỚI',
    },
    {
        key: 'again_learning',
        name: 'HỌC LẠI',
    },
    {
        key: 'improve_learning',
        name: 'HỌC CẢI THIỆN',
    },
];

const QueryKeyTerm = 'Term-Register';
const QueryKeySection = 'Section-Register';
const QueryKeySectionClass = 'Section-Class-Register';
const QueryKeySectionStudent = 'Regitrations';

const Dangkyhocphan = () => {
    // State
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedSectionClass, setSelectedSectionClass] = useState(null);
    const [selectedRegistration, setSelectedRegistration] = useState(registrationType[0].key);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [selectTimeAndPlaceRef, setSelectTimeAndPlaceRef] = useState(null);
    const [selectTimeAndPlace, setSelectTimeAndPlace] = useState(null);
    const queryClient = useQueryClient();

    // Use Query
    const { data: termOptions } = useQuery([QueryKeyTerm, getUserId()], () => getListTermInfo(getUserId()), {
        enabled: !!getUserId(),
    });

    const { data: sectionList, refetch: refetchSection } = useQuery(
        [QueryKeySection, getUserId(), selectedTerm, selectedRegistration],
        () =>
            getListSectionInfo(getUserId(), {
                termId: selectedTerm,
                studentId: getUserRole() === UserRoles.STUDENT ? getRefId() : null,
                createStatus: true,
                isRegisterBefore: selectedRegistration !== 'new_learning',
            }),
        {
            enabled: !!getUserId() && !!selectedTerm,
        },
    );

    const { data: sectionClassTheoryList, refetch: refetchSectionClassTheory } = useQuery(
        [QueryKeySectionClass, getUserId(), selectedSection?.id],
        () =>
            getListSectionClassInfo(getUserId(), {
                sectionId: selectedSection?.id,
                sectionClassRef: true,
                createStatus: true,
            }),
        {
            enabled: !!getUserId() && !!selectedSection?.id,
            initialData: [],
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
            enabled: !!getUserId() && !!selectedSectionClass?.id,
        },
    );

    const { data: sectionStudentList, refetch } = useQuery(
        [QueryKeySectionStudent, getUserId(), selectedTerm],
        () =>
            getListStudentSectionInfo(getUserId(), {
                studentId: getUserRole() === UserRoles.STUDENT ? getRefId() : null,
                termId: selectedTerm,
            }),
        {
            enabled: !!getRefId() && !!selectedTerm,
        },
    );

    // Handle Func
    const { mutate } = useMutation((toPostData) => registerGenericSectionClass(getUserId(), toPostData), {
        onSuccess: (data) => {
            if (!!data && data === HTTP_STATUS_OK) {
                showNotification('success', 'Thành công', 'Đăng ký học phần thành công !!');

                setSelectedSection(null);
                setSelectedSectionClass(null);
                setSelectTimeAndPlaceRef(null);
                setSelectTimeAndPlace(null);

                queryClient.setQueryData(
                    [QueryKeySectionClass, getUserId(), selectedSectionClass?.id, selectedSection?.id],
                    () => {},
                );
                queryClient.setQueryData([QueryKeySectionClass, getUserId(), selectedSection?.id], () => {});

                refetch();
                refetchSection();
                refetchSectionClassTheory();
            }
        },
    });

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
            if (!selectTimeAndPlace) {
                showNotification('error', 'Lỗi', 'Hãy chọn lớp thực hành cho lớp học phần muốn đăng ký !!');
                return;
            }
        }

        let toPostData = {
            termId: selectedTerm,
            sectionId: selectedSection?.id,
            studentId: getUserRole() === UserRoles.STUDENT ? getRefId() : null,

            sectionClassId: selectTimeAndPlace?.sectionClassId,
            timeAndPlaceId: selectTimeAndPlace?.id,

            sectionClassRefId: selectTimeAndPlaceRef?.sectionClassId,
            timeAndPlaceRefId: selectTimeAndPlaceRef?.id,

            registrationStatus: selectedRegistration,
        };

        mutate(toPostData);
    }, [
        selectedSection,
        selectedSectionClass,
        selectedTerm,
        selectTimeAndPlace,
        selectTimeAndPlaceRef?.sectionClassId,
        selectTimeAndPlaceRef?.id,
        selectedRegistration,
        mutate,
    ]);

    // Render
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
                <div className="grid align-items-center col-12">
                    <h2 className="mr-2 text-primary" style={{ textAlign: 'center' }}>
                        Đợt đăng kí
                    </h2>
                    {termOptions && (
                        <div style={{ width: '28rem' }}>
                            <Dropdown
                                className="w-full"
                                value={selectedTerm || null}
                                onChange={(e) => {
                                    setSelectedTerm(e?.target?.value);
                                    setSelectedSection(null);
                                    setSelectedSectionClass(null);
                                    setSelectTimeAndPlaceRef(null);
                                    setSelectTimeAndPlace(null);

                                    queryClient.setQueryData(
                                        [QueryKeySectionClass, getUserId(), selectedSection?.id, selectedTerm],
                                        {},
                                    );

                                    queryClient.setQueryData(
                                        [
                                            QueryKeySectionClass,
                                            getUserId(),
                                            selectedSectionClass?.id,
                                            selectedSection?.id,
                                        ],
                                        () => {},
                                    );
                                }}
                                options={termOptions}
                                optionLabel="name"
                                optionValue="id"
                                placeholder="Hãy chọn học kỳ bạn muốn đăng ký học phần"
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap gap-3 col-12 justify-content-center">
                    <div className="flex align-items-center">
                        <RadioButton
                            inputId="hocmoi"
                            name="loaiDangKy"
                            value="new_learning"
                            onChange={(e) => setSelectedRegistration(e.value)}
                            checked={selectedRegistration === 'new_learning'}
                        />
                        <label htmlFor="hocmoi" className="ml-2">
                            HỌC MỚI
                        </label>
                    </div>
                    <div className="flex align-items-center">
                        <RadioButton
                            inputId="hoclai"
                            name="loaiDangKy"
                            value="again_learning"
                            onChange={(e) => setSelectedRegistration(e.value)}
                            checked={selectedRegistration === 'again_learning'}
                        />
                        <label htmlFor="hoclai" className="ml-2">
                            HỌC LẠI
                        </label>
                    </div>
                    <div className="flex align-items-center">
                        <RadioButton
                            inputId="hoccaithien"
                            name="loaiDangKy"
                            value="improve_learning"
                            onChange={(e) => setSelectedRegistration(e.value)}
                            checked={selectedRegistration === 'improve_learning'}
                        />
                        <label htmlFor="hoccaithien" className="ml-2">
                            HỌC CẢI THIỆN
                        </label>
                    </div>
                </div>
            </div>

            {/* LỚP HỌC PHẦN CHỜ ĐĂNG KÝ */}
            <div className="w-full">
                <div
                    style={{
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#FF8C00' }}>
                        MÔN HỌC PHẦN ĐANG CHỜ ĐĂNG KÍ
                    </p>
                </div>
                <div style={{ marginTop: '25px' }}>
                    <table border="1" className="w-full">
                        <thead>
                            <tr className="bg-primary">
                                <th rowSpan="1">Mã chuyên ngành</th>
                                <th rowSpan="1">Thuộc chuyên ngành</th>
                                <th rowSpan="1">Mã HP</th>
                                <th rowSpan="1">Tên môn học / Học phần</th>
                                <th rowSpan="1">Tín chỉ học tập</th>
                                <th rowSpan="1">Tín chỉ chi phí</th>
                                <th rowSpan="1">Thời lượng môn học</th>
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
                                            setSelectTimeAndPlace(null);
                                            setSelectTimeAndPlaceRef(null);
                                        }}
                                        className={`cursor-pointer ${
                                            rowData?.id === selectedSection?.id ? 'bg-yellow-300' : ''
                                        }`}
                                    >
                                        <th style={{ height: '3rem' }}>{rowData.specializationCode}</th>
                                        <th>{rowData.specializationName}</th>
                                        <th>{rowData.code}</th>
                                        <th>{rowData.name}</th>
                                        <th>{rowData.credits}</th>
                                        <th>{rowData.costCredits}</th>
                                        <th>{rowData.courseDurationValue}</th>
                                        <th>{rowData?.courseDuration?.theory}</th>
                                        <th>{rowData?.courseDuration?.practice}</th>
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
                                        <th className="font-semibold ">
                                            {rowData.requireCourse &&
                                            rowData?.requireCourse?.studyFirst &&
                                            rowData?.requireCourse?.studyFirst?.length > 0
                                                ? rowData?.requireCourse?.studyFirst.map((courseCode) => {
                                                      return (
                                                          <div key={courseCode}>
                                                              {courseCode + ' (a)'} <br />
                                                          </div>
                                                      );
                                                  })
                                                : ''}
                                            {rowData.requireCourse &&
                                            rowData?.requireCourse?.prerequisite &&
                                            rowData?.requireCourse?.prerequisite?.length > 0
                                                ? rowData?.requireCourse?.prerequisite.map((courseCode) => {
                                                      return (
                                                          <div key={courseCode}>
                                                              {courseCode + ' (b)'} <br />
                                                          </div>
                                                      );
                                                  })
                                                : ''}
                                            {rowData.requireCourse &&
                                            rowData?.requireCourse?.parallel &&
                                            rowData?.requireCourse?.parallel?.length > 0
                                                ? rowData?.requireCourse?.parallel.map((courseCode) => {
                                                      return (
                                                          <div key={courseCode}>
                                                              {courseCode + ' (c)'} <br />
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
            </div>
            <hr />

            {/* LỚP HỌC PHẦN CHỜ ĐĂNG KÝ */}
            <div className="w-full">
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
                                <th style={{ height: '3rem' }} rowSpan="1">
                                    Mã LHP
                                </th>
                                <th rowSpan="1">Tên lớp học phần</th>
                                <th rowSpan="1">Giảng viên giảng dạy</th>
                                <th rowSpan="1">Mã giảng viên</th>
                                <th rowSpan="1">Sĩ số tối đa</th>
                                <th rowSpan="1">Đã đăng kí</th>
                                <th rowSpan="1">Trạng thái</th>
                            </tr>
                        </thead>
                        {console.log(sectionClassTheoryList)}
                        {sectionClassTheoryList &&
                            sectionClassTheoryList?.length > 0 &&
                            sectionClassTheoryList
                                .filter((sectionClass) => sectionClass?.timeAndPlaces?.length > 0)
                                .map((rowData) => (
                                    <tbody key={rowData.id}>
                                        <tr
                                            onClick={() => {
                                                setSelectedSectionClass(rowData);
                                                setSelectTimeAndPlace(null);
                                                setSelectTimeAndPlaceRef(null);
                                            }}
                                            className={`cursor-pointer ${
                                                rowData?.id === selectedSectionClass?.id ? 'bg-yellow-300' : ''
                                            }`}
                                        >
                                            <th style={{ height: '3rem' }}>{rowData?.code}</th>
                                            <th>{rowData?.name}</th>
                                            <th>{rowData?.lecturerName}</th>
                                            <th>{rowData?.lecturerCode}</th>
                                            <th>{rowData?.maxStudents}</th>
                                            <th>{rowData?.numberOfStudents ? rowData?.numberOfStudents : 0}</th>
                                            <th>
                                                {!!rowData?.sectionClassStatus
                                                    ? rowData?.sectionClassStatus === 'open'
                                                        ? 'Đang mở'
                                                        : rowData?.sectionClassStatus === 'closed'
                                                        ? 'Đã đóng'
                                                        : ''
                                                    : ''}
                                            </th>
                                        </tr>
                                    </tbody>
                                ))}
                    </table>
                </div>
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
                            <th rowSpan="1">Ngày bắt đầu</th>
                            <th rowSpan="1">Ngày kết thúc</th>
                            <th rowSpan="1">Tiết bắt đầu</th>
                            <th rowSpan="1">Tiết kết thúc</th>
                            {/* <th rowSpan="1">Thao tác</th> */}
                        </tr>
                    </thead>
                    {!!selectedSectionClass?.id &&
                        sectionClassList &&
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
                                                        if (selectTimeAndPlaceRef?.id === timeAndPlace?.id) {
                                                            setSelectTimeAndPlaceRef(null);
                                                        } else {
                                                            setSelectTimeAndPlaceRef(timeAndPlace);
                                                        }
                                                    } else {
                                                        if (selectTimeAndPlace?.id === timeAndPlace?.id) {
                                                            setSelectTimeAndPlace(null);
                                                        } else {
                                                            setSelectTimeAndPlace(timeAndPlace);
                                                        }
                                                    }
                                                }}
                                                className={`cursor-pointer ${
                                                    rowData?.sectionClassType === 'theory'
                                                        ? selectTimeAndPlaceRef?.id === timeAndPlace?.id
                                                            ? 'bg-yellow-300'
                                                            : ''
                                                        : selectTimeAndPlace?.id === timeAndPlace?.id
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
                                                <th>{new Date(rowData.startDate).toLocaleDateString()}</th>
                                                <th>{new Date(rowData.endDate).toLocaleDateString()}</th>
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
                                Mã HP
                            </th>
                            <th rowSpan="1">Tên môn học / Học phần</th>
                            <th rowSpan="1">Số TC học tập</th>
                            <th rowSpan="1">Số TC chi phí</th>
                            <th rowSpan="1">Học phí</th>
                            <th rowSpan="1">Hạn nộp</th>
                            <th rowSpan="1">Loại ĐK</th>
                            <th rowSpan="1">Ngày ĐK</th>
                            <th rowSpan="1">Trạng thái ĐK</th>
                        </tr>
                    </thead>
                    {sectionStudentList &&
                        sectionStudentList?.length > 0 &&
                        sectionStudentList?.map((studentSection, i) => (
                            <tbody key={studentSection?.id}>
                                <tr>
                                    <th style={{ height: '40px' }}>{studentSection?.sectionCode}</th>
                                    <th>{studentSection?.sectionName}</th>
                                    <th>{studentSection?.credits}</th>
                                    <th>{studentSection?.costCredits}</th>
                                    <th>{studentSection?.total} VND</th>
                                    <th>
                                        {studentSection?.paymentDeadline
                                            ? new Date(studentSection?.paymentDeadline).toLocaleDateString()
                                            : '-'}
                                    </th>
                                    <th>
                                        {studentSection?.registrationStatus === 'new_learning'
                                            ? 'Đăng kí học mới'
                                            : studentSection?.registrationStatus === 'again_learning'
                                            ? 'Đăng ký học lại'
                                            : studentSection?.registrationStatus === 'improve_learning'
                                            ? 'Đăng ký học cải thiện'
                                            : '-'}
                                    </th>
                                    <th>{new Date(studentSection?.createdAt).toLocaleDateString()}</th>

                                    <th>
                                        {studentSection?.registrationStatus === 'cancel_register'
                                            ? 'Đã huỷ bỏ đăng ký'
                                            : 'Đã đăng ký'}
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
