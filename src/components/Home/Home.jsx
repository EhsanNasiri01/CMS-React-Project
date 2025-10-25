import React from "react";
import Header from "../Header/Header";
import Navigator from "../Navigator/Navigator";
import Sidebar from "../Sidebar/Sidebar";
import Boxes from "../Boxes/Boxes";
export default function Home() {
  return (
    <div className="flex h-screen bg-darker-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Navigator />
        <Boxes />
      </div>
    </div>
  );
}
