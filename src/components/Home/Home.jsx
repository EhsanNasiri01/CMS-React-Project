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
    <div className="flex h-screen bg-dark-bg">
      <Sidebar />
      <div className="flex flex-col mr-8 w-full">
        <Header />
        <div className="flex">
          <div className="flex-1">
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
