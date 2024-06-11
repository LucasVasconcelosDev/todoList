import axiosInstance from './axiosInstance';

const categoriasServices = {

    pegarCategorias: async (token) => {

        try {

            const response = await axiosInstance.get('/categorias', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
            
                return response.data.categoriasUsuario;
            }
        } catch (error) {

            throw new Error(error.response.data.message || 'Falha ao buscar as categorias');
        }
    },

    criarCategoria: async (token, categoriaNome) => {

        try {

            const response = await axiosInstance.post('/categorias/criar', { name: categoriaNome }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
            
                return response.data.message;
            }
        } catch (error) {

            throw new Error(error.response.data.message || 'Falha ao criar a categoria');
        }
    },
    
    compartilharCategoria: async (token, email, categoriaID) => {

        try {

            const response = await axiosInstance.post(`/categorias/convite/${categoriaID}`, { email: email }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
            
                return response.data.message;
            }
        } catch (error) {

            throw new Error(error.response.data.message || 'Falha ao compartilhar a categoria');
        }
    },

    aceitarCategoriaCompartilhada: async (conviteToken) => {

        try {

            const response = await axiosInstance.get(`/categorias/convite/${conviteToken}`);

            if (response.status === 200) {
            
                return response.data;
            }
        } catch (error) {

            throw new Error(error.response.data.message || 'Falha ao aceitar o convite');
        }
    },

    deletarTarefa: async (token, categoriaID) => {

        try {

            const response = await axiosInstance.delete(`/categorias/deletar/${categoriaID}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
            
                return response.data.message;
            }
        } catch (error) {

            throw new Error(error.response.data.message || 'Falha ao deletar a categoria');
        }
    }
};

export default categoriasServices;
