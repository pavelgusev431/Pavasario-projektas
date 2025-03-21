import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { getUserByUsername } from "../../helpers/getUser.js";
import { getRatedProductsByUserName } from "../../helpers/getProduct";
import { nanoid } from "nanoid";
import moment from "moment";
import { FaStar } from "react-icons/fa";
export default function RatedProductsByUserName() {
  const { username } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getRatedProductsByUserName(username);
        setProducts(response.data.data);

        const userResponse = await getUserByUsername(username);
        setUser(userResponse.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>User not found</p>;
  return (
    <section>
      <h1>Rated owners products</h1>
      <div>
        {products.map((product) => (
          <div key={`${nanoid(64)}`}>
            <h2 className="text-lg font-bold flex flex-row gap-2">
              <Link to={`/products/${product.id}`}>{product.name} </Link>
              <div className="flex items-center mt-1 text-yellow-500">
                {[...Array(product.userRating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
            </h2>

            <div className="text-gray-500 text-sm">{moment(product.timestamp).format("lll")}</div>

            <div>
              {product.userComment}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
