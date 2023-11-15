import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./pages/Table";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
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
