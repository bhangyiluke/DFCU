import { useEffect, useState } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { staffService } from "@/services/staff.service";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Employee from "./Employee";


const EmployeeList = () => {
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 25,
        page: 0,
    });

    const [data, setData] = useState();
    const [employee, setEmployee] = useState();
    const [open, setOpen] = useState(false);
    const [reaload, setReload] = useState(false);

    const handleRowClick=(row:any)=>{
        setEmployee(row);
        setOpen(true);
    }

    const handleClose=()=>{
        setEmployee(undefined);
        setOpen(false);
        setReload(!reaload)
    }

    const columns: GridColDef[] = [
        { field: "employeeNo", headerName: "Employee No", width: 180 },
        { field: "surname", headerName: "Surname", width: 250 },
        { field: "otherNames", headerName: "Other Name(s)", width: 250 },
        { field: "dateOfBirth", headerName: "Date Of Birth", width: 250 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions({id,row}) {
                return [
                    <GridActionsCellItem
                      icon={<EditIcon />}
                      label="Edit"
                      className="textPrimary"
                      onClick={()=>handleRowClick(row)}
                      color="inherit"
                    />,
                    <GridActionsCellItem
                      icon={<DeleteIcon />}
                      label="Delete"
                      onClick={()=>handleRowClick(row)}
                      color="inherit"
                    />,
                  ];
            },
        }
    ];

    useEffect(() => {
        const loadData = async () => {
            const data = await staffService.retrieveStaff();
            setData(data);
        };
        loadData();
    }, [reaload]);

    return (
        <Stack spacing={2} sx={{ width: "100%", mx: "auto" }}>
            <Typography variant="h5" component="h5">
                All employees
            </Typography>
            <Paper sx={{ width: "100%" }}>
                <DataGrid
                    sx={{ width: "100%" }}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    rows={data}
                    checkboxSelection
                />
            </Paper>
            <Employee data={employee} open={open} handleClose={handleClose}/>
        </Stack>
    );
};

export default EmployeeList;
