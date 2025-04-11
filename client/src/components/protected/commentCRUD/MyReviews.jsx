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
                                const imgResponse = await axios.get(url(`images/c/comment${comment.id}`), {
                                    withCredentials: true,
                                });
                                return { ...comment, images: imgResponse.data.data || [] };
                            } catch (imgErr) {
                                console.error(`Klaida gaunant komentaro ${comment.id} paveikslėlius:`, imgErr);
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
                className="text-white bg-orange-600 rounded-full p-5 m-0 flex justify-center items-center hover:cursor-pointer"
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
            <div className="">
                <h2 className="text-2xl font-bold mt-2 mb-2">My reviews</h2>
            </div>
            <div className="flex flex-row gap-2 flex-wrap">
                {comments.length === 0 ? (
                    <p className="text-gray-500">You have no reviews</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="border p-4 rounded-lg">
                            {comment.images && comment.images.length > 0 && (
                                <div className="flex gap-2 mb-2">
                                    {comment.images.map((imageUrl, index) => (
                                        <img
                                            key={index}
                                            src={imageUrl}
                                            alt={`Komentaro ${comment.id} paveikslėlis ${index + 1}`}
                                            className="w-32 h-32 object-cover"
                                        />
                                    ))}
                                </div>
                            )}
                            <p className="text-lg">{comment.comment}</p>
                            <p className="text-sm text-gray-500">{comment.stars} stars</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}