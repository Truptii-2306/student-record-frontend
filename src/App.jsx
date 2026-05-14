import { useState } from "react";
import "./App.css";
import StudentTable from "./components/studentTable";
import Header from "./components/header";

function App() {
  return (
    <>
      <Header />
      <StudentTable />
    </>
  );
}

export default App;
