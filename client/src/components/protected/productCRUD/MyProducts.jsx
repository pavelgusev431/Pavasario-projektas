import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext.jsx';
import ProductCreateModal from './ProductCreateModal.jsx';

const MyProducts = () => {
    const { auth } = useContext(AuthContext);

    const [productCreateModal, setProductCreateModal] = useState();
    const [productEditModal, setProductEditModal] = useState();
    const [productDeleteModal, setProductDeleteModal] = useState();

    const handleProductCreate = () => {
        setProductCreateModal(true);
        setProductEditModal(false);
        setProductDeleteModal(false);
    };

    return (
        <>
            <button
                onClick={handleProductCreate}
                className="text-white bg-orange-600 rounded-full p-5 m-0 flex justify-center items-center hover:cursor-pointer"
            >
                +
            </button>
            {productCreateModal ? (
                <ProductCreateModal
                    showModal={productCreateModal}
                    setShowModal={setProductCreateModal}
                />
            ) : (
                <></>
            )}
            <section>{}</section>
        </>
    );
};

export default MyProducts;
