import React from "react";
import Header from "../Header/Header";
import Navigator from "../Navigator/Navigator";
import Sidebar from "../Sidebar/Sidebar";
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import UsersTable from "../UsersTable/UsersTable";

export default function Home() {
  return (
    <div className="flex h-screen bg-dark-bg overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 pl-4 mr-8 overflow-y-auto">
            <Navigator />
            <UsersTable></UsersTable>
          </div>
          <LeftSidebar></LeftSidebar>
        </div>
      </div>
    </div>
  );
}
