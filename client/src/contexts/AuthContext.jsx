import { createContext } from 'react';

const AuthContext = createContext(null);

import loginMe from '../helpers/loginMe.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMe = async () => {
            try {
                if (Cookies.get('tokenJS')) {
                    const data = await loginMe();
                    if (axios.isAxiosError(data))
                        throw new Error(
                            'Unauthorized. Perhaps the server has restarted and your session ended.'
                        );
                    setAuth(data);
                }
            } catch (error) {
                if (error) setAuth(null);
                Cookies.remove('tokenJS');
            } finally {
                setLoading(false);
            }
        };
        fetchMe();
    }, []);
    return (
        <AuthContext.Provider value={{ auth, setAuth, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };