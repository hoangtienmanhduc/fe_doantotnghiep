import { useQuery } from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { getUserId } from '~/components/authentication/AuthUtils';
import { createOrUpdateGenericSpecializationClass } from '~/api/specialization/SpecializationClassService';
import { getListSpecializationInfo } from '~/api/specialization/SpecializationService';
import { Calendar } from 'primereact/calendar';
import { getListLecturerInfo } from '~/api/lecturer/LecturerService';
import { InputNumber } from 'primereact/inputnumber';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const initialPageable = {
    rows: 10,
    pageNumber: 0,
    sortField: 'id',
    sortOrder: -1,
};
const SpecializationClassStudents = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        showForm: handleShowForm,
        hideForm: handleHideForm,
    }));

    const columns = [
        { field: 'username', header: 'Tên người dùng' },
        { field: 'email', header: 'Email' },
        { field: 'firstName', header: 'Tên' },
        { field: 'lastName', header: 'Họ đệm' },
        { field: 'gender', header: 'Giới tính' },
        { field: 'code', header: 'Mã sinh viên' },
        { field: 'dob', header: 'Ngày sinh' },
        { field: 'cinumber', header: 'Số căn cước công dân' },
        { field: 'specializationName', header: 'Thuộc chuyên ngành' },
        { field: 'specializationClassName', header: 'Thuộc lớp chuyên ngành' },
        { field: 'typeOfEducation', header: 'Loại hình đào tạo' },
        { field: 'schoolYear', header: 'Niên khoá' },
        { field: 'address', header: 'Địa chỉ' },
        { field: 'action', header: 'Thao tác' },
    ];
    const [pageable, setPageable] = useState({ ...initialPageable });
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({});
    const toast = useRef(null);
    const [filterRequest, setFilterRequest] = useState({});

    const handleShowForm = useCallback((data) => {
        setData(data && Object.keys(data)?.length > 0 ? { ...data } : {});
        setVisible(true);
    }, []);

    const handleHideForm = useCallback(() => {
        setData({});
        setVisible(false);
    }, []);

    const header = (
        <React.Fragment>
            <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                <p className="text-900 font-bold">DANH SÁCH SINH VIÊN THUỘC LỚP CHUYÊN NGÀNH</p>
                <div className="flex align-items-center ">
                    <Button
                        className="mr-2"
                        icon="pi pi-filter"
                        rounded
                        tooltip="Lọc"
                        raised
                        onClick={() => setVisible(true)}
                    />
                    <Button className="mr-2" icon="pi pi-refresh" rounded raised onClick={() => {}} />
                </div>
            </div>
            <div className="col-12">
                <span className="font-semibold text-primary">
                    <p>Tìm kiếm</p>
                </span>
                <span className="p-input-icon-left w-full">
                    <InputText
                        value={filterRequest?.searchValue || ''}
                        placeholder="Nhập mã sinh viên để tìm kiếm"
                        onChange={(e) => setFilterRequest({ ...filterRequest, searchValue: e.target.value })}
                        className="w-full"
                    />
                </span>
            </div>
        </React.Fragment>
    );

    return (
        <Dialog
            header={
                <h3 className="m-0 p-3 pb-0 font-bold">
                    {`${!!data?.id ? 'Cập nhật thông tin' : 'Thêm mới'} lớp chuyên ngành`}
                    <hr />
                </h3>
            }
            pt={{ header: { className: 'p-0' } }}
            onHide={handleHideForm}
            style={{
                width: '60vw',
            }}
            breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            visible={visible}
        >
            <div className="col-12 p-0">
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
            <hr />
            <div className="flex col-12">
                <Button
                    className="col-12 p-button-lg font-bold"
                    icon={'pi pi-times'}
                    label={'Huỷ bỏ'}
                    onClick={handleHideForm}
                />
            </div>
        </Dialog>
    );
});
export default SpecializationClassStudents;
