import { useState, useEffect, useMemo} from 'react';
import axios from 'axios'
import './Tabledata2.css'
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ExpandAllButton,
} from 'material-react-table';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Box,
} from '@mui/material';

const Tabledata2 = () => {
  const[items, setItems]=useState([])
  useEffect( ()=>{
    axios.get('https://file.notion.so/f/f/ca71608c-1cc3-4167-857a-24da97c78717/b041832a-ec40-47bb-b112-db9eeb72f678/sample-data.json?id=ce885cf5-d90e-46f3-ab62-c3609475cfb6&table=block&spaceId=ca71608c-1cc3-4167-857a-24da97c78717&expirationTimestamp=1711029600000&signature=f7byMzvB_9slM5cpcrJ1TjF5-iMwWNuA4l7B9eeoQzo&downloadName=sample-data.json')
    .then(response=> {setItems( response.data)}
    )},[])
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id', 
        header: 'Id',
        size: 150,
      },
      {
        accessorKey: 'name',
        header: ' Name',
        size: 150,
      },
      {
        accessorKey: 'category',
        header: ' Category',
        size: 150,
      },
     
      {
        accessorKey: 'subcategory',
        header: 'Subcategory',
        size: 150,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 150,
      },
      {
        accessorKey: 'sale_price',
        header: 'Sale Price',
        size: 150,
      },
    ],
    [],
  );

const table = useMaterialReactTable({
  columns,
  data:items,
  displayColumnDefOptions: {
    'mrt-row-expand': {
      Header: () => (
        <Stack direction="row" alignItems="center">
          <MRT_ExpandAllButton table={table} />
          <Box>Category</Box>
        </Stack>
      ),
      GroupedCell: ({ row, table }) => {
        const { grouping } = table.getState();
        return row.getValue(grouping[grouping.length - 1]);
      },
      enableResizing: true,
      muiTableBodyCellProps: ({ row }) => ({
        sx: (theme) => ({
          color:
            row.depth === 0
              ? theme.palette.primary.main
              : row.depth === 1
                ? theme.palette.secondary.main
                : undefined,
        }),
      }),
      size: 200,
    },
  },
  enableGrouping: true,
  enableColumnResizing: true,
  groupedColumnMode: 'remove',
  initialState: {
    density: 'compact',
    expanded: true, 
    grouping: ['category'], 
    pagination: { pageIndex: 0, pageSize: 10 },
    sorting: [{ id: 'category', desc: false }],
  },
});

return <MaterialReactTable table={table} />;
};

export default Tabledata2;