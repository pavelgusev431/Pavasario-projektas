import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext.jsx';
import getUserComments from '../../../helpers/getUserComments.js';
import ReviewCreateModal from './ReviewCreateModal.jsx';
import axios from 'axios';
import url from '../../../helpers/getURL.js';

export default function MyReviews() {
    const { auth, loading } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviewCreateModal, setReviewCreateModal] = useState(false);
    const [update, setUpdate] = useState(0);

    const handleReviewCreate = () => {
        setReviewCreateModal(true);
    };

    useEffect(() => {
        if (!loading && auth?.id) {
            const fetchComments = async () => {
                try {
                    const response = await getUserComments(auth.id);
                    const commentsData = response.data.data || [];
                    const commentsWithImages = await Promise.all(
                        commentsData.map(async (comment) => {
                            try {
                                const imgResponse = await axios.get(
                                    url(`images/c/comment${comment.id}`),
                                    {
                                        withCredentials: true,
                                    }
                                );
                                return {
                                    ...comment,
                                    images: imgResponse.data.data || [],
                                };
                            } catch (imgErr) {
                                console.error(
                                    `Klaida gaunant komentaro ${comment.id} paveikslėlius:`,
                                    imgErr
                                );
                                return { ...comment, images: [] };
                            }
                        })
                    );
                    setComments(commentsWithImages);
                } catch (err) {
                    console.error('Klaida gaunant komentarus:', err);
                    setError(err.message || 'Nepavyko gauti komentarų');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchComments();
        }
    }, [auth, loading, update]);

    if (loading || isLoading) return <p>Loading...</p>;
    if (!auth) return <p>Not logged in</p>;
    if (error) return <p>error: {error}</p>;

    return (
        <div>
            <button
                onClick={handleReviewCreate}
                className="text-white bg-orange-600 hover:bg-orange-700 transition-colors duration-200 shadow-lg rounded-full w-14 h-14 flex justify-center items-center fixed bottom-6 right-6 z-50"
                title="Add Review"
            >
                +
            </button>

            {reviewCreateModal && (
                <ReviewCreateModal
                    showModal={reviewCreateModal}
                    setShowModal={setReviewCreateModal}
                    setUpdate={setUpdate}
                />
            )}

            <div className="mb-4">
                <h2 className="text-3xl flex font-extrabold text-red-600 mt-4 mb-4">
                    <div className="w-2 h-8 bg-red-500 mr-3"></div>
                    My Reviews
                </h2>
            </div>

            <div className="flex flex-wrap gap-4">
                {comments.length === 0 ? (
                    <p className="text-gray-400 text-lg">You have no reviews</p>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="bg-white border border-gray-200 shadow-md rounded-xl p-4 w-full max-w-sm transition-transform hover:scale-[1.02]"
                        >
                            {comment.images && comment.images.length > 0 && (
                                <div className="flex gap-2 mb-3 overflow-x-auto">
                                    {comment.images.map((imageUrl, index) => (
                                        <img
                                            key={index}
                                            src={imageUrl}
                                            alt={`Comment ${comment.id} image ${index + 1}`}
                                            className="w-24 h-24 object-cover rounded-md"
                                        />
                                    ))}
                                </div>
                            )}
                            <p className="text-lg">{comment.comment}</p>
                            <p className="text-sm text-gray-500">
                                {comment.stars} stars
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
