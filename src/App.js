import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/component/Form";
import Table from "./components/component/Table";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./components/scences/Login";
import Register from "./components/scences/Register";
import Create from "./components/component/Create";
import Edit from "./components/component/Edit";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/table" element={<Table />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
