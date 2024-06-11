import mongoose from 'mongoose';

async function conexao() {

    try {

        await mongoose.connect(process.env.CLIENT);
    } catch (error) {

        console.log("Erro no banco", error);
    }
}

export default conexao;