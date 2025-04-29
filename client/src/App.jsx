import { Routes, Route } from 'react-router';
import Auth from './components/layout/Register_Login/Auth.jsx';
import Home from './components/layout/Home.jsx';
import Contact from './components/layout/Contact.jsx';
import About from './components/layout/About.jsx';
import NotFound from './components/layout/NotFound.jsx';
import PasswordReset from './components/layout/Register_Login/PasswordReset.jsx';
import ProductList from './components/ProductList.jsx';
import NavBar from './components/layout/navbar/NavBar.jsx';
import UserProducts from './components/UserProducts.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import SearchedProducts from './components/products/SearchedProducts.jsx';
import PublicUserProfile from './components/products/PublicUserProfile.jsx';
import ProtectedRoutes from './components/layout/ProtectedRoutes.jsx';
import ProductsPage from './components/products/SubcategoryProducts.jsx';
import ProductsDropdown from './components/layout/navbar/ProductsDropdown.jsx';
import AdminPanel from './components/protected/admin/adminpanel.jsx';
import BalancePage from './components/protected/productCRUD/BalancePage.jsx';
import MyReviews from './components/protected/commentCRUD/MyReviews.jsx';
import CategoryProducts from './components/products/CategoryProducts.jsx';
import Footer from './components/layout/Footer.jsx';

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route index element={<Auth />} />
                <Route path="home" element={<Home />} />
                <Route path="products/:id" element={<UserProducts />} />
                <Route path="categories/:id" element={<CategoryProducts />} />

                <Route path="/search" element={<SearchedProducts />} />
                <Route
                    path="products/selected/:id"
                    element={<ProductDetails />}
                />
                <Route path="products/u/:username" element={<UserProducts />} />
                <Route path="users/:username" element={<PublicUserProfile />} />
                <Route path="products" element={<ProductList />} />
                <Route path="/" element={<ProductsDropdown />} />
                <Route path="/balance" element={<BalancePage />} />
                <Route path="/reviews" element={<MyReviews />} />
                <Route
                    path="/products/s/:subcategoryId"
                    element={<ProductsPage />}
                />
                <Route path="/adminpanel" element={<AdminPanel />} />
                <Route path="contact" element={<Contact />} />
                <Route path="about" element={<About />} />
                <Route path="signup" element={<Auth authType="signup" />} />
                <Route path="reset/:userid/:salt" element={<PasswordReset />} />
                {ProtectedRoutes()}
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
