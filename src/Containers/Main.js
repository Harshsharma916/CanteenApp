import { Routes, Route } from "react-router-dom";
// import Profile from "./Profile";
import Homepage from "./Homepage";
import CanteenList from "./Canteenlist";
import Canteenmenu from "./Canteenmenu";
import WorkerDashboard from "./WorkerDashBoard";
import Orderconfirmation from "./Orderconfirmation";
// import UserDetails from "./UserDetails";

const Main = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/otp" element={<Otp />} /> */}
      {/* <Route path="/userdetails" element={<UserDetails/>} /> */}
      <Route path="/" element={<Homepage />} />
      <Route path="/workerDashboard" element={<WorkerDashboard />} />
      <Route path="/canteenlist" element={<CanteenList/>}/>
      <Route path="/canteenmenu" element={<Canteenmenu/>}/>
      <Route path="/placeorder" element={<Orderconfirmation/>}/>
      {/* <Route path="/profile" element={<Profile />} /> */}
    </Routes>
  );
};

export default Main;
