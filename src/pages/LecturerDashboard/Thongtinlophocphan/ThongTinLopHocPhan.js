import styles from '~/pages/LecturerDashboard/Thongtinlophocphan/Thongtinlophocphan.module.scss';
import classNames from 'classnames/bind';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { useQuery } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { getSectionClassInfo } from '~/api/section/SectionClassService';
import { useParams } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';
import amiriFont from '../../../assets/images/Amiri-Regular.ttf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
const QueryKey = 'SectionClass-Info';
const Thongtinlophocphan = () => {
    const { id: idString } = useParams();
    const op = useRef();
    const dt = useRef();
    const id = useMemo(() => {
        return !!idString ? parseInt(idString) : null;
    }, [idString]);
    const [tabIndex, setTabIndex] = React.useState('1');

    const handleChange = (index) => {
        setTabIndex(index);
    };

    const { data: sectionClassInfo } = useQuery([QueryKey, getUserId()], () => getSectionClassInfo(getUserId(), id), {
        enabled: !!getUserId() && !!id,
    });

    const exportPdf = useCallback(() => {
        if (sectionClassInfo && sectionClassInfo?.students) {
            const input = document.getElementById('print');

            const opt = {
                filename: `Danh_Sach_Sinh_Vien.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { useCORS: true },
                jsPDF: {
                    unit: 'in',
                    format: 'a4',
                    orientation: 'portrait',
                },
            };

            html2pdf().set(opt).from(input).save();
        }
    }, [sectionClassInfo]);

    return (
        <div style={{ width: '100%' }}>
            <div className="">
                <div>
                    <h2>THÔNG TIN LỚP HỌC PHẦN</h2>
                </div>
            </div>
            <hr />
            <div className="col-12">
                <div className="p-inputgroup flex-1 flex justify-content-end">
                    {tabIndex === '2' && <Button label="In ấn" icon="pi pi-print" onClick={exportPdf} />}
                    <Button
                        label="Xử lý điểm quá trình học tập"
                        icon="pi pi-calculator"
                        onClick={() => window.location.assign(`/quanlydiemquatrinhhoctap/${sectionClassInfo.id}`)}
                    />
                </div>
            </div>
            <TabContext value={tabIndex}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={(e, idx) => handleChange(idx)} aria-label="lab API tabs example">
                        <Tab label="Thông tin về lớp học phần" value="1" />
                        <Tab label="Danh sách sinh viên" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <div className="w-full">
                        <Fieldset legend="Thông tin lớp học phần" className="mb-3">
                            <div className="flex align-items-center w-full">
                                <div className="col-4">
                                    <p>Mã lớp học phần:</p>
                                </div>
                                <div className="col-8">
                                    <p
                                        style={{
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {sectionClassInfo?.code}
                                    </p>
                                </div>
                            </div>
                            <div className="flex align-items-center w-full">
                                <div className="col-4">
                                    <p>Tên lớp học phần:</p>
                                </div>
                                <div className="col-8">
                                    <p
                                        style={{
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {sectionClassInfo?.name}
                                    </p>
                                </div>
                            </div>
                            <div className="flex align-items-center w-full">
                                <div className="col-4">
                                    <p>Giảng viên phụ trách:</p>
                                </div>
                                <div className="col-8">
                                    <p
                                        style={{
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {sectionClassInfo?.lecturerName}
                                    </p>
                                </div>
                            </div>
                        </Fieldset>
                        <Fieldset legend="Thông tin thời gian và lịch học">
                            {sectionClassInfo?.timeAndPlaces?.length > 0 &&
                                sectionClassInfo?.timeAndPlaces.map((timeAndPlace, idx) => {
                                    return (
                                        <div key={idx} className="surface-50 border-round-xl col-12">
                                            <div className="flex align-items-center w-full">
                                                <div className="col-4">
                                                    <p>Tiết học:</p>
                                                </div>
                                                <div className="col-8">
                                                    <p
                                                        style={{
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {timeAndPlace?.periodStart} - {timeAndPlace?.periodEnd}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex align-items-center w-full">
                                                <div className="col-4">
                                                    <p>Phòng học:</p>
                                                </div>
                                                <div className="col-8">
                                                    <p
                                                        style={{
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {timeAndPlace?.room}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </Fieldset>
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div id="print" className="sutface-50 border-round-xl col-12">
                        <div className="flex align-items-center w-full">
                            <div className="col-4">
                                <p>Tên lớp học phần:</p>
                            </div>
                            <div className="col-8">
                                <p
                                    style={{
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {sectionClassInfo?.name}
                                </p>
                            </div>
                        </div>
                        <div className="flex align-items-center w-full">
                            <div className="col-4">
                                <p>Giảng viên phụ trách:</p>
                            </div>
                            <div className="col-8">
                                <p
                                    style={{
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {sectionClassInfo?.lecturerName}
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div className="w-full">
                            <p className="text-xl" style={{ fontWeight: 'bold' }}>
                                Danh sách sinh viên
                            </p>
                            <DataTable
                                ref={dt}
                                value={sectionClassInfo?.students || []}
                                tableStyle={{ minWidth: '50rem' }}
                            >
                                <Column
                                    className="text-center"
                                    field="specializationName"
                                    header="Chuyên ngành"
                                ></Column>
                                <Column className="text-center" field="code" header="Mã số sinh viên"></Column>
                                <Column className="text-center" field="name" header="Họ và tên"></Column>
                                <Column
                                    className="text-center"
                                    field="specializationClassName"
                                    header="Lớp chuyên ngành"
                                ></Column>
                            </DataTable>
                        </div>
                    </div>
                </TabPanel>
            </TabContext>
        </div>
    );
};

export default Thongtinlophocphan;
