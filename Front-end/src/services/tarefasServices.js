import axiosInstance from './axiosInstance';

const tarefasServices = {

    pegarTarefas: async (token, categoriaID) => {
        
        try {

            const response = await axiosInstance.get(`/${categoriaID}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
            
                return response.data.tarefasUsuario;
            }
        } catch (error) {

            throw new Error(error.response.data.message || 'Falha ao buscar as tarefas');
        }
    },

    pegarTarefasConcluidas: async (token, categoriaID) => {
        
        try {

            const response = await axiosInstance.get(`/${categoriaID}/concluidos`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
            
                return response.data.tarefasConcluidas;
            }
        } catch (error) {

            throw new Error(error.response.data.message || 'Falha ao buscar as tarefas concluídas');
        }
    },

    concluirTarefa: async (token, categoriaID, tarefaID) => {

        try {

            const response = await axiosInstance.put(`/${categoriaID}/concluir/${tarefaID}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
            
                return response.data.message;
            }
        } catch (error) {

            throw new Error(error.response.data.message || 'Falha ao concluir a tarefa');
        }
    },

    criarTarefa: async (token, categoriaID, tarefaInfo) => {

        try {

            const response = await axiosInstance.post(`/${categoriaID}/criar`, tarefaInfo, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
            
                return response.data.message;
            }
        } catch (error) {

            throw new Error(error.response.data.message || 'Falha ao criar a tarefa');
        }
    },

    atualizarTarefa: async (token, categoriaID, tarefaID, tarefaInfo) => {

        try {

            const response = await axiosInstance.put(`/${categoriaID}/editar/${tarefaID}`, tarefaInfo, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
            
                return response.data.message;
            }
        } catch (error) {

            throw new Error(error.response.data.message || 'Falha ao atualizar a tarefa');
        }
    },

    deletarTarefa: async (token, categoriaID, tarefaID) => {

        try {

            const response = await axiosInstance.delete(`/${categoriaID}/deletar/${tarefaID}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
            
                return response.data.message;
            }
        } catch (error) {

            throw new Error(error.response.data.message || 'Falha ao deletar a tarefa');
        }
    }
};

export default tarefasServices;
