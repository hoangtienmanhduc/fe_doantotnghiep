import React, { useCallback } from 'react';
import { Ripple } from 'primereact/ripple';
import { useState } from 'react';
import CouseManagement from './course/CouseManagement';
import { clearStorage } from '~/components/authentication/AuthUtils';
import SectionManagement from './section/SectionManagement';
import SectionClassManagement from './section-class/SectionClassManagement';
import AcademicYearManagement from './academic-year/AcademicYearManagement';
import FacultyManagement from './faculty/FacultyManagement';
import LecturerManagement from './lecturer/LecturerManagement';
import StudentManagement from './student/StudentManagement';
import SpecializationClassManagement from './specialization-class/SpecializationClassManagement';
import SpecializationManagement from './specialization/SpecializationManagement';
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('academicYearManagement');
    const tabList = [
        { key: 'academicYearManagement', label: 'Academic Year Management', icon: 'pi pi-th-large', component: '' },
        { key: 'facultyManagement', label: 'Faculty Management', icon: 'pi pi-th-large', component: '' },
        { key: 'specializationManagement', label: 'Specialization Management', icon: 'pi pi-th-large', component: '' },
        {
            key: 'specializationClassManagement',
            label: 'Specialization Class Management',
            icon: 'pi pi-th-large',
            component: '',
        },
        { key: 'courseManagement', label: 'Course Management', icon: 'pi pi-tag', component: CouseManagement },
        { key: 'sectionManagement', label: 'Section Management', icon: 'pi pi-tags', component: '' },
        { key: 'sectionClassManagement', label: 'Section Class Management', icon: 'pi pi-tablet', component: '' },

        { key: 'studentManagement', label: 'Student Management', icon: 'pi pi-user', component: '' },
        { key: 'lecturerManagement', label: 'Lecturer Management', icon: 'pi pi-users', component: '' },
    ];

    const handleOnClick = useCallback((item) => {
        setActiveTab(item.key);
    }, []);

    return (
        <React.Fragment>
            <div className="h-screen py-5 flex justify-content-center col-12">
                <div className="col-3 bg-white border-round-xl m-3">
                    <h3 className="p-4 text-blue-200">Admin Dashboard</h3> <hr className="mb-3" />
                    <ul className="list-none p-0 m-0 overflow-hidden bg-blue-100">
                        {tabList.map((item) => (
                            <li
                                key={item.key}
                                className={`m-2 ${
                                    activeTab === item?.key ? 'bg-white text-blue-400 ' : 'bg-blue-400 text-white'
                                }`}
                            >
                                <a
                                    onClick={() => handleOnClick(item)}
                                    className="p-4 no-underline flex align-items-center cursor-pointer border-1 border-transparent hover:text-white  hover:bg-blue-200 hover:border-gray-100 transition-duration-150 transition-colors"
                                >
                                    <i className={`${item.icon} px-4 text-3xl`}></i>
                                    <p className="font-bold m-0">{item.label}</p> <Ripple />
                                </a>
                            </li>
                        ))}
                        <li className="mt-auto border-top-1 mb-5 surface-border p-2 flex justify-content-end">
                            <a
                                href="/"
                                className="p-ripple cursor-pointer inline-flex align-items-center justify-content-center bg-pink-500 text-white border-2 border-pink-600 hover:bg-pink-600 text-600 transition-colors transition-duration-150 border-circle"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                }}
                                onClick={clearStorage}
                            >
                                <i className="pi pi-sign-out text-xl"></i>
                                <Ripple />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-9 bg-white border-round-xl">
                    {activeTab === 'courseManagement' && <CouseManagement />}
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
