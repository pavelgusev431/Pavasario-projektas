import ProductEditModal from './ProductEditModal.jsx';
import ProductDeleteModal from './ProductDeleteModal.jsx';
2;
import { useState } from 'react';

const MyProduct = ({ product, setUpdate }) => {
    const { id, name, description, price, image_url } = product;
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const handleEdit = () => {
        setShowEdit(!showEdit);
    };
    const handleDelete = () => {
        setShowDelete(!showDelete);
    };
    return (
        <div className="flex shadow-md rounded-md my-3">
            <div className="flex flex-col p-1">
                <p>{name}</p>
                <p>{description}</p>
                <p>{price}</p>
            </div>
            <img src={image_url} alt="#" className="w-[15rem] h-[15rem]" />
            <div className="flex flex-col p-1">
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
            {showEdit ? (
                <ProductEditModal
                    id={id}
                    toggleShow={handleEdit}
                    setUpdate={setUpdate}
                    productInfo={product}
                />
            ) : (
                <></>
            )}
            {showDelete ? (
                <ProductDeleteModal
                    id={id}
                    toggleShow={handleDelete}
                    setUpdate={setUpdate}
                />
            ) : (
                <></>
            )}
        </div>
    );
};

export default MyProduct;
