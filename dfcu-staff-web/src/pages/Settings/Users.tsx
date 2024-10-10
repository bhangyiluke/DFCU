import { userService } from "@/services/user.service";
import { Box, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const columns: GridColDef[] = [
    { field: "id", headerName: "User Id",width:80 },
    { field: "username", headerName: "Username",width:150 },
    { field: "email", headerName: "Email",width:250 },
    { field: "createdAt", headerName: "created At",width:250 },
    { field: "updatedAt", headerName: "updated At",width:250 },
    { field: "roles", headerName: "Roles",width:250 },
];

const Users = () => {
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 25,
        page: 0,
    });

    // const mine=roles.reduce(a,r=>a.name+","+r.name);
    const [data, setData] = useState();
    // const [data] = useLoaderData();
    useEffect(() => {
        const loadData = async () => {
            const data = await userService.getAll();
            const cleaned = data.map((user:any)=>Object({...user,roles:user.roles.map((role:any)=>role.name).join(",")}));
            setData(cleaned);
        };
        loadData();
    }, []);
    return (
        <Stack spacing={2}>
            <Typography variant="h3" component="h1">
                Users
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
    );
};
export default Users;
