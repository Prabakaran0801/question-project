import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import Table from "./components/Table";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./components/Login";
import Register from "./components/Register";
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/table" element={<Table />} />
          <Route path="/form" element={<Form />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;

//<Navigate to="/form" />
