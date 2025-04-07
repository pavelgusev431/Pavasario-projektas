import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import { nanoid } from "nanoid";
import moment from "moment";
import { getProductCommentsById } from "../helpers/getProductComments";

export default function ProductComments({ productId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await getProductCommentsById(productId);
        setComments(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError("Nepavyko užkrauti komentarų");
        setLoading(false);
        console.error(err);
      }
    };

    fetchComments();
  }, [productId]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <section className="px-4 bg-white shadow-lg rounded-2xl my-8">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800 border-b pb-4">
        Comments
      </h2>
      {comments.length > 0 ? (
        <div className="mt-6 space-y-6">
          {comments.map((comment) => (
            <div
              key={nanoid(64)}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-4"
            >
              <h2 className="text-lg font-bold flex items-center gap-3 text-gray-800">
                <span>
                  <Link to={`/users/${comment.username}`}>
                    {comment.username}
                  </Link>
                </span>
                <div className="flex items-center">
                  {[...Array(comment.stars)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
              </h2>
              <div className="text-gray-500 text-sm mt-1">
                {moment(comment.timestamp).format("lll")}
              </div>
              <p className="mt-3 text-gray-700">{comment.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6">
          Product dont have comments.
        </p>
      )}
    </section>
  );
}
