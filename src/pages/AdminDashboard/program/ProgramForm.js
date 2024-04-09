import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { createOrUpdateGenericCourse, getListCourseInfo } from '~/api/course/CourseService';
import { getUserId } from '~/components/authentication/AuthUtils';
import { Dropdown } from 'primereact/dropdown';
import { useQuery } from '@tanstack/react-query';
import { getListSpecializationInfo } from '~/api/specialization/SpecializationService';
import { Divider } from 'primereact/divider';
import { getListAcademicYearInfo } from '~/api/academic-year/AcademicYearService';
import { Message } from 'primereact/message';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TermProgram } from './ProgramConstant';
import { OverlayPanel } from 'primereact/overlaypanel';
import { MultiSelect } from 'primereact/multiselect';
const QueryKeySpecializationOptions = 'Specialization-Options';
const QueryKeyCourseOptions = 'Course-Options';
const QueryKeyAcademicOptions = 'Academic-Options';
const ProgramForm = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        showForm: handleShowForm,
        hideForm: handleHideForm,
    }));

    // State
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({});
    const [selectedTerm, setSelectedTerm] = useState(0);
    const [termsData, setTermsData] = useState({});
    const toast = useRef(null);
    const op = useRef(null);
    // Use Query
    const { data: specializationOptions } = useQuery(
        [QueryKeySpecializationOptions, getUserId()],
        () => getListSpecializationInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );

    const { data: academicYearOptions } = useQuery(
        [QueryKeyAcademicOptions, getUserId()],
        () => getListAcademicYearInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );

    const { data: courseOptions } = useQuery(
        [QueryKeyCourseOptions, getUserId()],
        () => getListCourseInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );

    // Handle Func
    const handleShowForm = useCallback((data) => {
        if (!!data && Object.keys(data)?.length > 0) {
            setData({ ...data });
        }
        setVisible(true);
    }, []);

    const handleHideForm = useCallback(() => {
        setData({});
        setVisible(false);
    }, []);

    const handleOnChange = useCallback(
        (key, value) => {
            setData({ ...data, [key]: value });
        },
        [data],
    );

    const handleOnChangeProgramCourse = useCallback(
        (value) => {
            if (!!selectedTerm && selectedTerm > 0) {
                const key = TermProgram.find((item) => item.key === selectedTerm).value;
                if (!!key) {
                    setTermsData({ ...termsData, [key]: [...value] });
                }
            }
        },
        [selectedTerm, termsData],
    );

    const handleOnSubmit = useCallback(async () => {
        let isError = false;

        if (!data?.academicYearId) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Năm học của chương trình đào tạo không dược để trống!!',
            });
            isError = true;
        }

        if (!data?.specializationId) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Chuyên ngành của chương trình đào tạo không dược để trống!!',
            });
            isError = true;
        }

        if (!isError) {
            let toPostData = {
                ...data,
            };
            const programData = await createOrUpdateGenericCourse(getUserId(), toPostData);

            if (programData?.id) {
                try {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Thao tác cập nhật chương trình đào tạo thành công!!',
                    });
                } catch (err) {
                    console.log('Tải lại bảng không thành công');
                }

                handleHideForm();
            }
        }
    }, [data, handleHideForm]);

    const renderTermProgram = useCallback(() => {
        let htmlHolder = [];

        htmlHolder.push(
            <div className="w-full surface-100 border-round mb-3">
                <div className="flex justify-content-between col-12 border-bottom-1 border-500">
                    <h3 className="text-primary ml-2">Học kỳ</h3>
                    <Button
                        icon={'pi pi-plus'}
                        label={'Thêm môn học mới'}
                        onClick={(e) => {
                            op.current.toggle(e);
                        }}
                    />
                </div>
                <div className="col-12">
                    <div className="w-full m-2">
                        <DataTable
                            // value={termsData[TermProgram.find((item) => item.key === i).value] || []}
                            value={[]}
                            header={<h3 className="text-primary">Môn học trong học kỳ</h3>}
                            emptyMessage="Hiện chưa có môn học nào"
                            tableStyle={{ minWidth: '50rem' }}
                        >
                            <Column
                                field="name"
                                header="Tên môn học"
                                body={(rowData) => (
                                    <div
                                        className="flex justify-content-center overflow-dot overflow-text-2"
                                        style={{ width: '100%' }}
                                    >
                                        {rowData['name']}
                                    </div>
                                )}
                            ></Column>
                            <Column
                                field="action"
                                header="Thao tác"
                                body={(rowData) => (
                                    <div
                                        className="flex justify-content-center overflow-dot overflow-text-2"
                                        style={{ width: '100%' }}
                                    >
                                        <Button text icon="pi pi-trash" rounded raised onClick={() => {}} />
                                    </div>
                                )}
                            ></Column>
                        </DataTable>
                    </div>
                </div>
            </div>,
        );

        return htmlHolder;
    }, []);

    return (
        <>
            <Dialog
                header={
                    <h3 className="m-0 p-3 pb-0 font-bold">
                        {`${!!data?.id ? 'Cập nhật thông tin' : 'Thêm mới'} chương trình đào tạo`}
                        <hr />
                    </h3>
                }
                onHide={handleHideForm}
                style={{
                    width: '60vw',
                }}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                visible={visible}
                pt={{ header: { className: 'p-0' } }}
            >
                <div>
                    <div className="col-12 p-0">
                        <Divider align="left">
                            <div className="inline-flex align-items-center">
                                <i className="pi pi-bars mr-2"></i>
                                <h3 className="p-0 m-0">Thông tin của chương trình đào tạo</h3>
                            </div>
                        </Divider>
                        <div className="col-12 p-0">
                            <p>Năm học của chương trình đào tạo</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.academicYearId || null}
                                    onChange={(e) => handleOnChange('academicYearId', e?.target.value)}
                                    options={academicYearOptions}
                                    optionLabel="name"
                                    optionValue="id"
                                    placeholder="Hãy chọn năm học của chương trình đào tạo (Bắt buộc)"
                                    className="w-full"
                                />
                            </span>
                        </div>

                        <div className="col-12 p-0">
                            <p>Chuyên ngành của môn học</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.specializationId || null}
                                    onChange={(e) => handleOnChange('specializationId', e?.target.value)}
                                    options={specializationOptions}
                                    optionLabel="name"
                                    optionValue="id"
                                    placeholder="Hãy chọn chuyên ngành của chương trình đào tạo (Bắt buộc)"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <Divider align="left">
                            <div className="inline-flex align-items-center">
                                <i className="pi pi-bookmark mr-2"></i>
                                <h3 className="p-0 m-0">Thông tin các học kỳ đào tạo</h3>
                            </div>
                        </Divider>
                        {data?.programTerms?.length < 1 ? (
                            <div className="w-full">
                                <Message
                                    className="w-full"
                                    text="Hiện chưa có học kỳ đào tạo nào (Hãy thêm học kỳ đào tạo)"
                                    severity="warn"
                                />
                            </div>
                        ) : (
                            <div className="w-full">{renderTermProgram()}</div>
                        )}
                    </div>
                    <hr />
                    <div className="flex col-12">
                        <Button
                            className={`col-6 mr-2`}
                            icon={'pi pi-send'}
                            label={'Xác nhận'}
                            onClick={handleOnSubmit}
                        />

                        <Button className="col-6" icon={'pi pi-times'} label={'Huỷ bỏ'} onClick={handleHideForm} />
                    </div>
                </div>
            </Dialog>
            <OverlayPanel ref={op} showCloseIcon closeOnEscape onHide={() => setSelectedTerm(null)}>
                <div className="col-12 p-0">
                    <p>Các môn học</p>
                    <span className="w-full">
                        <MultiSelect
                            value={
                                (!!selectedTerm &&
                                    selectedTerm > 0 &&
                                    !!termsData &&
                                    !!termsData[TermProgram.find((item) => item.key === selectedTerm).value] &&
                                    termsData[TermProgram.find((item) => item.key === selectedTerm).value]) ||
                                []
                            }
                            filter
                            onChange={(e) => handleOnChangeProgramCourse(e.target.value)}
                            options={courseOptions}
                            optionLabel="name"
                            placeholder="Hãy chọn các môn học "
                            maxSelectedLabels={1}
                            className="w-full"
                        />
                    </span>
                </div>
            </OverlayPanel>
            <Toast ref={toast} />
        </>
    );
});

export default ProgramForm;
