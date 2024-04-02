import { useQuery } from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { createOrUpdateGenericSection, getListSectionInfo } from '~/api/section/SectionService';
import { getUserId } from '~/components/authentication/AuthUtils';
import { SectionTypeOptions } from './SectionConstant';
import { InputNumber } from 'primereact/inputnumber';
import { getListCourseInfo } from '~/api/course/CourseService';
import { MultiSelect } from 'primereact/multiselect';
import { getListSpecializationInfo } from '~/api/specialization/SpecializationService';
import { InputTextarea } from 'primereact/inputtextarea';
import { courseTypeOptions, workSectionOptions } from '../course/CourseConstant';
import { Divider } from 'primereact/divider';

const QueryKeyCourseOptions = 'Course-Options';
const QueryKeySectionOptions = 'Section-Options';
const QueryKeySpecializationOptions = 'Specialization-Options';
const SectionForm = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        showForm: handleShowForm,
        hideForm: handleHideForm,
    }));
    const [sectionTypes, setSectionTypes] = useState(['none']);
    const [sectionWorks, setSectionWorks] = useState([]);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({});
    const toast = useRef(null);
    const handleShowForm = useCallback((data) => {
        if (!!data && Object.keys(data)?.length > 0) {
            setData({ ...data });

            let holderSectionWorks = [];
            if (data?.sectionDuration) {
                if (!!data.sectionDuration?.theory && data.sectionDuration?.theory > 0) {
                    holderSectionWorks.push('theory');
                }

                if (!!data.sectionDuration?.practice && data.sectionDuration?.practice > 0) {
                    holderSectionWorks.push('practice');
                }

                if (!!data.sectionDuration?.discussionExercises && data.sectionDuration?.discussionExercises > 0) {
                    holderSectionWorks.push('discussionExercises');
                }

                if (!!data.sectionDuration?.selfLearning && data.sectionDuration?.selfLearning > 0) {
                    holderSectionWorks.push('selfLearning');
                }

                if (!!holderSectionWorks && holderSectionWorks.length > 0) {
                    setSectionWorks([...holderSectionWorks]);
                }
            }

            let holderSectionTypes = [];
            if (data?.requireSection) {
                if (!!data.requireSection?.studyFirst && data.requireSection?.studyFirst > 0) {
                    holderSectionTypes.push('studyFirst');
                }

                if (!!data.requireSection?.parallel && data.requireSection?.parallel > 0) {
                    holderSectionTypes.push('parallel');
                }

                if (!!data.requireSection?.prerequisite && data.requireSection?.prerequisite > 0) {
                    holderSectionTypes.push('prerequisite');
                }

                if (!!holderSectionTypes && holderSectionTypes.length > 0) {
                    setSectionTypes([...holderSectionTypes]);
                }
            }
        }
        setVisible(true);
    }, []);

    const { data: courseOptions } = useQuery(
        [QueryKeyCourseOptions, getUserId()],
        () =>
            getListCourseInfo(
                getUserId(),
                { specializationId: data?.specializationId ? data.specializationId : null },
                null,
                true,
            ),
        { enabled: !!getUserId() },
    );

    const { data: sectionOptions } = useQuery(
        [QueryKeySectionOptions, getUserId()],
        () => getListSectionInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );

    const { data: specializationOptions } = useQuery(
        [QueryKeySpecializationOptions, getUserId()],
        () => getListSpecializationInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );

    const handleHideForm = useCallback(() => {
        setData({});
        setSectionTypes(['none']);
        setSectionWorks([]);
        setVisible(false);
    }, []);

    const handleOnChangeSectionType = (type, value) => {
        if (!!value) {
            if (type === 'studyFirst' || type === 'prerequisite' || type === 'parallel') {
                const holder = value.filter((type) => type !== 'none');
                setSectionTypes([...holder]);
            } else if (type === 'none') {
                const holder = value.filter((type) => type === 'none');
                setSectionTypes([...holder]);
            }
        }
    };

    const handleOnChangeSectionWork = (value) => {
        if (!!value) {
            debugger;
            if (sectionWorks.includes('practice')) {
                if (!value.includes('practice')) {
                    setData({
                        ...data,
                        sectionDuration: {
                            ...data?.sectionDuration,
                            practice: 0,
                        },
                    });
                }
            } else if (sectionWorks.includes('selfLearning')) {
                if (!value.includes('selfLearning')) {
                    setData({
                        ...data,
                        sectionDuration: {
                            ...data?.sectionDuration,
                            selfLearning: 0,
                        },
                    });
                }
            } else if (sectionWorks.includes('discussionExercises')) {
                if (!value.includes('discussionExercises')) {
                    setData({
                        ...data,
                        sectionDuration: {
                            ...data?.sectionDuration,
                            discussionExercises: 0,
                        },
                    });
                }
            }
            setSectionWorks([...value]);
        }
    };

    const handleOnSubmit = useCallback(async () => {
        let isError = false;

        if (!data?.specializationId) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Chuyên ngành của học phần không dược để trống!!',
            });
            isError = true;
        }

        if (!data?.courseId) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Môn học học phần thuộc không được để trống!!',
            });
            isError = true;
        }

        if (!data?.name) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tên của học phần không dược để trống!!',
            });
            isError = true;
        }

        if (!data?.sectionType) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Loại học phần không được để trống!!',
            });
            isError = true;
        }

        if (!data?.termRegister || data?.termRegister?.length < 1) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Học kỳ để đăng kỳ học phần không được để trống!!',
            });
            isError = true;
        }

        if (!data?.sectionDuration) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Thời lượng công việc của học phần không được để trống!!',
            });
            isError = true;
        } else {
            if (!!sectionWorks && sectionWorks.length > 0) {
                if (sectionWorks.includes('theory')) {
                    if (!data.sectionDuration?.theory || data?.sectionDuration.theory < 1) {
                        toast.current.show({
                            severity: 'info',
                            summary: 'Info',
                            detail: 'Tín chỉ cho thời lượng tiết lý thuyết không được để trống và phải lớn hơn 0!!',
                        });
                        isError = true;
                    }
                } else if (sectionWorks.includes('practice')) {
                    if (!data.sectionDuration?.practice || data?.sectionDuration.practice < 1) {
                        toast.current.show({
                            severity: 'info',
                            summary: 'Info',
                            detail: 'Tín chỉ cho thời lượng tiết thực hành không được để trống và phải lớn hơn 0!!',
                        });
                        isError = true;
                    }
                } else if (sectionWorks.includes('discussionExercises')) {
                    if (!data.sectionDuration?.discussionExercises || data?.sectionDuration.discussionExercises < 1) {
                        toast.current.show({
                            severity: 'info',
                            summary: 'Info',
                            detail: 'Tín chỉ cho thời lượng bài tập, thảo luận không được để trống và phải lớn hơn 0!!',
                        });
                        isError = true;
                    }
                } else if (sectionWorks.includes('selfLearning')) {
                    if (!data.sectionDuration?.selfLearning || data?.sectionDuration.selfLearning < 1) {
                        toast.current.show({
                            severity: 'info',
                            summary: 'Info',
                            detail: 'Tín chỉ cho thời lượng tự học không được để trống và phải lớn hơn 0!!',
                        });
                        isError = true;
                    }
                }
            }
        }

        if (!isError) {
            let toPostData = {
                ...data,
            };
            const sectionData = await createOrUpdateGenericSection(getUserId(), toPostData);

            if (sectionData?.id) {
                try {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Thao tác cập nhật học phần thành công!!',
                    });
                } catch (err) {
                    console.log('Tải lại bảng không thành công');
                }

                handleHideForm();
            }
        }
    }, [data, handleHideForm, sectionWorks]);

    const handleOnChaneSectionDuration = (key, value) => {
        setData({
            ...data,
            sectionDuration: !!data?.sectionDuration ? { ...data.sectionDuration, [key]: value } : { [key]: value },
        });
    };

    const handleOnChange = useCallback(
        (key, value) => {
            setData({ ...data, [key]: value });
        },
        [data],
    );

    const handleOnChangePrerequisite = useCallback(
        (type, value) => {
            setData({
                ...data,
                requireSection:
                    !!data?.requireSection && data?.requireSection.length > 0
                        ? {
                              ...data?.requireSection,
                              [type]: !!data?.requireSection[type]
                                  ? [...data?.requireSection[type], ...value]
                                  : [...value],
                          }
                        : { [type]: [...value] },
            });
        },
        [data],
    );

    return (
        <>
            <Dialog
                header={
                    <h3 className="p-3 pb-0 m-0 font-bold">
                        {`${!!data?.id ? 'Cập nhật thông tin' : 'Thêm mới'} học phần`}
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
                <div>
                    <div className="col-12 p-0">
                        <div className="col-12 p-0">
                            <p>Chuyên ngành của học phần</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.specializationId || null}
                                    onChange={(e) => handleOnChange('specializationId', e?.target.value)}
                                    options={specializationOptions}
                                    optionLabel="name"
                                    optionValue="id"
                                    placeholder="Hãy chọn chuyên ngành của học phần (Không bắt buộc)"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Thuộc môn học</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.courseId || null}
                                    onChange={(e) => handleOnChange('courseId', e?.target.value)}
                                    options={courseOptions}
                                    optionLabel="name"
                                    optionValue="id"
                                    placeholder="Hãy chọn môn học mà học phần thuộc"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Tên học phần</p>
                            <span className="w-full">
                                <InputText
                                    value={data?.name || ''}
                                    placeholder="Nhập tên học phần (Bắt buộc)"
                                    onChange={(e) => handleOnChange('name', e?.target.value)}
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Mô tả học phần</p>
                            <span className="w-full">
                                <InputTextarea
                                    rows={5}
                                    value={data?.description || ''}
                                    placeholder="Nhập mô tả cho học phần (Không bắt buộc)"
                                    onChange={(e) => handleOnChange('description', e?.target.value)}
                                    className="w-full"
                                />
                            </span>
                        </div>

                        <div className="col-12 p-0">
                            <p>Học kì đăng ký học phần</p>
                            <span className="w-full">
                                <MultiSelect
                                    value={data?.termRegister ? data.termRegister : []}
                                    onChange={(e) => handleOnChange('termRegister', e?.target.value)}
                                    options={[
                                        { value: 'first_term', label: 'Học kỳ 1' },
                                        { value: 'second_term', label: 'Học kỳ 2' },
                                        { value: 'summer_term', label: 'Học kỳ hè' },
                                    ]}
                                    optionLabel="label"
                                    optionValue="value"
                                    placeholder="Hãy chọn học kỳ mà học phần này có thể được đăng ký"
                                    maxSelectedLabels={3}
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Loại học phần</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.sectionType}
                                    onChange={(e) => handleOnChange('sectionType', e?.target.value)}
                                    options={SectionTypeOptions}
                                    optionLabel="label"
                                    optionValue="key"
                                    placeholder="Hãy chọn loại học phần"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Loại nội dung học tập học phần</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.sectionType}
                                    onChange={(e) => handleOnChange('sectionType', e?.target.value)}
                                    options={SectionTypeOptions}
                                    optionLabel="label"
                                    optionValue="key"
                                    placeholder="Hãy chọn loại học phần"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Số tín chỉ học tập</p>
                            <span className="w-full">
                                <InputNumber
                                    value={data?.credits || 0}
                                    placeholder="Nhập số tín chỉ học tập"
                                    onChange={(e) => handleOnChange('credits', e?.value)}
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Số tín chỉ học phí</p>
                            <span className="w-full">
                                <InputNumber
                                    value={data?.costCredits || 0}
                                    placeholder="Nhập số tín chỉ học phí (Bắt buộc)"
                                    onChange={(e) => handleOnChange('costCredits', e?.value)}
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <Divider align="left">
                            <div className="inline-flex align-items-center">
                                <i className="pi pi-bars mr-2"></i>
                                <h3 className="p-0 m-0">Thời lượng công việc</h3>
                            </div>
                        </Divider>
                        <div className="col-12 p-0">
                            <p>Loại công việc trong học phần</p>
                            <span className="w-full">
                                <MultiSelect
                                    value={sectionWorks}
                                    onChange={(e) => handleOnChangeSectionWork(e.target.value)}
                                    options={workSectionOptions}
                                    selectAll
                                    optionLabel="label"
                                    optionValue="key"
                                    maxSelectedLabels={3}
                                    placeholder="Chọn loại công việc thuộc học phần này"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12">
                            {sectionWorks.includes('theory') && (
                                <div className="col-12 p-0">
                                    <p>Tín chỉ cho thời lượng tiết học lý thuyết (1 tín chỉ = 1 tiết mỗi tuần)</p>
                                    <span className="w-full">
                                        <InputNumber
                                            value={
                                                data?.sectionDuration && data.sectionDuration?.theory
                                                    ? data.sectionDuration.theory
                                                    : 0
                                            }
                                            placeholder="Nhập số tín chỉ thời gian cho tiết lý thuyết (Bắt buộc)"
                                            onChange={(e) => handleOnChaneSectionDuration('theory', e?.value)}
                                            className="w-full"
                                        />
                                    </span>
                                </div>
                            )}

                            {sectionWorks.includes('practice') && (
                                <div className="col-12 p-0">
                                    <p>
                                        Tín chỉ cho thời lượng tiết học thực hành, thí nghiệm (1 tín chỉ = 3 tiết mỗi
                                        tuần)
                                    </p>
                                    <span className="w-full">
                                        <InputNumber
                                            value={
                                                data?.sectionDuration && data.sectionDuration?.practice
                                                    ? data.sectionDuration.practice
                                                    : 0
                                            }
                                            placeholder="Nhập số tín chỉ thời gian cho tiết thực hành (Bắt buộc)"
                                            onChange={(e) => handleOnChaneSectionDuration('practice', e?.value)}
                                            className="w-full"
                                        />
                                    </span>
                                </div>
                            )}

                            {sectionWorks.includes('discussionExercises') && (
                                <div className="col-12 p-0">
                                    <p>
                                        Tín chỉ cho thời lượng làm bài tập, thảo luận nhóm (1 tín chỉ = 2 tiết ngoài giờ
                                        học chính mỗi tuần)
                                    </p>
                                    <span className="w-full">
                                        <InputNumber
                                            value={
                                                data?.sectionDuration && data.sectionDuration?.discussionExercises
                                                    ? data.sectionDuration.discussionExercises
                                                    : 0
                                            }
                                            placeholder="Nhập số tín chỉ thời gian cho tiết bài tập, thảo luận (Bắt buộc)"
                                            onChange={(e) =>
                                                handleOnChaneSectionDuration('discussionExercises', e?.value)
                                            }
                                            className="w-full"
                                        />
                                    </span>
                                </div>
                            )}

                            {sectionWorks.includes('selfLearning') && (
                                <div className="col-12 p-0">
                                    <p>Tín chỉ cho thời lượng tự học (1 tín chỉ = 2 giờ tự học ngoài)</p>
                                    <span className="w-full">
                                        <InputNumber
                                            value={
                                                data?.sectionDuration && data.sectionDuration?.selfLearning
                                                    ? data.sectionDuration.selfLearning
                                                    : 0
                                            }
                                            placeholder="Nhập số tín chỉ thời gian cho tiết tự học (Bắt buộc)"
                                            onChange={(e) => handleOnChaneSectionDuration('theory', e?.value)}
                                            className="w-full"
                                        />
                                    </span>
                                </div>
                            )}
                        </div>
                        <Divider align="left">
                            <div className="inline-flex align-items-center">
                                <i className="pi pi-bars mr-2"></i>
                                <h3 className="p-0 m-0">Điều kiện tiên quyết cho học phần</h3>
                            </div>
                        </Divider>
                        <div className="col-12 p-0">
                            <p>Các điều kiện tiên quyết</p>
                            <span className="w-full">
                                <MultiSelect
                                    value={sectionTypes || ['none']}
                                    onChange={(e) => handleOnChangeSectionType(e.selectedOption.key, e.target.value)}
                                    options={courseTypeOptions}
                                    optionLabel="label"
                                    optionValue="key"
                                    maxSelectedLabels={3}
                                    placeholder="Chọn loại điều kiện học phần"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        {sectionTypes.includes('studyFirst') && (
                            <div className="col-12 p-0">
                                <p>Các học phần học trước</p>
                                <span className="w-full">
                                    <MultiSelect
                                        value={
                                            data?.requireSection && data.requireSection?.studyFirst
                                                ? data.requireSection?.studyFirst
                                                : []
                                        }
                                        onChange={(e) => handleOnChangePrerequisite('studyFirst', e?.target.value)}
                                        options={
                                            sectionOptions && sectionOptions.filter((item) => item?.id !== data?.id)
                                        }
                                        optionLabel="name"
                                        optionValue="code"
                                        placeholder="Hãy chọn các học phần học trước"
                                        maxSelectedLabels={3}
                                        className="w-full"
                                    />
                                </span>
                            </div>
                        )}
                        {sectionTypes.includes('parallel') && (
                            <div className="col-12 p-0">
                                <p>Các học phần song hành</p>
                                <span className="w-full">
                                    <MultiSelect
                                        value={
                                            data?.requireSection && data.requireSection?.parallel
                                                ? data.requireSection?.parallel
                                                : []
                                        }
                                        onChange={(e) => handleOnChangePrerequisite('parallel', e?.target.value)}
                                        options={
                                            sectionOptions && sectionOptions.filter((item) => item?.id !== data?.id)
                                        }
                                        optionLabel="name"
                                        optionValue="code"
                                        placeholder="Hãy chọn các học phần song hành"
                                        maxSelectedLabels={3}
                                        className="w-full"
                                    />
                                </span>
                            </div>
                        )}
                        {sectionTypes.includes('prerequisite') && (
                            <div className="col-12 p-0">
                                <p>Các học phần tiên quyết</p>
                                <span className="w-full">
                                    <MultiSelect
                                        value={
                                            data?.requireSection && data.requireSection?.prerequisite
                                                ? data.requireSection?.prerequisite
                                                : []
                                        }
                                        onChange={(e) => handleOnChangePrerequisite('prerequisite', e?.target.value)}
                                        options={
                                            sectionOptions && sectionOptions.filter((item) => item?.id !== data?.id)
                                        }
                                        optionLabel="name"
                                        optionValue="code"
                                        placeholder="Hãy chọn các học phần tiên quyết"
                                        maxSelectedLabels={3}
                                        className="w-full"
                                    />
                                </span>
                            </div>
                        )}
                    </div>
                    <hr />
                    <div className="flex col-12">
                        <Button
                            className={`col-6 p-button-lg font-bold mr-2`}
                            icon={'pi pi-send'}
                            label={'Xác nhận'}
                            onClick={handleOnSubmit}
                        />

                        <Button
                            className="col-6 p-button-lg font-bold"
                            icon={'pi pi-times'}
                            label={'Huỷ bỏ'}
                            onClick={handleHideForm}
                        />
                    </div>
                </div>
            </Dialog>
            <Toast ref={toast} />
        </>
    );
});
export default SectionForm;
