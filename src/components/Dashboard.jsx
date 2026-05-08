import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
 import "./Dashboard.css";   

import users from "../data/users";

const Dashboard = () => {
  const [searchText, setSearchText] = useState("");

  const [defaultColDef] = useState({
    flex: 1,
    minWidth: 100,
    cellStyle: {
      display: "flex",
      alignItems: "center",
    },
  });

  const [columnDefs] = useState([
    { field: "id", sortable: true, filter: true },
    { field: "name", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "country", sortable: true, filter: true },
    { field: "age", sortable: true, filter: true },
    {
      field: "status",
      sortable: true,
      filter: true,
      cellStyle: (params) => ({
        display: "flex",
        alignItems: "center",
        color: params.value === "Active" ? "green" : "red",
        fontWeight: "bold",
      }),
    },
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-[89vh]">
      <div className="relative inline-block w-full max-w-xs mb-5">
        <input
          type="text"
          placeholder="Search users..."
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
      <div className="ag-theme-quartz h-[455px] w-full rounded-xl overflow-hidden shadow-md">
        <AgGridReact
          rowData={users}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          quickFilterText={searchText}
          animateRows={true}
          rowHeight={40}
        />
      </div>
    </div>
  );
};

export default Dashboard;