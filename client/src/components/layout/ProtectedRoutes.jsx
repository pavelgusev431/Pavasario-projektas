import { Route } from 'react-router'
import Profile from '../protected/Profile.jsx'
import Protected from '../protected/Protected.jsx'

const ProtectedRoutes = () => {
    return (
        <>
            <Route element={<Protected />}>
                <Route path="/invoices" element={<Profile />}></Route>
            </Route>
        </>
    )
}

export default ProtectedRoutes
