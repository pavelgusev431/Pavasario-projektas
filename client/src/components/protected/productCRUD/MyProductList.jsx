import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext.jsx';
import { getProductById } from '../../../helpers/getProduct.js';

const MyProductList = ({ update }) => {
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
                          <div
                              key={id}
                              className="flex flex-col shadow-md rounded-md my-3"
                          >
                              <p>{product.name}</p>
                              <p>{product.description}</p>
                              <p>{product.price}</p>
                          </div>
                      );
                  })
                : ''}
        </div>
    );
};

export default MyProductList;
