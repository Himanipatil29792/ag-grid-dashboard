import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
 import "./Dashboard.css";   

import employees from "../data/employees";

const Dashboard = () => {
  const [searchText, setSearchText] = useState("");

  const [defaultColDef] = useState({
    flex: 1,
    minWidth: 100,
    autoHeight: true,
    cellStyle: {
      display: "flex",
      alignItems: "center",
    },
  });

 const [columnDefs] = useState([
  { field: "id", sortable: true, filter: true, maxWidth: 70},
   { field: "firstName", sortable: true, filter: true },
    { field: "lastName", sortable: true, filter: true },
  { field: "email", sortable: true, filter: true },
  { field: "department", sortable: true, filter: true },
  { field: "position", sortable: true, filter: true },
  {
    field: "salary", sortable: true, filter: true,
  },
  { field: "hireDate", headerName: "Hire Date", sortable: true, filter: true },
  { field: "age", sortable: true, filter: true , maxWidth: 80 },
  { field: "location", sortable: true, filter: true },
  {
    field: "performanceRating",
    headerName: "Rating",
    sortable: true,
    filter: true,
  },
  {
    field: "projectsCompleted",
    headerName: "Projects",
    sortable: true,
    filter: true,
  },
  {
    field: "skills",
    sortable: false,
    filter: true,
    valueFormatter: (p) => p.value.join(", "),
  },
  { field: "manager", sortable: true, filter: true },
  {
    field: "isActive",
    headerName: "Status",
    sortable: true,
    filter: true,
    //valueFormatter: (p) => (p.value ? "Active" : "Inactive"),
    // cellStyle: (params) => ({
    //   display: "flex",
    //   alignItems: "center",
    //   color: params.value ? "green" : "red",
    //   fontWeight: "bold",
    // }),
     cellRenderer: (params) => (
        <span
          style={{
            color: params.value ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {params.value ? "Active" : "Inactive"}
        </span>
      ),
  },
]);


  return (
    <div className="p-6 bg-gray-100 min-h-[89vh]">
      <div className="relative inline-block w-full max-w-xs mb-5">
        <input
          type="text"
          placeholder="Search employees..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full bg-white px-3 py-3 pr-8 text-sm border border-gray-300 rounded-xl outline-none focus:border-blue-500 transition-colors"
        />
        {searchText && (
          <button
            onClick={() => setSearchText("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer text-base leading-none"
          >
            ✕
          </button>
        )}
      </div>
      <div className="ag-theme-quartz h-[470px] w-full rounded-xl overflow-hidden shadow-md">
        <AgGridReact
          rowData={employees}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          quickFilterText={searchText}
          animateRows={true}
          rowHeight={40}
          autoSizeStrategy={{ type: "fitCellContents" }} 
          autoHeight={true}
        />
      </div>
    </div>
  );
};

export default Dashboard;