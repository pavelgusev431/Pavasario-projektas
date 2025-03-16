import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Profile from '../protected/Profile.jsx';
import ProfileEdit from '../protected/ProfileEdit.jsx';
import Protected from '../protected/Protected.jsx';

const ProtectedRoutes = () => {
    const isAuthenticated = true;

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

const ProtectedRoutesWrapper = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoutes />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<ProfileEdit />} />
            </Route>
        </Routes>
    );
};

export default ProtectedRoutesWrapper;
