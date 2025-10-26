import React from "react";
import Header from "../Header/Header";
import Navigator from "../Navigator/Navigator";
import Sidebar from "../Sidebar/Sidebar";
import Boxes from "../Boxes/Boxes";
import Chart from "../Chart/Chart";
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import DonutChart from "../Chart/Donut";
import Stats from "../Stats/Stats";
export default function Home() {
  return (
    <div className="flex h-screen bg-dark-bg overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 pl-4 mr-8 overflow-y-auto">
            <Navigator />
            <Boxes />
            <Chart />
            <Stats></Stats>
          </div>
          <LeftSidebar></LeftSidebar>
        </div>
      </div>
    </div>
  );
}
