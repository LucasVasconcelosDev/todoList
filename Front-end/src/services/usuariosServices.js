import axiosInstance from './axiosInstance';

const usuariosServices = {

    cadastrarUsuario: async (usuarioInfo) => {

        try {

            const response = await axiosInstance.post('/register', usuarioInfo);
            
            if (response.status === 200) {

                return response.data.message;
            }
        } catch (error) {
            
            throw new Error(error.response.data.message || 'Falha ao cadastrar o usuário');
        }
    },

    pegarUsuarioFotoNome: async (token) => {

        try {

            const response = await axiosInstance.get('/usuario', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
            
                return response.data.usuario;
            }
        } catch (error) {

            throw new Error(error.response.data.message || 'Falha ao buscar as informações do usuário');
        }
    },
    
    reenviarEmail: async (username, email) => {
        
        try {
            
            const response = await axiosInstance.put('/resend', {username, email});

            if (response.status === 200) {
            
                return response.data.message;
            }
        } catch (error) {
            
            throw new Error(error.response.data.message || 'Falha ao cadastrar o usuário');
        }
    },

    verificarUsuario: async (email, verificationCode) => {

        try {

            const response = await axiosInstance.put('/verify', { email, verificationCode });

            if (response.status === 200) {
                
                return response.data.message;
            }
        } catch (error) {

            throw new Error(error.response.data.message || 'Falha ao verificar o usuário');
        }
    }
};

export default usuariosServices;
