import { useEffect, useState } from 'react';
import { getUserById } from '../../../../../server/controllers/userController';
import ModalEmail from './ModalEmail.jsx';

const ProfileInfo = () => {
    const [user, setUser] = useState(null);
    const [editModalEmail, setEditModalEmail] = useState(false);
    const [editModalUsername, setEditModalUsername] = useState(false);
    const [editModalPassword, setEditModalPassword] = useState(false);
    const [editModalDesc, setEditModalDesc] = useState(false);
    const [editModalContacts, setEditModalContacts] = useState(false);
    const [editModalPicture, setEditModalPicture] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const user = await getUserById();
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
                        <a href="_" onClick={handleChangeEmail}>
                            Change email
                        </a>
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
