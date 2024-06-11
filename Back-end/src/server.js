import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import changeSituationJob from './utils/tarefasScheduler.js';
import expireCodeJob from './utils/verificationTokenScheduler.js';
import authRoutes from './routes/authRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import categoriasRoutes from './routes/categoriasRoutes.js';
import tarefasRoutes from './routes/tarefasRoutes.js';
import conexao from './config/database.js';

dotenv.config({ path: "../../.env" });
conexao();

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", async (res) => {

  res.clearCookie
});

app.use('/api/', authRoutes);
app.use('/api/', usuariosRoutes);
app.use('/api/', categoriasRoutes);
app.use('/api/', tarefasRoutes);

app.listen(PORT, () => {

  console.log(`Server is running on http://localhost:${PORT}`);
});