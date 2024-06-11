import schedule from 'node-schedule';
import usuarios from '../model/usuarios.js';

const expireCodeJob = schedule.scheduleJob(' 0 * * * *', async () => {

    try {

        const expirarCodigo = await usuarios.find({ verificationCode: { $ne: "" } });

        await Promise.all(expirarCodigo.map(async codigo => {

            codigo.verificationCode = "";
            await codigo.save();
        }));

        console.log("Códigos expirados com sucesso.");
    } catch (error) {

        console.error("Erro ao expirar o código: ", error);
    }
});

export default expireCodeJob;