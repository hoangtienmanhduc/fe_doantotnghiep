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
                if (termData.programCourses && termData.programCourses.length > 0) {
                    termData.programCourses.forEach((course) => {
                        if (course.courseType === 'compulsory') {
                            totalCompulsory += course.credits;
                        } else if (course.courseType === 'elective') {
                            totalElective += course.credits;
                        }
                    });
                }
            }
        }

        return {
            totalCompulsory: totalCompulsory,
            totalElective: totalElective,
            totalCredits: totalCompulsory + totalElective,
        };
    }, [data]);

    const coursCompletedIds = useMemo(() => {
        let coursIdsData = [];
        if (data && data?.courses && data?.courses?.length > 0) {
            coursIdsData = [...data?.courses.map((course) => course.id)];
        }

        return coursIdsData;
    }, [data]);

    // Handle Func
    const handleSelectTerm = (termType) => {
        if (termVisible && termVisible.length > 0) {
            if (termVisible.includes(termType)) {
                setTermVisible([...termVisible.filter((item) => item !== termType)]);
            } else {
                setTermVisible([...termVisible, termType]);
            }
        } else {
            setTermVisible([termType]);
        }
    };

    return (
        <div>
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
                                <React.Fragment key={index}>
                                    <tr
                                        style={{ backgroundColor: 'rgba(215, 237, 247, 0.15)', cursor: 'pointer' }}
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
                                            {TermProgram.find((item) => item.value === term.termType).label}
                                        </td>
                                        <td
                                            style={{ fontWeight: 'bold', height: '30px', textAlign: 'center' }}
                                            colSpan="1"
                                        >
                                            {term.totalCompulsory + term.totalElective}
                                        </td>
                                        <td style={{ fontWeight: 'bold', height: '30px' }} colSpan="5"></td>
                                    </tr>
                                    {termVisible.includes(term.termType) && (
                                        <>
                                            {term?.programCourses.map((course, courseIndex) => (
                                                <React.Fragment key={courseIndex}>
                                                    {course.type === 'compulsory' && (
                                                        <tr
                                                            style={{
                                                                backgroundColor: 'rgba(215, 237, 247, 0.15)',
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
                                                    {course.type === 'elective' && (
                                                        <tr
                                                            style={{
                                                                backgroundColor: 'rgba(215, 237, 247, 0.15)',
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
                                                                {term.totalElective}
                                                            </td>
                                                            <td
                                                                style={{ fontWeight: 'bold', height: '30px' }}
                                                                colSpan="5"
                                                            ></td>
                                                        </tr>
                                                    )}
                                                    <tr>
                                                        <th style={{ fontWeight: 'normal' }}>{course.code}</th>
                                                        <th style={{ fontWeight: 'normal' }}>{course.name}</th>
                                                        <th style={{ fontWeight: 'normal' }}>
                                                            {course.courseDuration.theory}
                                                        </th>
                                                        <th style={{ fontWeight: 'normal' }}>
                                                            {course.courseDuration.practice}
                                                        </th>
                                                        <th style={{ fontWeight: 'normal' }}>{course.credits}</th>
                                                        <th style={{ fontWeight: 'normal' }}>{term.minimumElective}</th>
                                                        <th
                                                            style={{
                                                                fontWeight: 'normal',
                                                                height: '3rem',
                                                                width: '3rem',
                                                            }}
                                                        >
                                                            {coursCompletedIds &&
                                                            coursCompletedIds?.length > 0 &&
                                                            coursCompletedIds.includes(course.id) ? (
                                                                <i className="pi pi-check flex align-items-center justify-content-center bg-green-300 text-white h-full w-full"></i>
                                                            ) : (
                                                                <i className="pi pi-times flex align-items-center justify-content-center bg-red-300 text-white h-full w-full"></i>
                                                            )}
                                                        </th>
                                                    </tr>
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
