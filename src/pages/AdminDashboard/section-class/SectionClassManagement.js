import React, { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { useRef } from 'react';
import { getPageSectionClassInfo } from '~/api/section/SectionClassService';
import SectionClassForm from './SectionClassForm';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Dialog } from 'primereact/dialog';
import ScheduleSectionClass from './ScheduleSectionClass';
import { getListLecturerInfo } from '~/api/lecturer/LecturerService';
import { getListSectionInfo } from '~/api/section/SectionService';
import { Dropdown } from 'primereact/dropdown';
import { SectionClassIsMainOptions, SectionClassTypeOptions } from './SectionClassConstant';
const QueryKeyLecturerOptions = 'Lecturer-Options';
const QueryKeySectionOptions = 'Section-Options';
const QueryKey = 'Section-Class-Management';

const initialPageable = {
    rows: 10,
    pageNumber: 0,
    sortField: 'id',
    sortOrder: -1,
};
const SectionClassManagement = () => {
    const [pageable, setPageable] = useState({ ...initialPageable });
    const [filterRequest, setFilterRequest] = useState({});
    const [visible, setVisible] = useState(false);

    const { data, refetch } = useQuery(
        [
            QueryKey,
            getUserId(),
            pageable.pageNumber,
            pageable.rows,
            pageable.sortField,
            pageable.sortOrder,
            filterRequest,
        ],
        () =>
            getPageSectionClassInfo(
                getUserId(),
                pageable.pageNumber,
                pageable.rows,
                pageable.sortField,
                pageable.sortOrder,
                { ...filterRequest },
            ),
        {
            enabled: !!getUserId(),
        },
    );

    const { data: lecturerOptions } = useQuery(
        [QueryKeyLecturerOptions, getUserId()],
        () => getListLecturerInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );
    const { data: sectionOptions } = useQuery(
        [QueryKeySectionOptions, getUserId()],
        () => getListSectionInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );

    const sectionClassRef = useRef(null);
    const scheduleClassRef = useRef(null);
    const columns = [
        { field: 'sectionName', header: 'Học phần' },
        { field: 'sectionCode', header: 'Mã học phần' },
        { field: 'lecturerName', header: 'Giảng viên phụ trách' },
        { field: 'lecturerCode', header: 'Mã giảng viên' },
        { field: 'code', header: 'Mã lớp học phần' },
        { field: 'name', header: 'Tên lớp học phần' },
        { field: 'minStudents', header: 'Số sinh viên tối thiểu' },
        { field: 'maxStudents', header: 'Số sinh viên tối đa' },
        { field: 'sectionClassType', header: 'Loại lớp học phần' },
        { field: 'sectionClassStatus', header: 'Trạng thái lớp học phần' },
        { field: 'startDate', header: 'Ngày bắt đầu' },
        { field: 'endDate', header: 'Ngày kết thúc' },
        { field: 'note', header: 'Ghi chú' },
        { field: 'createStatus', header: 'Trạng thái tạo lớp' },
        { field: 'timeAndPlaceStatus', header: 'Trạng thái tạo lịch học' },
        { field: 'action', header: 'Thao tác' },
    ];

    const header = (
        <React.Fragment>
            <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                <p className="text-900 font-bold">QUẢN LÝ LỚP HỌC PHẦN</p>
                <div className="flex align-items-center ">
                    <Button
                        className="mr-2"
                        icon="pi pi-filter"
                        rounded
                        tooltip="Lọc"
                        raised
                        onClick={() => setVisible(true)}
                    />
                    <Button className="mr-2" icon="pi pi-refresh" rounded raised onClick={refetch} />
                    <Button icon="pi pi-plus" rounded raised onClick={() => sectionClassRef.current.showForm()} />
                </div>
            </div>
            <div className="col-12">
                <span className="font-semibold text-primary">
                    <p>Tìm kiếm</p>
                </span>
                <span className="p-input-icon-left w-full">
                    <i className="pi pi-search" />
                    <InputText
                        value={filterRequest?.searchValue || ''}
                        placeholder="Nhập mã lớp học phần để tìm kiếm"
                        onChange={(e) => setFilterRequest({ ...filterRequest, searchValue: e.target.value })}
                        className="w-full"
                    />
                </span>
            </div>
        </React.Fragment>
    );

    const queryClient = useQueryClient();
    useEffect(() => {
        if (!!getUserId() && data && !data?.last && data.content?.length > 0) {
            queryClient.prefetchQuery(
                [
                    QueryKey,
                    getUserId(),
                    pageable.pageNumber + 1,
                    pageable.rows,
                    pageable.sortField,
                    pageable.sortOrder,
                    filterRequest,
                ],
                () =>
                    getPageSectionClassInfo(
                        getUserId(),
                        pageable?.pageNumber + 1,
                        pageable?.rows,
                        pageable.sortField,
                        pageable.sortOrder,
                        filterRequest,
                    ),
            );
        }
    }, [data, filterRequest, pageable.pageNumber, pageable.rows, pageable.sortField, pageable.sortOrder, queryClient]);

    return (
        <React.Fragment>
            <div className="card col-12">
                <DataTable
                    value={!!data && data?.content?.length > 0 ? data?.content : []}
                    header={header}
                    tableStyle={{ minWidth: '60rem' }}
                    paginator
                    scrollable
                    resizableColumns
                    stripedRows
                    lazy
                    rows={10}
                    first={pageable.pageNumber * pageable.rows}
                    onPage={(e) => setPageable({ ...pageable, pageNumber: e.page })}
                    totalRecords={data && data.totalElements ? data.totalElements : 0}
                >
                    {columns.map((col, i) => (
                        <Column
                            className="text-center"
                            key={col.field}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(rowData) =>
                                col.field === 'deleted' ? (
                                    rowData[col.field] ? (
                                        <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                            Có
                                        </div>
                                    ) : (
                                        <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                            Không
                                        </div>
                                    )
                                ) : col.field === 'action' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        <Button
                                            text
                                            icon="pi pi-pencil"
                                            tooltip="Chỉnh sửa"
                                            rounded
                                            className="mr-2"
                                            raised
                                            onClick={() => sectionClassRef.current.showForm(rowData)}
                                        />
                                        <Button
                                            text
                                            icon="pi pi-eye"
                                            tooltip="Xem thời khoá biểu"
                                            tooltipOptions={{ position: 'left' }}
                                            rounded
                                            raised
                                            onClick={() => scheduleClassRef.current.showForm(rowData)}
                                        />
                                    </div>
                                ) : col.field === 'sectionClassType' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        {rowData[col.field] === 'theory' ? 'Lý thuyết' : 'Thực hành'}
                                    </div>
                                ) : col.field === 'startDate' || col.field === 'endDate' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        {rowData[col.field] ? new Date(rowData[col.field]).toLocaleDateString() : '-'}
                                    </div>
                                ) : col.field === 'createStatus' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        {!!rowData[col.field] || rowData['sectionClassType'] === 'practice' ? (
                                            <i className="text-white pi pi-check p-2 border-circle bg-green-300"></i>
                                        ) : (
                                            <div>
                                                <i className="text-white pi pi-times p-2 border-circle bg-red-300 mr-2"></i>
                                                <b className="text-red-300">
                                                    Lớp lý thuyết hiện chưa có nhóm lớp thực hành
                                                </b>
                                            </div>
                                        )}
                                    </div>
                                ) : col.field === 'sectionClassStatus' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        {rowData[col.field] === 'open' ? 'Đang mở' : 'Đã đóng'}
                                    </div>
                                ) : col.field === 'timeAndPlaceStatus' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        {!!rowData[col.field] ? (
                                            <i className="text-white pi pi-check p-2 border-circle bg-green-300"></i>
                                        ) : (
                                            <div>
                                                <i className="text-white pi pi-times p-2 border-circle bg-red-300 mr-2"></i>
                                                <b className="text-red-300">Lớp lý thuyết hiện chưa có lịch học</b>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        {rowData[col.field]}
                                    </div>
                                )
                            }
                        />
                    ))}
                </DataTable>
            </div>
            <Dialog
                pt={{ header: { className: 'pb-0' }, headerTitle: { className: 'text-2xl' } }}
                header="Bộ lọc"
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => setVisible(false)}
            >
                <hr />
                <div className="w-full">
                    <div className="grid col-12 justify-content-between align-items-center">
                        <div className="col-12">
                            <span className="font-semibold text-primary">
                                <p>Thuộc học phần</p>
                            </span>
                            <MultiSelect
                                value={filterRequest?.sectionIds || null}
                                onChange={(e) => setFilterRequest({ ...filterRequest, sectionIds: [...e.value] })}
                                options={sectionOptions}
                                optionValue="id"
                                optionLabel="fullName"
                                filter
                                showClear
                                placeholder="Chọn tên học phần để lọc lớp học phần"
                                maxSelectedLabels={3}
                                className="w-full"
                            />
                        </div>
                        <div className="col-12">
                            <span className="font-semibold text-primary">
                                <p>Giảng viên giảng dạy</p>
                            </span>
                            <MultiSelect
                                value={filterRequest?.lecturerIds || null}
                                onChange={(e) => setFilterRequest({ ...filterRequest, lecturerIds: [...e.value] })}
                                options={lecturerOptions}
                                optionLabel="fullName"
                                optionValue="id"
                                filter
                                showClear
                                placeholder="Chọn giảng viên để lọc lớp học phần"
                                maxSelectedLabels={3}
                                className="w-full"
                            />
                        </div>
                        <div className="col-12">
                            <span className="font-semibold text-primary">
                                <p>Loại lớp học phần</p>
                            </span>
                            <span className="w-full">
                                <Dropdown
                                    value={filterRequest?.sectionClassType || null}
                                    onChange={(e) =>
                                        setFilterRequest({ ...filterRequest, sectionClassType: e.target.value })
                                    }
                                    options={SectionClassTypeOptions}
                                    filter
                                    showClear
                                    optionLabel="label"
                                    optionValue="key"
                                    placeholder="Hãy chọn loại lớp của lớp học phần"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12">
                            <span className="font-semibold text-primary">
                                <p>Lớp học phần chính</p>
                            </span>
                            <span className="w-full">
                                <Dropdown
                                    value={
                                        filterRequest?.sectionClassRef === null
                                            ? 'none'
                                            : !filterRequest?.sectionClassRef
                                            ? 'sub'
                                            : !!filterRequest?.sectionClassRef
                                            ? 'main'
                                            : null
                                    }
                                    onChange={(e) => {
                                        if (e?.target.value === 'none') {
                                            setFilterRequest({ ...filterRequest, sectionClassRef: null });
                                        } else if (e?.target.value === 'main') {
                                            setFilterRequest({ ...filterRequest, sectionClassRef: true });
                                        } else if (e?.target.value === 'sub') {
                                            setFilterRequest({ ...filterRequest, sectionClassRef: false });
                                        }
                                    }}
                                    options={SectionClassIsMainOptions}
                                    filter
                                    showClear
                                    optionLabel="label"
                                    optionValue="key"
                                    placeholder="Hãy chọn loại lớp của lớp học phần"
                                    className="w-full"
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </Dialog>
            <SectionClassForm ref={sectionClassRef} />
            <ScheduleSectionClass ref={scheduleClassRef} />
        </React.Fragment>
    );
};

export default SectionClassManagement;
