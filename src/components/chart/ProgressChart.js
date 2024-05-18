import { fontSize } from '@mui/system';
import { Chart } from 'primereact/chart';
import React, { useState, useEffect } from 'react';

const PieChartDemo = ({ data = {} }) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const chartData = {
            labels: ['Tín chỉ đã hoàn thành', 'Tín chỉ còn lại'],
            datasets: [
                {
                    data: [data?.learned, data?.left],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--cyan-500'),
                        documentStyle.getPropertyValue('--red-500'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--cyan-300'),
                        documentStyle.getPropertyValue('--red-300'),
                    ],
                    borderJoinStyle: 'bevel',
                },
            ],
        };
        const options = {
            plugins: {
                legend: {
                    labels: {},
                },
                title: {
                    display: true,
                    text: 'Tổng tiến độ hoàn thành: ' + data?.learned + '/' + [data?.left + data?.learned],
                    font: {
                        size: 15,
                    },
                },
            },
        };
        setChartData(chartData);
        setChartOptions(options);
    }, [data]);

    return (
        <div className="card flex justify-content-center">
            <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
        </div>
    );
};

export default PieChartDemo;
