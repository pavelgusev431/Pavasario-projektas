import { useContext, useEffect, useState } from 'react';
import { getUserById } from '../../../helpers/getUser.js';
import ModalEmail from './ModalEmail.jsx';
import { AuthContext } from '../../../contexts/AuthContext.jsx';

const ProfileInfo = () => {
    const { auth } = useContext(AuthContext);

    const [user, setUser] = useState(null);
    const [editModalEmail, setEditModalEmail] = useState(false);
    const [editModalUsername, setEditModalUsername] = useState(false);
    const [editModalPassword, setEditModalPassword] = useState(false);
    const [editModalDesc, setEditModalDesc] = useState(false);
    const [editModalContacts, setEditModalContacts] = useState(false);
    const [editModalPicture, setEditModalPicture] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const user = await getUserById(auth.id);
            setUser(user.dataValues);
        };
        getUser();
    }, []);

    const handleChangeEmail = () => {
        setEditModalUsername(false);
        setEditModalContacts(false);
        setEditModalDesc(false);
        setEditModalPassword(false);
        setEditModalPicture(false);
        setEditModalEmail(true);
    };

    return (
        <>
            <h2>Profile info</h2>
            <section>
                <p>
                    <b>Email:</b>
                    <span>{user?.email}</span>
                    <i>
                        <button onClick={handleChangeEmail}>
                            Change email
                        </button>
                    </i>
                </p>
            </section>
            <div>
                {editModalEmail ? (
                    <ModalEmail
                        user={user}
                        showModal={editModalEmail}
                        setShowModal={setEditModalEmail}
                    />
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};

export default ProfileInfo;
