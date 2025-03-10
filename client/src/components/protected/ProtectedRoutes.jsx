import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Profile from './Profile.jsx';
import ProfileEdit from '../protected/ProfileEdit.jsx';
import Protected from './Protected.jsx';

const ProtectedRoutes = () => {
    const isAuthenticated = true;

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

const ProtectedRoutesWrapper = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoutes />}>
                {/* Профиль */}
                <Route path="/profile" element={<Profile />} />
                {/* Страница редактирования профиля */}
                <Route path="/profile/edit" element={<ProfileEdit />} />
            </Route>
        </Routes>
    );
};

export default ProtectedRoutesWrapper;
