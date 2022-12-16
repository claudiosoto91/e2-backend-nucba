import express from 'express';
import gastosRoutes from './routes/gastos.routes.js';

const app = express();
app.use(express.json());

app.use('/api',gastosRoutes);


app.use("/", (req, res) => {
    res.json({
        msg: 'E2 - Backend sobre el ingreso de gastos usando DB mysql',
        ejemplo: 'http://localhost:3000/api/gastos Se obtiene todos los gastos ingresados'
    });
})


app.use((req, res, next) => {
    res.status(404).json({
        message: 'La Página no existe'
    });
});

export default app;