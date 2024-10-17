import { useEffect, useState } from "react";
// import { useLoaderData } from "react-router-dom";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { staffService } from "@/services/staff.service";

const columns: GridColDef[] = [
    { field: "employeeNo", headerName: "Employee No", width: 180 },
    { field: "surname", headerName: "Surname", width: 250 },
    { field: "otherNames", headerName: "Other Name(s)", width: 250 },
    { field: "dateOfBirth", headerName: "Date Of Birth", width: 250 },
];
const EmployeeList = () => {
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 25,
        page: 0,
    });

    const [data, setData] = useState();
    // const [data] = useLoaderData();
    useEffect(() => {
        const loadData = async () => {
            const data = await staffService.retrieveStaff();
            setData(data);
            // console.log("EmployeeList => ",data);
        };
        loadData();
    }, []);

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
                />
            </Paper>
        </Stack>
    );
};

export default EmployeeList;
