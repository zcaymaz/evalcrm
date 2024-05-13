import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CustomerAdd from "../pages/CustomerAdd";
import CustomerDetail from "../pages/CustomerDetail";
import CustomerList from "../pages/CustomerList";

function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customeradd" element={<CustomerAdd />} />
        <Route path="/customerlist" element={<CustomerList />} />
        <Route path="/customerdetail" element={<CustomerDetail />} />
      </Routes>
    </Router>
  );
}

export default Routers;
