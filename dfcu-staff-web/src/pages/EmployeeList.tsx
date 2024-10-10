import { useEffect, useState } from "react";
// import { useLoaderData } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { staffService } from "@/services/staff.service";

const columns: GridColDef[] = [
    { field: "employeeNo", headerName: "employee No",width:180 },
    { field: "surname", headerName: "Surname",width:250 },
    { field: "otherNames", headerName: "Other Names",width:250 },
    { field: "dateOfBirth", headerName: "Date Of Birth",width:250 },
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
        <Stack spacing={2}>
            <Typography variant="h3" component="h1">
                All employees
            </Typography>
            <Box sx={{ display: "flex"}}>
                <DataGrid
                    sx={{ width: "100%" }}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    rows={data}
                />
            </Box>
        </Stack>
        // <Box sx={{ width: "100%" }}>
        //     <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        //         <Typography variant="h3" component="h1">
        //             All employees
        //         </Typography>
        //     </Stack>
        //     {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
        //         <DataGrid columns={columns} rows={data} paginationModel={paginationModel} onPaginationModelChange={setPaginationModel}/>
        //     {/* </div> */}
        // </Box>
    );
};

export default EmployeeList;
