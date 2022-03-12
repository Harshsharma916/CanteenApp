import { Routes, Route } from "react-router-dom";
// import Profile from "./Profile";
import Homepage from "./Homepage";
import FoodList from "./Canteenlist";
import Canteenmenu from "./Canteenmenu";
// import UserDetails from "./UserDetails";

const Main = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/otp" element={<Otp />} /> */}
      {/* <Route path="/userdetails" element={<UserDetails/>} /> */}
      <Route path="/" element={<Homepage/>} />
      <Route path="/foodlist" element={<FoodList/>}/>
      <Route path="/canteenmenu" element={<Canteenmenu/>}/>
      {/* <Route path="/profile" element={<Profile />} /> */}
    </Routes>
  );
};

export default Main;
