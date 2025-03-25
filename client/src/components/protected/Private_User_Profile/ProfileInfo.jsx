import { useContext, useState } from 'react';
import ModalEmail from './ModalEmail.jsx';
import ModalUsername from './ModalUsername.jsx';
import ModalContacts from './ModalContacts.jsx';
import ModalDescription from './ModalDescription.jsx';
import ModalPassword from "./ModalPassword.jsx";
import { AuthContext } from '../../../contexts/AuthContext.jsx';

const ProfileInfo = () => {
    const { auth } = useContext(AuthContext);

    const [editModalEmail, setEditModalEmail] = useState(false);
    const [editModalUsername, setEditModalUsername] = useState(false);
    const [editModalPassword, setEditModalPassword] = useState(false);
    const [editModalDesc, setEditModalDesc] = useState(false);
    const [editModalContacts, setEditModalContacts] = useState(false);
    const [editModalPicture, setEditModalPicture] = useState(false);

    const handleChangeEmail = () => {
        setEditModalUsername(false);
        setEditModalContacts(false);
        setEditModalDesc(false);
        setEditModalPassword(false);
        setEditModalPicture(false);
        setEditModalEmail(true);
    };

    const handleChangeUsername = () => {
        setEditModalUsername(true);
        setEditModalContacts(false);
        setEditModalDesc(false);
        setEditModalPassword(false);
        setEditModalPicture(false);
        setEditModalEmail(false);
    };

    const handleChangeDescription = () => {
        setEditModalUsername(false);
        setEditModalContacts(false);
        setEditModalDesc(true);
        setEditModalPassword(false);
        setEditModalPicture(false);
        setEditModalEmail(false);
    };

    const handleChangeContacts = () => {
        setEditModalUsername(false);
        setEditModalContacts(true);
        setEditModalDesc(false);
        setEditModalPassword(false);
        setEditModalPicture(false);
        setEditModalEmail(false);
    };

    const handleChangePassword = () => {
        setEditModalUsername(false);
        setEditModalContacts(false);
        setEditModalDesc(false);
        setEditModalPassword(true);
        setEditModalPicture(false);
        setEditModalEmail(false);
    };

    return (
        <>
            <h2>Profile info</h2>
            <section>
                <p>
                    <b>Email:</b>
                    <span>{auth?.email}</span>
                    <i>
                        <button
                            onClick={handleChangeEmail}
                            className="hover:cursor-pointer"
                        >
                            🖉
                        </button>
                    </i>
                </p>
            </section>
            <section>
                <p>
                    <b>Username:</b>
                    <span>{auth?.username}</span>
                    <i>
                        <button
                            onClick={handleChangeUsername}
                            className="hover:cursor-pointer"
                        >
                            🖉
                        </button>
                    </i>
                </p>
            </section>
            <section>
                <p>
                    <b>Password:</b>
                    <span>(secret)</span>
                    <i>
                        <button
                            onClick={handleChangePassword}
                            className="hover:cursor-pointer"
                        >
                            🖉
                        </button>
                    </i>
                </p>
            </section>
            <section>
                <p>
                    <b>Description:</b>
                    <span>{auth?.description || 'Nothing here :('}</span>
                    <i>
                        <button
                            onClick={handleChangeDescription}
                            className="hover:cursor-pointer"
                        >
                            🖉
                        </button>
                    </i>
                </p>
            </section>
            <section>
                <p>
                    <b>Contacts:</b>
                    <span>{auth?.contacts || 'Nothing gere :('}</span>
                    <i>
                        <button
                            onClick={handleChangeContacts}
                            className="hover:cursor-pointer"
                        >
                            🖉
                        </button>
                    </i>
                </p>
            </section>
            <div>
                {editModalEmail ? (
                    <ModalEmail
                        user={auth}
                        showModal={editModalEmail}
                        setShowModal={setEditModalEmail}
                    />
                ) : (
                    <></>
                )}
            </div>
            <div>
                {editModalUsername ? (
                    <ModalUsername
                        user={auth}
                        showModal={editModalUsername}
                        setShowModal={setEditModalUsername}
                    />
                ) : (
                    <></>
                )}
            </div>
            <div>
                {editModalDesc ? (
                    <ModalDescription
                        user={auth}
                        showModal={editModalDesc}
                        setShowModal={setEditModalDesc}
                    />
                ) : (
                    <></>
                )}
            </div>
            <div>
                {editModalContacts ? (
                    <ModalContacts
                        user={auth}
                        showModal={editModalContacts}
                        setShowModal={setEditModalContacts}
                    />
                ) : (
                    <></>
                )}
            </div>
            <div>
                {editModalPassword ? (
                    <ModalPassword
                        user={auth}
                        showModal={editModalPassword}
                        setShowModal={setEditModalPassword}
                    />
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};

export default ProfileInfo;
