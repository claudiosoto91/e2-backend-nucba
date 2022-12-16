import { Router } from 'express';
import { getGastos, getGasto, createGastos, deleteGastos, updateGastos } from '../controllers/gastos.controllers.js';

const router = Router();

router.get('/gastos', getGastos);

router.get('/gastos/:id', getGasto);

router.post('/gastos', createGastos);

router.patch('/gastos/:id', updateGastos);

router.delete('/gastos', deleteGastos);

router.delete('/gastos/:id', deleteGastos);

export default router;