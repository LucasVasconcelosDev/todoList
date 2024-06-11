import axiosInstance from './axiosInstance';

const authServices = {

    login: async (email, password) => {
        
        try {

            const response = await axiosInstance.post('/login', { email, password });

            if (response.status === 200) {
            
                return response.data.token;
            }
        } catch (error) {

            throw new Error(error.response.data.message || 'Falha ao fazer login');
        }
    },

    logout: async () => {

        try {

            const response = await axiosInstance.get('/logout');

            if (response.status === 200) {
            
                return response.data.message;
            }
        } catch (error) {

            throw new Error(error.response.data.message || 'Falha ao deslogar');
        }
    }
};

export default authServices;
