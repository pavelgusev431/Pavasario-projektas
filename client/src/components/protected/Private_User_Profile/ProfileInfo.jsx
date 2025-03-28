import { useContext, useState } from 'react';
import ModalEmail from './ModalEmail.jsx';
import ModalUsername from './ModalUsername.jsx';
import ModalContacts from './ModalContacts.jsx';
import ModalDescription from './ModalDescription.jsx';
import ModalPassword from './ModalPassword.jsx';
import { AuthContext } from '../../../contexts/AuthContext.jsx';

const ProfileInfo = () => {
    const { auth } = useContext(AuthContext);

    const [editModalEmail, setEditModalEmail] = useState(false);
    const [editModalUsername, setEditModalUsername] = useState(false);
    const [editModalPassword, setEditModalPassword] = useState(false);
    const [editModalDesc, setEditModalDesc] = useState(false);
    const [editModalContacts, setEditModalContacts] = useState(false);
    const [editModalPicture, setEditModalPicture] = useState(false);

    const re = () => {
        setEditModalUsername(false);
        setEditModalContacts(false);
        setEditModalDesc(false);
        setEditModalPassword(false);
        setEditModalPicture(false);
        setEditModalEmail(false);
    };

    const handleChangeEmail = () => {
        re();
        setEditModalEmail(true);
    };

    const handleChangeUsername = () => {
        re();
        setEditModalUsername(true);
    };

    const handleChangeDescription = () => {
        re();
        setEditModalDesc(true);
    };

    const handleChangeContacts = () => {
        re();
        setEditModalContacts(true);
    };

    const handleChangePassword = () => {
        re();
        setEditModalPassword(true);
    };

    const handleChangePicture = () => {
        re();
        setEditModalPicture(true);
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
                    <span>{auth?.contacts || 'Nothing here :('}</span>
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
            <section>
                <p className="flex flex-col justify-center items-center">
                    <b>Avatar:</b>
                    <img
                        src={auth.image_url}
                        alt="Your avatar will be shown here"
                    />
                    <i>
                        <button
                            onClick={handleChangePicture}
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
