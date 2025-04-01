import { Route } from "react-router";
import Profile from "../protected/Private_User_Profile/ProfileInfo.jsx";
import Protected from "../protected/Protected.jsx";
import MyProducts from "../protected/productCRUD/MyProducts.jsx";

const ProtectedRoutes = () => {
  return (
    <Route element={<Protected />}>
      <Route path="profile" element={<Profile />}></Route>
      <Route path="myProducts" element={<MyProducts />}></Route>
    </Route>
  );
};

export default ProtectedRoutes;
