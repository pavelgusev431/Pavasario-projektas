import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext.jsx';
import getUserComments from '../../../helpers/getUserComments.js';
import ReviewCreateModal from './ReviewCreateModal.jsx';

export default function MyReviews() {
    const { auth, loading } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviewCreateModal, setReviewCreateModal] = useState(false); // Inicializuota false
    const [update, setUpdate] = useState(0); // Pridedame atnaujinimo būseną

    const handleReviewCreate = () => {
        setReviewCreateModal(true);
    };

    useEffect(() => {
        if (!loading && auth?.id) {
            const fetchComments = async () => {
                try {
                    const response = await getUserComments(auth.id);
                    setComments(response.data.data || []);
                } catch (err) {
                    console.error('Klaida gaunant komentarus:', err);
                    setError(err.message || 'Nepavyko gauti komentarų');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchComments();
        }
    }, [auth, loading, update]); // Pridedame update kaip priklausomybę

    if (loading || isLoading) return <p>Kraunama...</p>;
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
                    setUpdate={setUpdate} // Perduodame setUpdate
                />
            )}
            <div className="">
                <h2 className="text-2xl font-bold mt-2 mb-2">My reviews</h2>
            </div>
            <div className="flex flex-row gap-2 flex-wrap">
                {comments.length === 0 ? (
                    <p className="text-gray-500">Nėra atsiliepimų</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="border p-4 rounded-lg">
                            <p className="text-lg">{comment.comment}</p>
                            <p className="text-sm text-gray-500">{comment.stars}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}