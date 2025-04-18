import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaStar } from 'react-icons/fa';
import { nanoid } from 'nanoid';
import moment from 'moment';
import { getProductCommentsById } from '../helpers/getProductComments';
import axios from 'axios';
import url from '../helpers/getURL';

export default function ProductComments({ productId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);
                const response = await getProductCommentsById(productId);
                const rawComments = response.data.data || [];

                const commentsWithImages = await Promise.all(
                    rawComments.map(async (comment) => {
                        try {
                            const imgResponse = await axios.get(
                                url(`images/c/comment${comment.id}`)
                            );

                            if (imgResponse.status === 200) {
                                return {
                                    ...comment,
                                    images: imgResponse.data.data || [],
                                };
                            } else {
                                return { ...comment, images: [] };
                            }
                        } catch (err) {
                            if (err.response?.status === 404) {
                                // Tyliai ignoruojam 404 (kai nėra paveiksliukų)
                                return { ...comment, images: [] };
                            } else {
                                console.error(
                                    `Kita klaida gaunant komentarą ${comment.id}:`,
                                    err
                                );
                                return { ...comment, images: [] };
                            }
                        }
                    })
                );

                setComments(commentsWithImages);
                setLoading(false);
            } catch (err) {
                setError('Nepavyko užkrauti komentarų');
                setLoading(false);
                console.error(err);
            }
        };

        fetchComments();
    }, [productId]);

    if (loading)
        return (
            <div className="text-center p-4 text-gray-800 dark:text-white">
                Loading...
            </div>
        );
    if (error)
        return (
            <div className="text-center p-4 text-red-500 dark:text-red-400">
                {error}
            </div>
        );

    return (
        <section className="px-4 bg-white dark:bg-gray-900 shadow-lg rounded-2xl my-8">
            <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800 dark:text-white border-b dark:border-gray-700 pb-4">
                Comments
            </h2>

            {comments.length > 0 ? (
                <div className="mt-6 space-y-6">
                    {comments.map((comment) => (
                        <div
                            key={nanoid(64)}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-4"
                        >
                            <h2 className="text-lg font-bold flex items-center gap-3 text-gray-800 dark:text-white">
                                <span>
                                    <Link
                                        to={`/users/${comment.username}`}
                                        className="hover:underline"
                                    >
                                        {comment.username}
                                    </Link>
                                </span>
                                <div className="flex items-center">
                                    {[...Array(comment.stars)].map(() => (
                                        <FaStar
                                            key={nanoid(64)}
                                            className="text-yellow-500"
                                        />
                                    ))}
                                </div>
                            </h2>
                            <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                {moment(comment.timestamp).format('lll')}
                            </div>
                            <p className="mt-3 text-gray-700 max-w-full break-words ">
                                {comment.comment}
                            </p>

                            {/* Paveikslėliai */}
                            {comment.images && comment.images.length > 0 && (
                                <div className="flex gap-2 mt-3 flex-wrap">
                                    {comment.images.map((imageUrl, index) => (
                                        <img
                                            key={index}
                                            src={imageUrl}
                                            alt={`Komentaro ${comment.id} paveikslėlis ${index + 1}`}
                                            className="w-32 h-32 object-cover rounded-md cursor-pointer"
                                            onClick={() =>
                                                setSelectedImage(imageUrl)
                                            }
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600 mt-6">
                    Product does not have comments.
                </p>
            )}

            {/* Modal paveikslėlio peržiūrai */}
            {selectedImage && (
                <div
                    className="fixed bottom-0 left-0  bg-black/25 flex items-center justify-center z-50 h-svh w-screen"
                    onClick={() => setSelectedImage(null)}
                >
                    <img
                        src={selectedImage}
                        alt="Peržiūrimas paveikslėlis"
                        className="max-w-100 max-h-100 rounded-lg shadow-2xl flex items-center justify-center"
                    />
                </div>
            )}
        </section>
    );
}
