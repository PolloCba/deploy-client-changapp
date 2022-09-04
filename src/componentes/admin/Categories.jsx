import React, { useEffect } from "react";
import { DataGrid, GridAddIcon } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/actions";
import { Fab } from "@mui/material";

export default function Categories() {
  const dispatch = useDispatch();
  const categoriesDb = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Categoría", width: 130 },
    { field: "img", headerName: "Imagen", width: 130 },
  ];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={categoriesDb}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      {/*       
    <Fab sx={{position:'absolute', border: 'solid black 6px'}}
    color="secondary" aria-label="add">
    <GridAddIcon />
</Fab> */}
    </div>
  );
}
