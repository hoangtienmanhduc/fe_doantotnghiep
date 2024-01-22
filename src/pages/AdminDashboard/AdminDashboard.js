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
import { Button } from 'primereact/button';
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
            <div className="w-full">
                <div className="flex">
                    <div className="col-3 bg-white border-round-xl ">
                        <h2 className="text-cyan-200 text-center">QUẢN LÝ HỆ THỐNG</h2> <hr className="mb-3" />
                        <ul className="flex flex-column list-none p-0 m-0 overflow-hidden h-full">
                            {tabList.map((item) => (
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
            </div>
        </React.Fragment>
    );
};

export default AdminDashboard;
