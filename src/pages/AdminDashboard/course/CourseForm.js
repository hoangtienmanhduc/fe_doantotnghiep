import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { createOrUpdateGenericCourse, getListCourseInfo } from '~/api/course/CourseService';
import { getUserId } from '~/components/authentication/AuthUtils';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useQuery } from '@tanstack/react-query';
import { getListSpecializationInfo } from '~/api/specialization/SpecializationService';
import { MultiSelect } from 'primereact/multiselect';
import { InputNumber } from 'primereact/inputnumber';
import { CourseTypeOptions } from '../section/SectionConstant';
import { Divider } from 'primereact/divider';
import { courseTypeOptions, typeOfKnowledge, workCourseOptions } from './CourseConstant';
const QueryKeySpecializationOptions = 'Specialization-Options';
const QueryKeyCourseOptions = 'Course-Options';
const CourseForm = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        showForm: handleShowForm,
        hideForm: handleHideForm,
    }));

    // State
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({});
    const toast = useRef(null);
    const [courseTypes, setCourseTypes] = useState(['none']);
    const [courseWorks, setCourseWorks] = useState([]);

    // Use Query
    const { data: specializationOptions } = useQuery(
        [QueryKeySpecializationOptions, getUserId()],
        () => getListSpecializationInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );

    const { data: courseOptions } = useQuery(
        [QueryKeyCourseOptions, getUserId(), data?.specializationId],
        () =>
            getListCourseInfo(
                getUserId(),
                { specializationId: data?.specializationId ? data.specializationId : null },
                null,
                true,
            ),
        { enabled: !!getUserId() && !!data?.specializationId },
    );

    // Handle Func
    const handleShowForm = useCallback((data) => {
        if (!!data && Object.keys(data)?.length > 0) {
            setData({ ...data });

            let holderCourseWorks = [];
            if (data?.courseDuration) {
                if (!!data.courseDuration?.theory && data.courseDuration?.theory > 0) {
                    holderCourseWorks.push('theory');
                }

                if (!!data.courseDuration?.practice && data.courseDuration?.practice > 0) {
                    holderCourseWorks.push('practice');
                }

                if (!!data.courseDuration?.selfLearning && data.courseDuration?.selfLearning > 0) {
                    holderCourseWorks.push('selfLearning');
                }

                if (!!holderCourseWorks && holderCourseWorks.length > 0) {
                    setCourseWorks([...holderCourseWorks]);
                }
            }

            let holderCourseTypes = [];
            if (data?.requireCourse) {
                if (!!data.requireCourse?.studyFirst && data.requireCourse?.studyFirst?.length > 0) {
                    holderCourseTypes.push('studyFirst');
                }

                if (!!data.requireCourse?.parallel && data.requireCourse?.parallel?.length > 0) {
                    holderCourseTypes.push('parallel');
                }

                if (!!data.requireCourse?.prerequisite && data.requireCourse?.prerequisite?.length > 0) {
                    holderCourseTypes.push('prerequisite');
                }

                if (!!holderCourseTypes && holderCourseTypes.length > 0) {
                    setCourseTypes([...holderCourseTypes]);
                }
            }
        }

        setVisible(true);
    }, []);

    const handleHideForm = useCallback(() => {
        setData({});
        setVisible(false);
        setCourseTypes(['none']);
        setCourseWorks([]);
    }, []);

    const handleOnChangeSectionType = (type, value) => {
        if (!!value) {
            if (type === 'studyFirst' || type === 'prerequisite' || type === 'parallel') {
                const holder = value.filter((type) => type !== 'none');
                setCourseTypes([...holder]);
            } else if (type === 'none') {
                const holder = value.filter((type) => type === 'none');
                setCourseTypes([...holder]);
            }
        }
    };

    const handleOnChangeCourseWork = (value) => {
        if (!!value) {
            if (courseWorks.includes('practice')) {
                if (!value.includes('practice')) {
                    setData({
                        ...data,
                        courseDuration: {
                            ...data?.courseDuration,
                            practice: 0,
                        },
                    });
                }
            } else if (courseWorks.includes('selfLearning')) {
                if (!value.includes('selfLearning')) {
                    setData({
                        ...data,
                        courseDuration: {
                            ...data?.courseDuration,
                            selfLearning: 0,
                        },
                    });
                }
            }
            setCourseWorks([...value]);
        }
    };

    const handleOnChange = useCallback(
        (key, value) => {
            setData({ ...data, [key]: value });
        },
        [data],
    );

    const handleOnChangeCourseDuration = (key, value) => {
        setData({
            ...data,
            courseDuration: !!data?.courseDuration ? { ...data.courseDuration, [key]: value } : { [key]: value },
        });
    };

    const handleOnSubmit = useCallback(async () => {
        let isError = false;

        if (!data?.credits || data?.credits <= 0) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tín chỉ của môn học không được để trống và phải lớn hơn 0!!',
            });
            isError = true;
        }

        if (!data?.costCredits || data?.costCredits <= 0) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tín chỉ học phí của môn học không được để trống và phải lớn hơn 0!!',
            });
            isError = true;
        }

        if (!data?.name || data.name?.length < 1) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tên của môn học không dược để trống!!',
            });
            isError = true;
        }

        if (!data?.termRegister || data?.termRegister?.length < 1) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Học kỳ để đăng kỳ môn học không được để trống!!',
            });
            isError = true;
        }

        if (!data?.courseDuration) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Thời lượng công việc của môn học không được để trống!!',
            });
            isError = true;
        } else {
            if (!!courseWorks && courseWorks.length > 0) {
                if (courseWorks.includes('theory')) {
                    if (!data.courseDuration?.theory || data?.courseDuration.theory < 1) {
                        toast.current.show({
                            severity: 'info',
                            summary: 'Info',
                            detail: 'Tín chỉ cho thời lượng tiết lý thuyết không được để trống và phải lớn hơn 0!!',
                        });
                        isError = true;
                    }
                } else if (courseWorks.includes('practice')) {
                    if (!data.courseDuration?.practice || data?.courseDuration.practice < 1) {
                        toast.current.show({
                            severity: 'info',
                            summary: 'Info',
                            detail: 'Tín chỉ cho thời lượng tiết thực hành không được để trống và phải lớn hơn 0!!',
                        });
                        isError = true;
                    }
                } else if (courseWorks.includes('discussionExercises')) {
                    if (!data.courseDuration?.discussionExercises || data?.courseDuration.discussionExercises < 1) {
                        toast.current.show({
                            severity: 'info',
                            summary: 'Info',
                            detail: 'Tín chỉ cho thời lượng bài tập, thảo luận không được để trống và phải lớn hơn 0!!',
                        });
                        isError = true;
                    }
                } else if (courseWorks.includes('selfLearning')) {
                    if (!data.courseDuration?.selfLearning || data?.courseDuration.selfLearning < 1) {
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
            const courseData = await createOrUpdateGenericCourse(getUserId(), toPostData);

            if (courseData?.id) {
                try {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Thao tác cập nhật môn học thành công!!',
                    });
                } catch (err) {
                    console.log('Tải lại bảng không thành công');
                }

                handleHideForm();
            }
        }
    }, [courseWorks, data, handleHideForm]);

    const handleOnChangePrerequisite = useCallback(
        (type, value) => {
            setData({
                ...data,
                requireCourse: { [type]: [...value] },
            });
        },
        [data],
    );

    return (
        <>
            <Dialog
                header={
                    <h3 className="m-0 p-3 pb-0 font-bold">
                        {`${!!data?.id ? 'Cập nhật thông tin' : 'Thêm mới'} môn học`}
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
                        <div className="col-12 p-0">
                            <p>Chuyên ngành của môn học</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.specializationId || null}
                                    onChange={(e) => handleOnChange('specializationId', e?.target.value)}
                                    options={specializationOptions || []}
                                    optionLabel="name"
                                    optionValue="id"
                                    placeholder="Hãy chọn chuyên ngành của môn học"
                                    className="w-full"
                                />
                            </span>
                        </div>

                        <div className="col-12 p-0">
                            <p>Tên môn học</p>
                            <span className="w-full">
                                <InputText
                                    value={data?.name || ''}
                                    placeholder="Nhập tên môn học (Bắt buộc)"
                                    onChange={(e) => handleOnChange('name', e?.target.value)}
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Mô tả môn học</p>
                            <span className="w-full">
                                <InputTextarea
                                    rows={5}
                                    value={data?.description || ''}
                                    placeholder="Nhập mô tả cho môn học (Không bắt buộc)"
                                    onChange={(e) => handleOnChange('description', e?.target.value)}
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Học kì có thể đăng ký môn học</p>
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
                                    placeholder="Hãy chọn học kỳ mà môn học này có thể được đăng ký (Bắt buộc)"
                                    maxSelectedLabels={3}
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Loại kiến thức của môn học</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.typeOfKnowledge || null}
                                    onChange={(e) => handleOnChange('typeOfKnowledge', e?.target.value)}
                                    options={typeOfKnowledge || []}
                                    optionLabel="label"
                                    optionValue="key"
                                    placeholder="Hãy chọn loại kiến thứ của môn học (Bắt buộc)"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Loại nội dung học tập môn học</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.courseType}
                                    onChange={(e) => handleOnChange('courseType', e?.target.value)}
                                    options={CourseTypeOptions || []}
                                    optionLabel="label"
                                    optionValue="key"
                                    placeholder="Hãy chọn loại môn học (Bắt buộc)"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Số tín chỉ học tập</p>
                            <span className="w-full">
                                <InputNumber
                                    value={data?.credits || 0}
                                    placeholder="Nhập số tín chỉ học tập (Bắt buộc)"
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
                            <p>Loại công việc trong môn học</p>
                            <span className="w-full">
                                <MultiSelect
                                    value={courseWorks}
                                    onChange={(e) => handleOnChangeCourseWork(e.target.value)}
                                    options={workCourseOptions || []}
                                    selectAll
                                    optionLabel="label"
                                    optionValue="key"
                                    maxSelectedLabels={3}
                                    placeholder="Chọn loại công việc thuộc môn học này (Bắt buộc)"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12">
                            {courseWorks.includes('theory') && (
                                <div className="col-12 p-0">
                                    <p>Tín chỉ cho thời lượng tiết học lý thuyết (1 tín chỉ = 1 tiết mỗi tuần)</p>
                                    <span className="w-full">
                                        <InputNumber
                                            value={
                                                data?.courseDuration && data.courseDuration?.theory
                                                    ? data.courseDuration.theory
                                                    : 0
                                            }
                                            placeholder="Nhập số tín chỉ thời gian cho tiết lý thuyết (Bắt buộc)"
                                            onChange={(e) => handleOnChangeCourseDuration('theory', e?.value)}
                                            className="w-full"
                                        />
                                    </span>
                                </div>
                            )}

                            {courseWorks.includes('practice') && (
                                <div className="col-12 p-0">
                                    <p>
                                        Tín chỉ cho thời lượng tiết học thực hành, thí nghiệm (1 tín chỉ = 3 tiết mỗi
                                        tuần)
                                    </p>
                                    <span className="w-full">
                                        <InputNumber
                                            value={
                                                data?.courseDuration && data.courseDuration?.practice
                                                    ? data.courseDuration.practice
                                                    : 0
                                            }
                                            placeholder="Nhập số tín chỉ thời gian cho tiết thực hành (Bắt buộc)"
                                            onChange={(e) => handleOnChangeCourseDuration('practice', e?.value)}
                                            className="w-full"
                                        />
                                    </span>
                                </div>
                            )}

                            {courseWorks.includes('selfLearning') && (
                                <div className="col-12 p-0">
                                    <p>Tín chỉ cho thời lượng tự học (1 tín chỉ = 2 giờ tự học ngoài)</p>
                                    <span className="w-full">
                                        <InputNumber
                                            value={
                                                data?.courseDuration && data.courseDuration?.selfLearning
                                                    ? data.courseDuration.selfLearning
                                                    : 0
                                            }
                                            placeholder="Nhập số tín chỉ thời gian cho tiết tự học (Bắt buộc)"
                                            onChange={(e) => handleOnChangeCourseDuration('selfLearning', e?.value)}
                                            className="w-full"
                                        />
                                    </span>
                                </div>
                            )}
                        </div>
                        <Divider align="left">
                            <div className="inline-flex align-items-center">
                                <i className="pi pi-bars mr-2"></i>
                                <h3 className="p-0 m-0">Điều kiện tiên quyết cho môn học</h3>
                            </div>
                        </Divider>
                        <div className="col-12 p-0">
                            <p>Các điều kiện tiên quyết</p>
                            <span className="w-full">
                                <MultiSelect
                                    value={courseTypes || ['none']}
                                    onChange={(e) => handleOnChangeSectionType(e.selectedOption.key, e.target.value)}
                                    options={courseTypeOptions || []}
                                    optionLabel="label"
                                    optionValue="key"
                                    maxSelectedLabels={3}
                                    placeholder="Chọn loại điều kiện môn học"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        {courseTypes.includes('studyFirst') && (
                            <div className="col-12 p-0">
                                <p>Các môn học học trước</p>
                                <span className="w-full">
                                    <MultiSelect
                                        value={
                                            data?.requireCourse && data.requireCourse?.studyFirst
                                                ? data.requireCourse?.studyFirst
                                                : []
                                        }
                                        filter
                                        onChange={(e) => handleOnChangePrerequisite('studyFirst', e?.target.value)}
                                        options={
                                            (courseOptions && courseOptions.filter((item) => item?.id !== data?.id)) ||
                                            []
                                        }
                                        optionLabel="name"
                                        optionValue="code"
                                        placeholder="Hãy chọn các môn học học trước"
                                        maxSelectedLabels={3}
                                        className="w-full"
                                    />
                                </span>
                            </div>
                        )}
                        {courseTypes.includes('parallel') && (
                            <div className="col-12 p-0">
                                <p>Các môn học song hành</p>
                                <span className="w-full">
                                    <MultiSelect
                                        value={
                                            data?.requireCourse && data.requireCourse?.parallel
                                                ? data.requireCourse?.parallel
                                                : []
                                        }
                                        filter
                                        onChange={(e) => handleOnChangePrerequisite('parallel', e?.target.value)}
                                        options={
                                            (courseOptions && courseOptions.filter((item) => item?.id !== data?.id)) ||
                                            []
                                        }
                                        optionLabel="name"
                                        optionValue="code"
                                        placeholder="Hãy chọn các môn học song hành"
                                        maxSelectedLabels={3}
                                        className="w-full"
                                    />
                                </span>
                            </div>
                        )}
                        {courseTypes.includes('prerequisite') && (
                            <div className="col-12 p-0">
                                <p>Các môn học tiên quyết</p>
                                <span className="w-full">
                                    <MultiSelect
                                        value={
                                            data?.requireCourse && data.requireCourse?.prerequisite
                                                ? data.requireCourse?.prerequisite
                                                : []
                                        }
                                        filter
                                        onChange={(e) => handleOnChangePrerequisite('prerequisite', e?.target.value)}
                                        options={
                                            (courseOptions && courseOptions.filter((item) => item?.id !== data?.id)) ||
                                            []
                                        }
                                        optionLabel="name"
                                        optionValue="code"
                                        placeholder="Hãy chọn các môn học tiên quyết"
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
                            className={`col-6 mr-2`}
                            icon={'pi pi-send'}
                            label={'Xác nhận'}
                            onClick={handleOnSubmit}
                        />
                        <Button className="col-6" icon={'pi pi-times'} label={'Huỷ bỏ'} onClick={handleHideForm} />
                    </div>
                </div>
            </Dialog>
            <Toast ref={toast} />
        </>
    );
});

export default CourseForm;
