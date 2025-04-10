import { useState } from 'react';
import ProductCreateModal from './ProductCreateModal.jsx';
import MyProductList from './MyProductList.jsx';

const MyProducts = () => {
    const [productCreateModal, setProductCreateModal] = useState();
    //some code
    // const [productEditModal, setProductEditModal] = useState();
    // const [productDeleteModal, setProductDeleteModal] = useState();
    const [update, setUpdate] = useState(0);

    const handleProductCreate = () => {
        setProductCreateModal(true);
        //some code
        // setProductEditModal(false);
        // setProductDeleteModal(false);
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
                    setUpdate={setUpdate}
                />
            ) : (
                <></>
            )}
            <section>
                <MyProductList update={update} />
            </section>
        </>
    );
};

export default MyProducts;
