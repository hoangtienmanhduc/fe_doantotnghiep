import React, { useCallback, useMemo } from 'react';
import { Ripple } from 'primereact/ripple';
import { useState } from 'react';
import CouseManagement from './course/CouseManagement';
import { clearStorage, getUserRole } from '~/components/authentication/AuthUtils';
import SectionManagement from './section/SectionManagement';
import SectionClassManagement from './section-class/SectionClassManagement';
import AcademicYearManagement from './academic-year/AcademicYearManagement';
import FacultyManagement from './faculty/FacultyManagement';
import LecturerManagement from './lecturer/LecturerManagement';
import StudentManagement from './student/StudentManagement';
import SpecializationClassManagement from './specialization-class/SpecializationClassManagement';
import SpecializationManagement from './specialization/SpecializationManagement';
import { Button } from 'primereact/button';
import ProgramManagement from './program/ProgramManagement';
import StaffManagement from './staff/StaffManagement';
import { UserRoles } from '~/App';
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('academicYearManagement');

    const tabListFilter = useMemo(() => {
        const tabList = [
            { key: 'staffManagement', label: 'QUẢN LÝ NHÂN VIÊN', icon: 'pi pi-th-large' },
            { key: 'academicYearManagement', label: 'QUẢN LÝ NIÊN KHOÁ', icon: 'pi pi-th-large' },
            { key: 'facultyManagement', label: 'QUẢN LÝ KHOA', icon: 'pi pi-th-large' },
            { key: 'specializationManagement', label: 'QUẢN LÝ CHUYÊN NGÀNH', icon: 'pi pi-th-large' },
            { key: 'programManagement', label: 'QUẢN LÝ CHƯƠNG TRÌNH ĐÀO TẠO', icon: 'pi pi-tag' },
            {
                key: 'specializationClassManagement',
                label: 'QUẢN LÝ LỚP CHUYÊN NGÀNH',
                icon: 'pi pi-th-large',
                component: '',
            },
            { key: 'courseManagement', label: 'QUẢN LÝ MÔN HỌC', icon: 'pi pi-tag' },
            { key: 'sectionManagement', label: 'QUẢN LÝ HỌC PHẦN', icon: 'pi pi-tags' },
            { key: 'sectionClassManagement', label: 'QUẢN LÝ LỚP HỌC PHẦN', icon: 'pi pi-tablet' },

            { key: 'studentManagement', label: 'QUẢN LÝ SINH VIÊN', icon: 'pi pi-user' },
            { key: 'lecturerManagement', label: 'QUẢN LÝ GIẢNG VIÊN', icon: 'pi pi-users' },
        ];

        if (getUserRole() === UserRoles.STAFF) {
            return tabList.filter((item) => item?.key !== 'staffManagement');
        } else {
            return tabList;
        }
    }, []);

    const handleOnClick = useCallback((item) => {
        setActiveTab(item.key);
    }, []);

    return (
        <React.Fragment>
            <div className="w-full flex">
                <div className="col-3 bg-white border-round-xl">
                    <h2 className="text-cyan-200 text-center">QUẢN LÝ HỆ THỐNG</h2> <hr className="mb-3" />
                    <ul className="flex flex-column list-none p-0 m-0 overflow-hidden h-full">
                        {tabListFilter.map((item) => (
                            <li
                                key={item.key}
                                className={`m-2 p-2 border-round hover:text-white hover:bg-cyan-200 hover:border-gray-100 ${
                                    activeTab === item?.key ? 'bg-primary text-white' : 'surface-100 text-primary '
                                }`}
                            >
                                <div
                                    onClick={() => handleOnClick(item)}
                                    className="p-2 no-underline flex align-items-center cursor-pointer border-1 border-transparent transition-duration-150 transition-colors"
                                >
                                    <i className={`${item.icon} px-4 text-3xl`}></i>
                                    <p className="font-bold m-0">{item.label}</p> <Ripple />
                                </div>
                            </li>
                        ))}
                        <li className="mt-auto border-top-1 mb-5 surface-border p-2">
                            <Button className="w-full" onClick={clearStorage} icon="pi pi-sign-out" />
                        </li>
                    </ul>
                </div>
                <div className="col-9 bg-white border-round-xl">
                    {activeTab === 'staffManagement' && getUserRole() === UserRoles.ADMIN && <StaffManagement />}
                    {activeTab === 'courseManagement' && <CouseManagement />}
                    {activeTab === 'programManagement' && <ProgramManagement />}
                    {activeTab === 'sectionManagement' && <SectionManagement />}
                    {activeTab === 'sectionClassManagement' && <SectionClassManagement />}
                    {activeTab === 'studentManagement' && <StudentManagement />}
                    {activeTab === 'lecturerManagement' && <LecturerManagement />}
                    {activeTab === 'specializationManagement' && <SpecializationManagement />}
                    {activeTab === 'specializationClassManagement' && <SpecializationClassManagement />}
                    {activeTab === 'academicYearManagement' && <AcademicYearManagement />}
                    {activeTab === 'facultyManagement' && <FacultyManagement />}
                </div>
            </div>
        </React.Fragment>
    );
};

export default AdminDashboard;
