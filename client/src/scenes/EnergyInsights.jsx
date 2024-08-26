import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetEnergyInsightsQuery } from "@/state/api";
import Header from "@/components/Header";
import DataGridCustomToolbar from "@/components/DataGridCustomToolbar";

function EnergyInsights() {
  const theme = useTheme();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("");
  const [value, setValue] = useState("");

  const { data, isLoading } = useGetEnergyInsightsQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  console.log("API Response:", data); // Add this line for debugging

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "insight",
      headerName: "Insight",
      flex: 1,
    },
    {
      field: "url",
      headerName: "URL",
      flex: 1,
    },
    {
      field: "published",
      headerName: "Published",
      flex: 1,
    },
    {
      field: "added",
      headerName: "Added",
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
    },
    {
      field: "region",
      headerName: "Region",
      flex: 1,
    },
    {
      field: "source",
      headerName: "Source",
      flex: 1,
    },
    {
      field: "sector",
      headerName: "Sector",
      flex: 1,
    },
    {
      field: "topic",
      headerName: "Topic",
      flex: 1,
    },
  ];

  return (
    <Box height="100%" maxHeight="85vh" m="1.5rem 2.5rem">
      <Header title="ENERGY INSIGHTS" subtitle="Entire list of energy insights" />
      <Box
        height="77vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.url} // Use URL as a unique identifier
          rows={data || []}
          columns={columns}
          rowCount={data?.length || 0}
          pagination
          paginationMode="server"
          sortingMode="server"
          pageSizeOptions={[20, 50, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          slots={{ toolbar: DataGridCustomToolbar }}
          slotProps={{
            toolbar: { searchInput, setSearchInput, setSearch, filter, setFilter, value, setValue },
          }}
        />
      </Box>
    </Box>
  );
}

export default EnergyInsights;