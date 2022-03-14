import { Routes, Route } from "react-router-dom";
// import Profile from "./Profile";
import HomePage from "./HomePage";
import CanteenList from "./CanteenList";
import CanteenMenu from "./CanteenMenu";
import WorkerDashboard from "./WorkerDashBoard";
import OrderConfirmation from "./OrderConfirmation";
// import UserDetails from "./UserDetails";

const Main = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/otp" element={<Otp />} /> */}
      {/* <Route path="/userdetails" element={<UserDetails/>} /> */}
      <Route path="/" element={<HomePage />} />
      <Route path="/workerdashboard" element={<WorkerDashboard />} />
      <Route path="/canteenlist" element={<CanteenList/>}/>
      <Route path="/canteenmenu" element={<CanteenMenu/>}/>
      <Route path="/placeorder" element={<OrderConfirmation/>}/>
      {/* <Route path="/profile" element={<Profile />} /> */}
    </Routes>
  );
};

export default Main;
