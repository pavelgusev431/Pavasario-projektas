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
            <div className="flex justify-center  w-full h-screen bg-gray-50 dark:bg-gray-900">
                <div className="w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <div className="flex items-center mb-6">
                        <div className="w-2 h-8 bg-red-500 mr-3"></div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                            My products
                        </h2>
                    </div>
                    <div className="flex items-center">
                        <h2>Add a product</h2>
                        <button
                            onClick={handleProductCreate}
                            className="text-white bg-orange-600 rounded-xl px-4 py-2 ml-2 flex justify-center items-center hover:cursor-pointer"
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
                    </div>
                    <section>
                        <MyProductList update={update} setUpdate={setUpdate} />
                    </section>
                </div>
            </div>
        </>
    );
};

export default MyProducts;
