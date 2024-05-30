import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRefId, getUserId } from '~/components/authentication/AuthUtils';
import { getListStudentProgramInfo } from '~/api/program/ProgramSevice';
import { TermProgram } from '~/pages/AdminDashboard/program/ProgramConstant';

const QueryKey = 'Student-Program';
const Chuongtrinhkhung = () => {
    // State
    const [termVisible, setTermVisible] = useState([]);

    // Use Query
    const { data } = useQuery([QueryKey, getRefId()], () => getListStudentProgramInfo(getUserId(), getRefId()), {
        enabled: !!getUserId() && !!getRefId(),
    });

    // Memo
    const termList = useMemo(() => {
        let termListData = [];
        if (data && data?.program && data?.program?.programTerms?.length > 0) {
            termListData = [...data?.program?.programTerms];
        }

        return termListData;
    }, [data]);

    const totalCredits = useMemo(() => {
        let totalCompulsory = 0;
        let totalElective = 0;
        if (data && data?.program && data?.program?.programTerms?.length > 0) {
            for (let i = 0; i < data?.program?.programTerms?.length; i++) {
                const termData = { ...data?.program?.programTerms[i] };
                if (termData.programCompulsoryCourses && termData.programCompulsoryCourses.length > 0) {
                    totalCompulsory += termData.programCompulsoryCourses.reduce(
                        (sum, course) => (sum += course.credits),
                        0,
                    );

                    totalElective += termData?.minimumElective;
                }
            }
        }

        return {
            totalCompulsory: totalCompulsory,
            totalElective: totalElective,
            totalCredits: totalCompulsory + totalElective,
        };
    }, [data]);

    const courseCompletedIds = useMemo(() => {
        let coursIdsData = [];
        if (data && data?.courses && data?.courses?.length > 0) {
            coursIdsData = [...data?.courses.map((course) => course.id)];
        }

        return coursIdsData;
    }, [data]);

    // Handle Func
    const handleSelectTerm = (termType) => {
        if (termVisible.includes(termType)) {
            setTermVisible([]);
        } else {
            setTermVisible([termType]);
        }
    };

    return (
        <div>
            {console.log(data)}
            <div>
                <h2>Chương trình khung</h2>
            </div>
            <hr />
            <div className="w-full">
                <table border="1" className="w-full">
                    <thead>
                        <tr style={{ backgroundColor: 'rgba(243, 247, 249, 0.27)', color: 'rgb(29, 161, 242)' }}>
                            <th rowSpan="1">Mã Học phần</th>
                            <th style={{ height: '70px' }} rowSpan="1">
                                Tên môn học/Học phần
                            </th>
                            <th rowSpan="1">Số tiết LT</th>
                            <th rowSpan="1">Số tiết TH</th>
                            <th rowSpan="1">Số TC</th>
                            <th rowSpan="1">Số TC bắt buộc của nhóm</th>
                            <th style={{ width: '30px' }} rowSpan="1">
                                Đạt
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {termList &&
                            termList.length > 0 &&
                            termList.map((term, index) => (
                                <React.Fragment key={`${index}-term`}>
                                    <tr
                                        className="bg-blue-500"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleSelectTerm(term.termType)}
                                    >
                                        <td
                                            style={{ fontWeight: 'bold', height: '30px', textAlign: 'center' }}
                                            colSpan="4"
                                        >
                                            {termVisible.includes(term.termType) ? (
                                                <i className="pi pi-angle-down mr-2"></i>
                                            ) : (
                                                <i className="pi pi-angle-right mr-2"></i>
                                            )}
                                            {TermProgram?.find((item) => item.value === term.termType)?.label}
                                        </td>
                                        <td
                                            style={{ fontWeight: 'bold', height: '30px', textAlign: 'center' }}
                                            colSpan="1"
                                        >
                                            {term.totalCompulsory + term.minimumElective}
                                        </td>
                                        <td style={{ fontWeight: 'bold', height: '30px' }} colSpan="5"></td>
                                    </tr>
                                    {termVisible.includes(term.termType) && (
                                        <>
                                            {['compulsory', 'elective'].map((courseType, courseIndex) => (
                                                <React.Fragment key={courseIndex}>
                                                    {courseType === 'compulsory' && (
                                                        <tr
                                                            className="bg-blue-300"
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}
                                                        >
                                                            <td
                                                                style={{ fontWeight: 'bold', height: '30px' }}
                                                                colSpan="4"
                                                            >
                                                                Học phần bắt buộc
                                                            </td>
                                                            <td
                                                                style={{
                                                                    fontWeight: 'bold',
                                                                    height: '30px',
                                                                    textAlign: 'center',
                                                                }}
                                                                colSpan="1"
                                                            >
                                                                {term.totalCompulsory}
                                                            </td>
                                                            <td
                                                                style={{ fontWeight: 'bold', height: '30px' }}
                                                                colSpan="5"
                                                            ></td>
                                                        </tr>
                                                    )}
                                                    {courseType === 'elective' && (
                                                        <tr
                                                            className="bg-bluegray-300"
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}
                                                        >
                                                            <td
                                                                style={{ fontWeight: 'bold', height: '30px' }}
                                                                colSpan="4"
                                                            >
                                                                Học phần tự chọn
                                                            </td>
                                                            <td
                                                                style={{
                                                                    fontWeight: 'bold',
                                                                    height: '30px',
                                                                    textAlign: 'center',
                                                                }}
                                                                colSpan="1"
                                                            >
                                                                {term.minimumElective}
                                                            </td>
                                                            <td
                                                                style={{ fontWeight: 'bold', height: '30px' }}
                                                                colSpan="5"
                                                            ></td>
                                                        </tr>
                                                    )}
                                                    {courseType === 'elective' ? (
                                                        term?.programElectiveCourses?.length > 0 ? (
                                                            term?.programElectiveCourses?.map((course, courseIndex) => (
                                                                <tr key={courseIndex}>
                                                                    <th style={{ fontWeight: 'normal' }}>
                                                                        {course.code}
                                                                    </th>
                                                                    <th style={{ fontWeight: 'normal' }}>
                                                                        {course.name}
                                                                    </th>
                                                                    <th style={{ fontWeight: 'normal' }}>
                                                                        {course.courseDuration.theory}
                                                                    </th>
                                                                    <th style={{ fontWeight: 'normal' }}>
                                                                        {course.courseDuration.practice}
                                                                    </th>
                                                                    <th style={{ fontWeight: 'normal' }}>
                                                                        {course.credits}
                                                                    </th>
                                                                    <th style={{ fontWeight: 'normal' }}>
                                                                        {term.minimumElective}
                                                                    </th>
                                                                    <th
                                                                        style={{
                                                                            fontWeight: 'normal',
                                                                            height: '3rem',
                                                                            width: '3rem',
                                                                        }}
                                                                    >
                                                                        {courseCompletedIds &&
                                                                        courseCompletedIds?.length > 0 &&
                                                                        courseCompletedIds.includes(course.id) ? (
                                                                            <i className="pi pi-check flex align-items-center justify-content-center bg-green-300 text-white h-full w-full"></i>
                                                                        ) : (
                                                                            <i className="pi pi-times flex align-items-center justify-content-center bg-red-300 text-white h-full w-full"></i>
                                                                        )}
                                                                    </th>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr className="h-3rem">
                                                                <th style={{ fontWeight: 'normal' }} colSpan="10">
                                                                    <span className="text-700">Không có...</span>
                                                                </th>
                                                            </tr>
                                                        )
                                                    ) : courseType === 'compulsory' ? (
                                                        term?.programCompulsoryCourses?.length > 0 ? (
                                                            term?.programCompulsoryCourses?.map(
                                                                (course, courseIndex) => (
                                                                    <tr key={courseIndex}>
                                                                        <th style={{ fontWeight: 'normal' }}>
                                                                            {course.code}
                                                                        </th>
                                                                        <th style={{ fontWeight: 'normal' }}>
                                                                            {course.name}
                                                                        </th>
                                                                        <th style={{ fontWeight: 'normal' }}>
                                                                            {course.courseDuration.theory}
                                                                        </th>
                                                                        <th style={{ fontWeight: 'normal' }}>
                                                                            {course.courseDuration.practice}
                                                                        </th>
                                                                        <th style={{ fontWeight: 'normal' }}>
                                                                            {course.credits}
                                                                        </th>
                                                                        <th style={{ fontWeight: 'normal' }}>
                                                                            {term.minimumElective}
                                                                        </th>
                                                                        <th
                                                                            style={{
                                                                                fontWeight: 'normal',
                                                                                height: '3rem',
                                                                                width: '3rem',
                                                                            }}
                                                                        >
                                                                            {courseCompletedIds &&
                                                                            courseCompletedIds?.length > 0 &&
                                                                            courseCompletedIds.includes(course.id) ? (
                                                                                <i className="pi pi-check flex align-items-center justify-content-center bg-green-300 text-white h-full w-full"></i>
                                                                            ) : (
                                                                                <i className="pi pi-times flex align-items-center justify-content-center bg-red-300 text-white h-full w-full"></i>
                                                                            )}
                                                                        </th>
                                                                    </tr>
                                                                ),
                                                            )
                                                        ) : (
                                                            <span className="text-700 p-2">Không có...</span>
                                                        )
                                                    ) : (
                                                        <span className="text-700 p-2">Không có...</span>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </>
                                    )}
                                </React.Fragment>
                            ))}
                        <tr
                            style={{
                                backgroundColor: 'rgba(215, 237, 247, 0.15)',
                                cursor: 'pointer',
                            }}
                        >
                            <td style={{ fontWeight: 'bold', height: '30px' }} colSpan="4">
                                <p className="ml-2 text-600">Số tín chỉ yêu cầu</p>
                            </td>
                            <td
                                style={{
                                    fontWeight: 'bold',
                                    height: '30px',
                                    textAlign: 'center',
                                    color: 'red',
                                }}
                                colSpan="1"
                            >
                                {totalCredits.totalCredits}
                            </td>
                            <td style={{ fontWeight: 'bold', height: '30px' }} colSpan="5"></td>
                        </tr>
                        <tr
                            style={{
                                backgroundColor: 'rgba(215, 237, 247, 0.15)',
                                cursor: 'pointer',
                            }}
                        >
                            <td style={{ fontWeight: 'bold', height: '30px' }} colSpan="4">
                                <p className="ml-2 text-600">Số tín chỉ bắt buộc</p>
                            </td>
                            <td
                                style={{
                                    fontWeight: 'bold',
                                    height: '30px',
                                    textAlign: 'center',
                                    color: 'red',
                                }}
                                colSpan="1"
                            >
                                {totalCredits.totalCompulsory}
                            </td>
                            <td style={{ fontWeight: 'bold', height: '30px' }} colSpan="5"></td>
                        </tr>
                        <tr
                            style={{
                                backgroundColor: 'rgba(215, 237, 247, 0.15)',
                                cursor: 'pointer',
                            }}
                        >
                            <td style={{ fontWeight: 'bold', height: '30px' }} colSpan="4">
                                <p className="ml-2 text-600">Số tín chỉ tự chọn</p>
                            </td>
                            <td
                                style={{
                                    fontWeight: 'bold',
                                    height: '30px',
                                    textAlign: 'center',
                                    color: 'red',
                                }}
                                colSpan="1"
                            >
                                {totalCredits.totalElective}
                            </td>
                            <td style={{ fontWeight: 'bold', height: '30px' }} colSpan="5"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Chuongtrinhkhung;
