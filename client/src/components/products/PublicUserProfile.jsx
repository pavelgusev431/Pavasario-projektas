import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getUserByUsername } from '../../helpers/getUser.js';
import { getUserProductsByUserName } from '../../helpers/getProduct.js';


export default function PublicUserProfile() {

  const { username } = useParams();
    
    
    const [userName, setUserName] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [avgUserRating, setAvgUserRating] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [email, setEmail] = useState(null);
    const [description, setDescription] = useState(null);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getUserProductsByUserName(username);
                setProducts(response.data.data);
                setAvgUserRating(response.data.avgUserRating);
                
                

                const userResponse = await getUserByUsername(username); 
                console.log(userResponse);
                
                setUserName(userResponse.data.data.username);
                setProfilePicture(userResponse.data.data.image_url);
                setEmail(userResponse.data.data.email);
                setDescription(userResponse.data.data.description);
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
    if (products.length === 0) return <p>User not found</p>;

    return (
        <div>
            <h1>{userName}</h1>
            <div><img src={profilePicture} alt="profile picture" /></div>
            <p>Average User Rating: {avgUserRating}</p>
            <p>email : {email}</p>
            <p>description : {description}</p>
           
        </div>
    );

  
}