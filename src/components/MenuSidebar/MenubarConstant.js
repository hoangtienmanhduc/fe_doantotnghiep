export const menubarList = [
    {
        label: 'TRANG CHỦ',
        icon: 'pi pi-home',
        command: () => window.location.assign('/'),
    },
    {
        label: 'THÔNG TIN CHUNG',
        icon: 'pi pi-book',
        items: [
            {
                label: 'THÔNG TIN SINH VIÊN',
                icon: 'pi pi-cloud-upload',
            },
            {
                label: 'GHI CHÚ NHẮC NHỞ',
                icon: 'pi pi-cloud-download',
            },
            {
                label: 'ĐỀ XUẤT CẬP NHẬT THÔNG TIN',
                icon: 'pi pi-refresh',
            },
            {
                label: 'CẬP NHẬT THÔNG TIN NGÂN HÀNG',
                icon: 'pi pi-refresh',
            },
        ],
    },
    {
        label: 'HỌC TẬP',
        icon: 'pi pi-book',
        items: [
            {
                label: 'KẾT QUẢ HỌC TẬP',
                icon: 'pi pi-cloud-upload',
            },
            {
                label: 'LỊCH THEO TUẦN',
                icon: 'pi pi-cloud-download',
            },
            {
                label: 'LỊCH THEO TIẾN ĐỘ',
                icon: 'pi pi-refresh',
            },
            {
                label: 'LỊCH HỌC TẬP LỚP DANH NGHĨA',
                icon: 'pi pi-refresh',
            },
        ],
    },
    {
        label: 'ĐĂNG KÝ HỌC PHẦN',
        icon: 'pi pi-book',
        items: [
            {
                label: 'CHUNG TRÌNH KHUNG',
                icon: 'pi pi-cloud-upload',
            },
            {
                label: 'ĐĂNG KÝ HỌC PHẦN',
                icon: 'pi pi-cloud-download',
            },
        ],
    },
    {
        label: 'HỌC PHÍ',
        icon: 'pi pi-book',
        items: [
            {
                label: 'TRA CỨU CÔNG NỢ',
                icon: 'pi pi-cloud-upload',
            },
            {
                label: 'THANH TOÁN TRỰC TUYẾN',
                icon: 'pi pi-cloud-download',
            },
            {
                label: 'PHIẾU THU TỔNG HỢP',
                icon: 'pi pi-cloud-download',
            },
        ],
    },
];
