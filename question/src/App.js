import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./components/Table";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./components/Login";
import Register from "./components/Register";
import Create from "./components/Create";
import Edit from "./components/Edit";
import HomePage from "./pages/HomePage";
import Questions from "./pages/QuestionsPage";
import Sidebar from "./components/Sidebar";
import "./styles/from.css";
function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        {/* <div className="navbar">
          <Sidebar />
        </div> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<Create />} />
          <Route path="/table" element={<Table />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
