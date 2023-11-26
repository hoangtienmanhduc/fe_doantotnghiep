import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TableVirtuoso } from 'react-virtuoso';

const sample = [
    ['Chủ nghĩa Mac-Lenin', 5],
    ['Tư tưởng hồ chí minh', 237],
    ['Chủ nghĩa Mac-Lenin', 5],
    ['Tư tưởng hồ chí minh', 237],
];

const theme = createTheme({
    typography: {
        fontSize: 25, // Đặt kích thước chữ mong muốn
    },
});

function createData(id, monhoc, sotinchi) {
    return { id, monhoc, sotinchi };
}

const columns = [
    {
        width: 200,
        label: 'Môn học',
        dataKey: 'monhoc',
    },
    {
        width: 100,
        label: 'Số tín chỉ',
        dataKey: 'sotinchi',
        numeric: true,
    },
];

const rows = Array.from({ length: sample.length }, (_, index) => {
    return createData(index, ...sample[index % sample.length]);
});

const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
    Table: (props) => <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />,
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function rowContent(_index, row) {
    return (
        <React.Fragment>
            {columns.map((column) => (
                <TableCell key={column.dataKey} align={column.numeric || false ? 'right' : 'left'}>
                    {row[column.dataKey]}
                </TableCell>
            ))}
        </React.Fragment>
    );
}

function Table_Home() {
    return (
        <ThemeProvider theme={theme}>
            <Paper
                style={{
                    height: 220,
                    width: '95%',
                    marginLeft: '11px',
                    marginTop: '7px',
                }}
            >
                <TableVirtuoso data={rows} components={VirtuosoTableComponents} itemContent={rowContent}>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.dataKey}
                                    variant="head"
                                    align={column.numeric || false ? 'right' : 'left'}
                                    style={{ width: column.width }}
                                    sx={{
                                        backgroundColor: 'background.paper',
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                </TableVirtuoso>
            </Paper>
        </ThemeProvider>
    );
}

export default Table_Home;
