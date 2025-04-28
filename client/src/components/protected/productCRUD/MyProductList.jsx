import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext.jsx';
import { getProductById } from '../../../helpers/getProduct.js';
import MyProduct from './MyProduct.jsx';

const MyProductList = ({ update, setUpdate }) => {
    const {
        auth: { id },
    } = useContext(AuthContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProductById(id);
            setProducts(data.data.data);
        };
        fetchProducts();
    }, [id, update]);

    return (
        <div>
            {products
                ? products.map((product) => {
                      const { id } = product;
                      return (
                          <MyProduct
                              key={id}
                              product={product}
                              setUpdate={setUpdate}
                          />
                      );
                  })
                : ''}
        </div>
    );
};

export default MyProductList;
