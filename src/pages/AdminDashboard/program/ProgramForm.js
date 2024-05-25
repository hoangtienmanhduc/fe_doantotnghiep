import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useMemo, useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { getListCourseInfo } from '~/api/course/CourseService';
import { getUserId } from '~/components/authentication/AuthUtils';
import { Dropdown } from 'primereact/dropdown';
import { useQuery } from '@tanstack/react-query';
import { getListSpecializationInfo } from '~/api/specialization/SpecializationService';
import { Divider } from 'primereact/divider';
import { getListAcademicYearInfo } from '~/api/academic-year/AcademicYearService';
import { Message } from 'primereact/message';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { TermProgram } from './ProgramConstant';
import { OverlayPanel } from 'primereact/overlaypanel';
import { MultiSelect } from 'primereact/multiselect';
import { createOrUpdatedateProgram } from '~/api/program/ProgramSevice';
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
    const [termData, setTermData] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState({});
    const toast = useRef(null);
    const opCompulsory = useRef(null);
    const opElective = useRef(null);
    const [isEditProgramTerm, setIsEditProgramTerm] = useState(false);
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

    const { data: courseCompulsoryOptions } = useQuery(
        [QueryKeyCourseOptions, getUserId(), 'compulsory'],
        () => getListCourseInfo(getUserId(), { courseType: 'compulsory' }, null, true),
        { enabled: !!getUserId() },
    );

    // Course Elective
    const { data: courseElectiveOptions } = useQuery(
        [QueryKeyCourseOptions, getUserId(), 'elective'],
        () => getListCourseInfo(getUserId(), { courseType: 'elective' }, null, true),
        { enabled: !!getUserId() },
    );

    const allCourseIdSelected = useMemo(() => {
        let allCompulsoryCourses = new Set([]);
        let allElectiveCourses = new Set([]);

        if (!!termData && termData.length > 0) {
            for (let i = 0; i < termData.length; i++) {
                if (termData[i]?.programCompulsoryCourses && termData[i].programCompulsoryCourses.length > 0) {
                    termData[i].programCompulsoryCourses.forEach((course) => {
                        allCompulsoryCourses.add(course.id);
                    });
                }

                if (termData[i]?.programElectiveCourses && termData[i].programElectiveCourses.length > 0) {
                    termData[i].programElectiveCourses.forEach((course) => {
                        allElectiveCourses.add(course.id);
                    });
                }
            }
        }

        return {
            programCompulsoryCourses: allCompulsoryCourses,
            programElectiveCourses: allElectiveCourses,
        };
    }, [termData]);

    const courseCompulsoryOptionsFilter = useMemo(() => {
        let courseOptionsFilter =
            courseCompulsoryOptions && courseCompulsoryOptions.length > 0 ? [...courseCompulsoryOptions] : [];
        if (
            allCourseIdSelected &&
            allCourseIdSelected?.programCompulsoryCourses &&
            allCourseIdSelected?.programCompulsoryCourses.size > 0
        ) {
            let filterList = courseOptionsFilter.filter(
                (course) => !allCourseIdSelected.programCompulsoryCourses.has(course.id),
            );

            if (selectedTerm?.programCompulsoryCourses && selectedTerm?.programCompulsoryCourses?.length > 0) {
                courseOptionsFilter = [...selectedTerm?.programCompulsoryCourses, ...filterList];
            } else {
                courseOptionsFilter = [...filterList];
            }
        }

        return courseOptionsFilter;
    }, [allCourseIdSelected, courseCompulsoryOptions, selectedTerm]);

    const courseElectiveOptionsFilter = useMemo(() => {
        let courseOptionsFilter =
            courseElectiveOptions && courseElectiveOptions.length > 0 ? [...courseElectiveOptions] : [];

        if (
            allCourseIdSelected &&
            allCourseIdSelected?.programElectiveCourses &&
            allCourseIdSelected?.programElectiveCourses.size > 0
        ) {
            let filterList = courseOptionsFilter.filter(
                (course) => !allCourseIdSelected.programElectiveCourses.has(course.id),
            );

            if (selectedTerm?.programElectiveCourses && selectedTerm?.programElectiveCourses?.length > 0) {
                courseOptionsFilter = [...selectedTerm?.programElectiveCourses, ...filterList];
            } else {
                courseOptionsFilter = [...filterList];
            }
        }

        return courseOptionsFilter;
    }, [allCourseIdSelected, courseElectiveOptions, selectedTerm]);

    const programTerms = useMemo(() => {
        let finalData = [];
        if (data && data?.trainingTime && data?.trainingTime > 0) {
            let totalProgramTerms = data.trainingTime * 2;

            for (let i = 0; i < totalProgramTerms; i++) {
                let term = TermProgram[i];
                if (
                    data?.programTerms &&
                    data.programTerms.length > 0 &&
                    data.programTerms.some((item) => item?.termType === term.value)
                ) {
                    const programTerm = data.programTerms.find((item) => item?.termType === term.value);
                    finalData.push({ ...programTerm });
                } else {
                    finalData.push({
                        programCompulsoryCourses: [],
                        minimumElective: 0,
                        programElectiveCourses: [],
                        termType: term.value,
                    });
                }
            }
        } else {
            finalData.push({
                programCompulsoryCourses: [],
                minimumElective: 0,
                programElectiveCourses: [],
                termType: 'term_first',
            });
        }

        return finalData;
    }, [data]);

    // Handle Func
    const handleShowForm = useCallback((data) => {
        if (!!data && Object.keys(data)?.length > 0) {
            setData({ ...data });

            if (data?.programTerms && data.programTerms.length > 0) {
                setTermData([...data.programTerms]);
            }
        }

        setVisible(true);
    }, []);

    const handleHideForm = useCallback(() => {
        setData({});
        setTermData([]);
        setSelectedTerm({});
        setVisible(false);
        setIsEditProgramTerm(false);
    }, []);

    const handleOnChange = useCallback(
        (key, value) => {
            setData({ ...data, [key]: value });
        },
        [data],
    );

    const handleOnChangeCourseInTerm = useCallback(
        (type, courses) => {
            if (courses) {
                if (type === 'programElectiveCourses') {
                    let minimumElective = 0;

                    if (courses && courses?.length > 0) {
                        minimumElective = courses.reduce((sum, course) => (sum = course?.credits), 0);
                    }
                    setSelectedTerm({ ...selectedTerm, [type]: [...courses], minimumElective: minimumElective });
                } else {
                    setSelectedTerm({ ...selectedTerm, [type]: [...courses] });
                }
            }
        },
        [selectedTerm],
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
                programTerms: [...termData],
            };
            const programData = await createOrUpdatedateProgram(getUserId(), toPostData);

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
    }, [data, handleHideForm, termData]);

    const handleOnSubmitProgramTerm = useCallback(() => {
        let isError = false;
        if (!selectedTerm?.termType) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Loại học kỳ của chương trình đào tạo không dược để trống!!',
            });
            isError = true;
        }

        if (!isError) {
            const toSaveTermData = {
                ...selectedTerm,
            };

            if (termData && termData?.length < 1) {
                setTermData([toSaveTermData]);
            } else {
                if (termData.some((term) => term?.termType === toSaveTermData.termType)) {
                    termData[termData.findIndex((term) => term?.termType === toSaveTermData.termType)] = toSaveTermData;
                    setTermData([...termData]);
                } else {
                    setTermData([...termData, toSaveTermData]);
                }
            }

            setSelectedTerm({});
            setIsEditProgramTerm(false);
        }
    }, [selectedTerm, termData]);

    const handleDeleteCourse = useCallback(
        (type, courseId) => {
            if (selectedTerm) {
                let filterCourses = [];

                if (type === 'compulsory') {
                    filterCourses = selectedTerm?.programCompulsoryCourses.filter((course) => course.id !== courseId);
                    setSelectedTerm({ ...selectedTerm, programCompulsoryCourses: [...filterCourses] });
                } else if (type === 'elective') {
                    filterCourses = selectedTerm?.programElectiveCourses.filter((course) => course.id !== courseId);
                    setSelectedTerm({ ...selectedTerm, programElectiveCourses: [...filterCourses] });
                }
            }
        },
        [selectedTerm],
    );

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
                    width: '80vw',
                }}
                breakpoints={{ '960px': '95vw', '641px': '100vw' }}
                visible={visible}
                pt={{ header: { className: 'p-0' } }}
            >
                {console.log(data)}
                {!isEditProgramTerm ? (
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
                                        options={academicYearOptions || []}
                                        optionLabel="name"
                                        optionValue="id"
                                        placeholder="Hãy chọn năm học của chương trình đào tạo (Bắt buộc)"
                                        className="w-full"
                                    />
                                </span>
                            </div>
                            <div className="col-12 p-0">
                                <p>Chuyên ngành</p>
                                <span className="w-full">
                                    <Dropdown
                                        value={data?.specializationId || null}
                                        onChange={(e) => handleOnChange('specializationId', e?.target.value)}
                                        options={specializationOptions || []}
                                        optionLabel="name"
                                        optionValue="id"
                                        placeholder="Hãy chọn chuyên ngành của chương trình đào tạo (Bắt buộc)"
                                        className="w-full"
                                    />
                                </span>
                            </div>
                            <div className="col-12 p-0">
                                <p>Đơn vị thời gian đào tạo của chương trình (Năm)</p>
                                <span className="w-full">
                                    <InputNumber
                                        value={data?.trainingTime || 0}
                                        maxFractionDigits={2}
                                        max={8}
                                        min={0}
                                        showButtons
                                        step={0.5}
                                        placeholder="Nhập số năm đào tạo của chương trình đào tạo (Bắt buộc)"
                                        onChange={(e) => handleOnChange('trainingTime', e?.value)}
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

                            {data?.trainingTime && data?.trainingTime > 0 ? (
                                <div className="grid col-12">
                                    {programTerms &&
                                        programTerms?.length > 0 &&
                                        programTerms.map((term, idx) => {
                                            return (
                                                <div
                                                    key={idx}
                                                    className="col-12 m-2 surface-100 border-round-xl flex align-items-center justify-content-between"
                                                >
                                                    <h3 className="ml-2">
                                                        {
                                                            TermProgram.find((item) => item.value === term.termType)
                                                                ?.label
                                                        }
                                                    </h3>
                                                    <div className="">
                                                        <Button
                                                            icon={'pi pi-eye'}
                                                            label={'Chi tiết học kỳ'}
                                                            onClick={() => {
                                                                setIsEditProgramTerm(true);
                                                                setSelectedTerm(term);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            ) : (
                                <div className="w-full">
                                    <Message
                                        className="w-full"
                                        text="Hiện chưa có học kỳ đào tạo nào (Hãy số năm đào tạo cho chương trình)"
                                        severity="warn"
                                    />
                                </div>
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
                ) : (
                    <div className="w-full">
                        <div className="col-12 flex justify-content-start">
                            <Button
                                icon={'pi pi-arrow-left'}
                                label={'Trở về'}
                                onClick={() => {
                                    setSelectedTerm({});
                                    setIsEditProgramTerm(false);
                                }}
                            />
                        </div>
                        <div className="col-12 p-0">
                            <Divider align="left">
                                <div className="inline-flex align-items-center">
                                    <i className="pi pi-history mr-2"></i>
                                    <h3 className="p-0 m-0">Thông tin của học kỳ đào tạo</h3>
                                </div>
                            </Divider>
                            <div className="col-12">
                                <p>Loại học kỳ của chương trình đào tạo</p>
                                <span className="w-full">
                                    <Dropdown
                                        disabled={true}
                                        value={selectedTerm?.termType || null}
                                        onChange={(e) => setSelectedTerm({ ...selectedTerm, termType: e.target.value })}
                                        options={TermProgram || []}
                                        optionLabel="label"
                                        optionValue="value"
                                        placeholder="Hãy chọn chuyên ngành của chương trình đào tạo (Bắt buộc)"
                                        className="w-full"
                                    />
                                </span>
                            </div>
                            <Divider align="left">
                                <div className="inline-flex align-items-center">
                                    <i className="pi pi-list mr-2"></i>
                                    <h3 className="p-0 m-0">Các môn học trong kỳ đào tạo</h3>
                                </div>
                            </Divider>
                            <div className="col-12 p-0">
                                <div className="w-full surface-100 border-round">
                                    <div className="flex justify-content-end col-12">
                                        <Button
                                            icon={'pi pi-plus'}
                                            label={'Thêm môn học mới'}
                                            onClick={(e) => {
                                                opCompulsory.current.toggle(e);
                                            }}
                                        />
                                    </div>
                                    <div className="col-12 mb-2">
                                        <div className="w-full">
                                            {console.log(selectedTerm?.programCompulsoryCourses)}
                                            <DataTable
                                                value={selectedTerm?.programCompulsoryCourses || []}
                                                emptyMessage="Hiện chưa có môn học bắt buộc nào"
                                                header={<h3 className="text-primary p-0 m-0">MÔN HỌC BẮT BUỘC</h3>}
                                                tableStyle={{ minWidth: '50rem' }}
                                            >
                                                <Column
                                                    field="code"
                                                    header="Mã môn học"
                                                    body={(rowData) => (
                                                        <div
                                                            className="flex justify-content-center overflow-dot overflow-text-2"
                                                            style={{ width: '100%' }}
                                                        >
                                                            {rowData['code']}
                                                        </div>
                                                    )}
                                                ></Column>
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
                                                    field="courseType"
                                                    header="Loại môn học"
                                                    body={(rowData) => (
                                                        <div
                                                            className="flex justify-content-center overflow-dot overflow-text-2"
                                                            style={{ width: '100%' }}
                                                        >
                                                            {rowData['courseType'] === 'elective'
                                                                ? 'Tự chọn'
                                                                : 'Bắt buộc'}
                                                        </div>
                                                    )}
                                                ></Column>
                                                <Column
                                                    field="credits"
                                                    header="Số tín chỉ"
                                                    body={(rowData) => (
                                                        <div
                                                            className="flex justify-content-center overflow-dot overflow-text-2"
                                                            style={{ width: '100%' }}
                                                        >
                                                            {rowData['credits']}
                                                        </div>
                                                    )}
                                                ></Column>
                                                <Column
                                                    field="courseDurationValue"
                                                    header="Thời lượng môn học"
                                                    body={(rowData) => (
                                                        <div
                                                            className="flex justify-content-center overflow-dot overflow-text-2"
                                                            style={{ width: '100%' }}
                                                        >
                                                            {rowData['courseDurationValue']}
                                                        </div>
                                                    )}
                                                ></Column>
                                                <Column
                                                    field="requireCourseValue"
                                                    header="Điều kiện tiên quyết"
                                                    body={(rowData) => (
                                                        <div
                                                            className="flex justify-content-center overflow-dot overflow-text-2"
                                                            style={{ width: '100%' }}
                                                        >
                                                            {rowData['requireCourseValue']}
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
                                                            <Button
                                                                text
                                                                icon="pi pi-trash"
                                                                rounded
                                                                raised
                                                                onClick={() =>
                                                                    handleDeleteCourse('compulsory', rowData?.id)
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                ></Column>
                                            </DataTable>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="col-12 mb-2">
                                <p className="font-bold">Số tín chỉ môn tự chọn tối thiểu</p>
                                <span className="w-full">
                                    <InputNumber
                                        value={selectedTerm?.minimumElective || 0}
                                        placeholder="Nhập số tín chỉ môn tự chọn tối thiểu (Không bắt buộc)"
                                        onChange={(e) => setSelectedTerm({ ...selectedTerm, minimumElective: e.value })}
                                        className="w-full"
                                    />
                                </span>
                            </div>
                            <div className="col-12 p-0">
                                <div className="w-full surface-100 border-round mb-3">
                                    <div className="flex justify-content-end col-12">
                                        <Button
                                            icon={'pi pi-plus'}
                                            label={'Thêm môn học mới'}
                                            onClick={(e) => {
                                                opElective.current.toggle(e);
                                            }}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <div className="w-full">
                                            <DataTable
                                                value={selectedTerm?.programElectiveCourses || []}
                                                header={<h3 className="text-primary p-0 m-0">MÔN HỌC TỰ CHỌN</h3>}
                                                emptyMessage="Hiện chưa có môn học tự chọn nào"
                                                tableStyle={{ minWidth: '50rem' }}
                                            >
                                                <Column
                                                    field="code"
                                                    header="Mã môn học"
                                                    body={(rowData) => (
                                                        <div
                                                            className="flex justify-content-center overflow-dot overflow-text-2"
                                                            style={{ width: '100%' }}
                                                        >
                                                            {rowData['code']}
                                                        </div>
                                                    )}
                                                ></Column>
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
                                                    field="courseType"
                                                    header="Loại môn học"
                                                    body={(rowData) => (
                                                        <div
                                                            className="flex justify-content-center overflow-dot overflow-text-2"
                                                            style={{ width: '100%' }}
                                                        >
                                                            {rowData['courseType'] === 'elective'
                                                                ? 'Tự chọn'
                                                                : 'Bắt buộc'}
                                                        </div>
                                                    )}
                                                ></Column>
                                                <Column
                                                    field="credits"
                                                    header="Số tín chỉ"
                                                    body={(rowData) => (
                                                        <div
                                                            className="flex justify-content-center overflow-dot overflow-text-2"
                                                            style={{ width: '100%' }}
                                                        >
                                                            {rowData['credits']}
                                                        </div>
                                                    )}
                                                ></Column>
                                                <Column
                                                    field="courseDurationValue"
                                                    header="Thời lượng môn học"
                                                    body={(rowData) => (
                                                        <div
                                                            className="flex justify-content-center overflow-dot overflow-text-2"
                                                            style={{ width: '100%' }}
                                                        >
                                                            {rowData['courseDurationValue']}
                                                        </div>
                                                    )}
                                                ></Column>
                                                <Column
                                                    field="requireCourseValue"
                                                    header="Điều kiện tiên quyết"
                                                    body={(rowData) => (
                                                        <div
                                                            className="flex justify-content-center overflow-dot overflow-text-2"
                                                            style={{ width: '100%' }}
                                                        >
                                                            {rowData['requireCourseValue']}
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
                                                            <Button
                                                                text
                                                                icon="pi pi-trash"
                                                                rounded
                                                                raised
                                                                onClick={() =>
                                                                    handleDeleteCourse('elective', rowData?.id)
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                ></Column>
                                            </DataTable>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="flex col-12">
                                <Button
                                    className={`col-12 mr-2`}
                                    icon={'pi pi-send'}
                                    label={'Xác nhận'}
                                    onClick={handleOnSubmitProgramTerm}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </Dialog>
            <OverlayPanel ref={opCompulsory} showCloseIcon closeOnEscape>
                <div className="col-12 p-0">
                    <p>Các môn học bắt buộc</p>
                    <span className="w-full">
                        <MultiSelect
                            value={selectedTerm?.programCompulsoryCourses || []}
                            filter
                            onChange={(e) => handleOnChangeCourseInTerm('programCompulsoryCourses', e.target.value)}
                            options={courseCompulsoryOptionsFilter || []}
                            optionLabel="name"
                            placeholder="Hãy chọn các môn học bắt buộc"
                            maxSelectedLabels={3}
                            display="chip"
                            className="w-full md:w-20rem"
                        />
                    </span>
                </div>
            </OverlayPanel>
            <OverlayPanel ref={opElective} showCloseIcon closeOnEscape>
                <div className="col-12 p-0">
                    <p>Các môn học tự chọn</p>
                    <span className="w-full">
                        <MultiSelect
                            value={selectedTerm?.programElectiveCourses || []}
                            filter
                            onChange={(e) => handleOnChangeCourseInTerm('programElectiveCourses', e.target.value)}
                            options={courseElectiveOptionsFilter || []}
                            optionLabel="name"
                            placeholder="Hãy chọn các môn học tự chọn"
                            maxSelectedLabels={3}
                            display="chip"
                            className="w-full md:w-20rem"
                        />
                    </span>
                </div>
            </OverlayPanel>
            <Toast ref={toast} />
        </>
    );
});

export default ProgramForm;
