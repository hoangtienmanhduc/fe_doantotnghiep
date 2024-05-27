/* eslint-disable react/jsx-pascal-case */
import styles from '~/pages/LecturerDashboard/Nhapdiemquatrinhhoctap/Nhapdiemquatrinhhoctap.module.scss';
import classNames from 'classnames/bind';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { getSectionClassInfo } from '~/api/section/SectionClassService';
import { inputResults } from '~/api/result/ResultService';
import { HTTP_STATUS_OK } from '~/utils/Constants';
import { showNotification } from '~/components/notification/NotificationService';
import img from '../../../assets/images/point_calc.png';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
const cx = classNames.bind(styles);

const QueryKey = 'SectionClass-Info';
function Nhapdiemquatrinhhoctap() {
    const { id: idString } = useParams();
    const id = useMemo(() => {
        return !!idString ? parseInt(idString) : null;
    }, [idString]);

    const { data: sectionClassInfo } = useQuery([QueryKey, getUserId()], () => getSectionClassInfo(getUserId(), id), {
        enabled: !!getUserId() && !!id,
    });

    const [studentResultList, setStudentResultList] = useState([]);

    useEffect(() => {
        if (sectionClassInfo && sectionClassInfo?.studentSections && sectionClassInfo?.studentSections?.length > 0) {
            setStudentResultList([...sectionClassInfo?.studentSections]);
        }
    }, [sectionClassInfo]);

    const handleInputChange = (e, key, id) => {
        const { value } = e.target;
        let holderList = [...studentResultList];
        if (holderList && holderList.length > 0) {
            const idx = holderList.findIndex((item) => item.id === id);

            if (!value || isNaN(value)) {
                holderList[idx][key] = '';
            } else {
                if (value <= 10 && value >= 0) {
                    holderList[idx][key] = value;
                } else if (value > 10) {
                    holderList[idx][key] = 10;
                } else if (value < 0) {
                    holderList[idx][key] = 0;
                }
            }

            setStudentResultList([...holderList]);
        } else {
            setStudentResultList([{ id: id, [key]: value > 10 ? 10 : value < 0 ? 0 : value }]);
        }
    };

    const saveScores = useCallback(async () => {
        if (!!studentResultList && studentResultList?.length > 0) {
            const response = await inputResults(getUserId(), studentResultList);

            if (response === HTTP_STATUS_OK) {
                showNotification('success', 'Thành công', 'Cập nhật điểm cho lớp học phần thành công !!');

                window.location.assign(`/quanlydiemquatrinhhoctap/${id}`);
                return;
            }
        }
    }, [id, studentResultList]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div style={{ height: '10px', width: '100%' }}></div>
                <div className={cx('header')}>
                    <div style={{ marginLeft: '15px' }}>
                        <h2>NHẬP ĐIỂM QUÁ TRÌNH HỌC TẬP</h2>
                    </div>
                </div>
                <hr />
                <div style={{ marginLeft: '15px' }}>
                    <div className="align-items-center" style={{ display: 'flex' }}>
                        <p className="col-4">Lớp học phần:</p>
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
                    <div className="align-items-center" style={{ display: 'flex' }}>
                        <p className="col-4">Công thức tính điểm QTHT:</p>
                        <div className="col-8">
                            <Image src={img} alt="Image" width="600" preview />
                        </div>
                    </div>

                    <div className="col-12 flex align-items-center justify-content-end">
                        <Button
                            label="Lưu điểm QTHT"
                            icon="pi pi-save"
                            className="mr-2 bg-green-400"
                            onClick={saveScores}
                        />
                        <Button
                            label="Kết thúc nhập điểm"
                            icon="pi pi-sign-out"
                            onClick={() => window.location.assign(`/quanlydiemquatrinhhoctap/${id}`)}
                        />
                    </div>
                    <hr />
                    <table style={{ marginTop: '20px' }} border="1" className="w-full">
                        <thead>
                            <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                                <th style={{ height: '150px' }} rowSpan="3">
                                    STT
                                </th>
                                <th rowSpan="3">Mã sinh viên</th>
                                <th rowSpan="3">Họ và tên</th>
                                <th colSpan="3" style={{ width: '60px' }}>
                                    Giữa kì
                                </th>
                                <th colSpan="5" style={{ height: '50px' }}>
                                    Thường kì
                                </th>
                                <th colSpan="2">Thực hành</th>
                                <th rowSpan="3" style={{ width: '60px' }}>
                                    Cuối kỳ
                                </th>
                                <th rowSpan="3" style={{ width: '60px' }}>
                                    Điểm tổng kết
                                </th>
                            </tr>
                            <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                                <th style={{ width: '40px' }} rowSpan="2">
                                    1
                                </th>
                                <th style={{ width: '40px' }} rowSpan="2">
                                    2
                                </th>
                                <th style={{ width: '40px' }} rowSpan="2">
                                    3
                                </th>
                                <th colSpan="5">LT Hệ số 1</th>
                                <th style={{ width: '40px' }} rowSpan="2">
                                    1
                                </th>
                                <th style={{ width: '40px' }} rowSpan="2">
                                    2
                                </th>
                            </tr>
                            <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                                <th style={{ width: '60px', height: '50px' }} rowSpan="1">
                                    1
                                </th>
                                <th style={{ width: '60px', height: '50px' }} rowSpan="1">
                                    2
                                </th>
                                <th style={{ width: '60px', height: '50px' }} rowSpan="1">
                                    3
                                </th>
                                <th style={{ width: '60px', height: '50px' }} rowSpan="1">
                                    4
                                </th>
                                <th style={{ width: '60px', height: '50px' }} rowSpan="1">
                                    5
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentResultList &&
                                studentResultList?.length > 0 &&
                                studentResultList.map((student, index) => (
                                    <tr key={index}>
                                        <th style={{ height: '35px', width: '50px' }}>{index + 1}</th>
                                        <th style={{ width: '100px' }}>{student.studentCode}</th>
                                        <th style={{ width: '300px' }}>{student.studentName}</th>
                                        <th style={{ width: '40px' }}>
                                            <input
                                                style={{
                                                    width: '60px',
                                                    textAlign: 'center',
                                                    height: '30px',
                                                    border: 'none',
                                                }}
                                                type="text"
                                                value={
                                                    studentResultList.find((item) => item.id === student.id)
                                                        ?.midtermPoint1 || ''
                                                }
                                                onChange={(e) => handleInputChange(e, 'midtermPoint1', student?.id)}
                                            />
                                        </th>
                                        <th style={{ width: '40px' }}>
                                            <input
                                                style={{
                                                    width: '60px',
                                                    textAlign: 'center',
                                                    height: '30px',
                                                    border: 'none',
                                                }}
                                                type="text"
                                                value={
                                                    studentResultList.find((item) => item.id === student.id)
                                                        ?.midtermPoint2 || ''
                                                }
                                                onChange={(e) => handleInputChange(e, 'midtermPoint2', student?.id)}
                                            />
                                        </th>

                                        <th style={{ width: '40px' }}>
                                            <input
                                                style={{
                                                    width: '60px',
                                                    textAlign: 'center',
                                                    height: '30px',
                                                    border: 'none',
                                                }}
                                                type="text"
                                                value={
                                                    studentResultList.find((item) => item.id === student.id)
                                                        ?.midtermPoint3 || ''
                                                }
                                                onChange={(e) => handleInputChange(e, 'midtermPoint3', student?.id)}
                                            />
                                        </th>
                                        <th style={{ width: '40px' }}>
                                            <input
                                                style={{
                                                    width: '60px',
                                                    textAlign: 'center',
                                                    height: '30px',
                                                    border: 'none',
                                                }}
                                                type="text"
                                                value={
                                                    studentResultList.find((item) => item.id === student.id)
                                                        ?.regularPoint1 || ''
                                                }
                                                onChange={(e) => handleInputChange(e, 'regularPoint1', student?.id)}
                                            />
                                        </th>
                                        <th style={{ width: '40px' }}>
                                            <input
                                                style={{
                                                    width: '60px',
                                                    textAlign: 'center',
                                                    height: '30px',
                                                    border: 'none',
                                                }}
                                                type="text"
                                                value={
                                                    studentResultList.find((item) => item.id === student.id)
                                                        ?.regularPoint2 || ''
                                                }
                                                onChange={(e) => handleInputChange(e, 'regularPoint2', student?.id)}
                                            />
                                        </th>
                                        <th style={{ width: '40px' }}>
                                            <input
                                                style={{
                                                    width: '60px',
                                                    textAlign: 'center',
                                                    height: '30px',
                                                    border: 'none',
                                                }}
                                                type="text"
                                                value={
                                                    studentResultList.find((item) => item.id === student.id)
                                                        ?.regularPoint3
                                                }
                                                onChange={(e) => handleInputChange(e, 'regularPoint3', student?.id)}
                                            />
                                        </th>
                                        <th style={{ width: '40px' }}>
                                            <input
                                                style={{
                                                    width: '60px',
                                                    textAlign: 'center',
                                                    height: '30px',
                                                    border: 'none',
                                                }}
                                                type="text"
                                                value={
                                                    studentResultList.find((item) => item.id === student.id)
                                                        ?.regularPoint4 || ''
                                                }
                                                onChange={(e) => handleInputChange(e, 'regularPoint4', student?.id)}
                                            />
                                        </th>
                                        <th style={{ width: '40px' }}>
                                            <input
                                                style={{
                                                    width: '60px',
                                                    textAlign: 'center',
                                                    height: '30px',
                                                    border: 'none',
                                                }}
                                                type="text"
                                                value={
                                                    studentResultList.find((item) => item.id === student.id)
                                                        ?.regularPoint5 || ''
                                                }
                                                onChange={(e) => handleInputChange(e, 'regularPoint5', student?.id)}
                                            />
                                        </th>
                                        <th style={{ width: '40px' }}>
                                            <input
                                                style={{
                                                    width: '60px',
                                                    textAlign: 'center',
                                                    height: '30px',
                                                    border: 'none',
                                                }}
                                                type="text"
                                                value={
                                                    studentResultList.find((item) => item.id === student.id)
                                                        ?.practicePoint1 || ''
                                                }
                                                onChange={(e) => handleInputChange(e, 'practicePoint1', student?.id)}
                                            />
                                        </th>
                                        <th style={{ width: '40px' }}>
                                            <input
                                                style={{
                                                    width: '60px',
                                                    textAlign: 'center',
                                                    height: '30px',
                                                    border: 'none',
                                                }}
                                                type="text"
                                                value={
                                                    studentResultList.find((item) => item.id === student.id)
                                                        ?.practicePoint2 || ''
                                                }
                                                onChange={(e) => handleInputChange(e, 'practicePoint2', student?.id)}
                                            />
                                        </th>
                                        <th style={{ width: '40px' }}>
                                            <input
                                                style={{
                                                    width: '60px',
                                                    textAlign: 'center',
                                                    height: '30px',
                                                    border: 'none',
                                                }}
                                                type="text"
                                                value={
                                                    studentResultList.find((item) => item.id === student.id)
                                                        ?.finalPoint || ''
                                                }
                                                onChange={(e) => handleInputChange(e, 'finalPoint', student?.id)}
                                            />
                                        </th>
                                        <th style={{ width: '40px' }}>
                                            <input
                                                style={{
                                                    width: '60px',
                                                    textAlign: 'center',
                                                    height: '30px',
                                                    border: 'none',
                                                }}
                                                disabled
                                                type="text"
                                                value={'_'}
                                            />
                                        </th>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Nhapdiemquatrinhhoctap;
