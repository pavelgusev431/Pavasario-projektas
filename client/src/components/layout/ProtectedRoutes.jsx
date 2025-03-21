import { Route } from 'react-router';
import Profile from '../protected/Private_User_Profile/ProfileInfo.jsx';
import Protected from '../protected/Protected.jsx';

const ProtectedRoutes = () => {
    return (
        <Route element={<Protected />}>
            <Route path="profile" element={<Profile />}></Route>
        </Route>
    );
};

export default ProtectedRoutes;
