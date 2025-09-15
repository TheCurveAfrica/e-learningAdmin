import React from "react";
import Header from "./Home/Header";
import Table from "./Home/Table";
import Perfomers from "./Home/Perfomers";
import Overview from "./Home/Overview";

const Dashboard: React.FC = () => {
  return (
    <main className="">
      <Header />
      <Overview />
      <Table />
      <Perfomers />
    </main>
  );
};

export default Dashboard;
