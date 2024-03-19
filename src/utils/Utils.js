const dayInWeek = [
    {
        key: 'monday',
        label: 'Thứ Hai',
    },
    {
        key: 'tuesday',
        label: 'Thứ Ba',
    },
    {
        key: 'wednesday',
        label: 'Thứ Tư',
    },
    {
        key: 'thursday',
        label: 'Thứ Năm',
    },
    {
        key: 'friday',
        label: 'Thứ Sáu',
    },
    {
        key: 'saturday',
        label: 'Thứ Bảy',
    },
    {
        key: 'sunday',
        label: 'Chủ Nhật',
    },
];
export const convertDayInWeek = (key) => {
    return dayInWeek.find((day) => day.key === key).label;
};
