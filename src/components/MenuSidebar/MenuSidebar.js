import React, { useState } from 'react';
import { Button } from 'primereact/button';

const MenuSidebar = () => {
    return (
        <React.Fragment>
            <div className="mb-2">
                <div className="w-full flex justify-content-start align-items-center bg-primary text-white border-round-xl p-2">
                    <i className="pi pi-info mr-2 p-2 border-circle bg-white text-primary"></i>
                    <p className="font-semibold m-0 text-sm">THÔNG TIN CHUNG</p>
                </div>
                <div className="flex flex-column justify-content-center align-items-center gap-2">
                    <div className="w-full">
                        <Button
                            className="w-full"
                            onClick={() => window.location.assign('/')}
                            text
                            label="Thông tin sinh viên"
                        />
                    </div>
                    <div className="w-full">
                        <Button
                            className="w-full"
                            onClick={() => window.location.assign('/')}
                            text
                            label="Ghi chú nhắc nhở"
                        />
                    </div>
                    <div className="w-full">
                        <Button
                            className="w-full"
                            onClick={() => window.location.assign('/capnhatthongtinsinhvien')}
                            text
                            label="Đề xuất cập nhật thông tin"
                        />
                    </div>
                    <div className="w-full">
                        <Button
                            className="w-full"
                            onClick={() => window.location.assign('/')}
                            text
                            label="Cập nhật thông tin ngân hàng"
                        />
                    </div>
                </div>
            </div>
            <div className="mb-2">
                <div className="w-full flex justify-content-start align-items-center bg-primary text-white border-round-xl p-2">
                    <i className="pi pi-book mr-2 p-2 border-circle bg-white text-primary"></i>
                    <p className="font-semibold m-0 text-sm">HỌC TẬP</p>
                </div>
                <div className="flex flex-column justify-content-center align-items-center gap-2">
                    <div className="w-full">
                        <Button
                            className="w-full"
                            onClick={() => window.location.assign('/ketquahoctap')}
                            text
                            label="Kết quả học tập"
                        />
                    </div>
                    <div className="w-full">
                        <Button
                            className="w-full"
                            onClick={() => window.location.assign('/lichhoc')}
                            text
                            label="Lịch theo tuấn"
                        />
                    </div>
                    <div className="w-full">
                        <Button
                            className="w-full"
                            onClick={() => window.location.assign('/lichtheotiendo')}
                            text
                            label="Lịch theo tiến độ"
                        />
                    </div>
                    <div className="w-full">
                        <Button
                            className="w-full"
                            onClick={() => window.location.assign('/')}
                            text
                            label="Lịch học lớp danh nghĩa"
                        />
                    </div>
                </div>
            </div>
            <div className="mb-2">
                <div className="w-full flex justify-content-start align-items-center bg-primary text-white border-round-xl p-2">
                    <i className="pi pi-check mr-2 p-2 border-circle bg-white text-primary"></i>
                    <p className="font-semibold m-0 text-sm">ĐĂNG KÝ HỌC PHẦN</p>
                </div>
                <div className="flex flex-column justify-content-center align-items-center gap-2">
                    <div className="w-full">
                        <Button
                            className="w-full"
                            onClick={() => window.location.assign('/chuongtrinhkhung')}
                            text
                            label="Chương trình khung"
                        />
                    </div>
                    <div className="w-full">
                        <Button
                            className="w-full"
                            onClick={() => window.location.assign('/dangkyhocphan')}
                            text
                            label="Đăng kí học phần"
                        />
                    </div>
                </div>
            </div>
            <div className="mb-2">
                <div className="w-full flex justify-content-start align-items-center bg-primary text-white border-round-xl p-2">
                    <i className="pi pi-dollar mr-2 p-2 border-circle bg-white text-primary"></i>
                    <p className="font-semibold m-0 text-sm">HỌC PHÍ</p>
                </div>
                <div className="flex flex-column justify-content-center align-items-center gap-2">
                    <div className="w-full">
                        <Button
                            className="w-full"
                            onClick={() => window.location.assign('/tracuucongno')}
                            text
                            label="Tra cứu công nợ"
                        />
                    </div>
                    <div className="w-full">
                        <Button
                            className="w-full"
                            onClick={() => window.location.assign('/thanhtoantructuyen')}
                            text
                            label="Thanh toán trực tuyến"
                        />
                    </div>
                    <div className="w-full">
                        <Button
                            className="w-full"
                            onClick={() => window.location.assign('/phieutonghop')}
                            text
                            label="Phiếu thu tổng hợp"
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default MenuSidebar;
