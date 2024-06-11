import schedule from 'node-schedule';
import todoList from '../model/tarefas.js';

// 0 * * * * cron expression, specify the schedule by defining the time units you want the job to run at. 1st * = second (which was omitted from this as it's unnecessary), 2nd * = minute, 3rd * = hour, 4th * = every day of the month, 5th * = every month, and 6th * = every day of the week. In this case, 0 * * * * means run at every hour at 0 minutes.
const changeSituationJob = schedule.scheduleJob(' 0 * * * *', async () => {

    try {

        const tarefasAtrasadas = await todoList.find({ situation: "Pendente", date: { $lt: new Date() } });

        await Promise.all(tarefasAtrasadas.map(async tarefa => {

            tarefa.situation = "Atrasado";
            await tarefa.save();
        }));

        console.log("Situação das tarefas atualizado com sucesso.");
    } catch (error) {

        console.error("Erro ao atualizar a situação das tarefas: ", error);
    }
});

export default changeSituationJob;