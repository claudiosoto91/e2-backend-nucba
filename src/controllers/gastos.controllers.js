import {pool} from '../db.js';

export const getGastos = async(req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM gasto');
        res.json(rows);
    }catch(error){
        return res.status(500).json({
            message: 'No se pudo obtener los gastos'
        });
    }

};

export const getGasto = async(req, res) =>{
    try{
        const [rows] = await pool.query('SELECT * FROM gasto WHERE id = ?', [req.params.id]);
        if ( rows.length <= 0 ) return res.status(404).json({
            message: 'Gasto solicitado no encontrado'
        });
        res.json(rows[0]);
    }catch(error){
        return res.status(500).json({
            message: 'No se obtuvo respuesta'
        }); 
    }

};

export const createGastos = async(req, res) => {
    try{
        const { nombre, valor } = req.body;
        const [rows] = await pool.query('INSERT INTO gasto (nombre, valor) VALUES (?, ?)', [nombre, valor]);
    
        res.send({
            id: rows.insertId,
            nombre,
            valor
        });
    }catch(error){
        return res.status(500).json({
            message: 'No se obtuvo respuesta'
        }); 
    }

};

export const deleteGastos = async(req, res) => {
    try{
        const [result] = await pool.query('DELETE FROM gasto WHERE id = ?', [req.params.id]);

        if ( result.affectedRows <= 0 ) return res.status(404).json({
            message: 'Lo que desea eliminar es posible que no exista'
        });
    
        res.sendStatus(204);
    }catch(error){
        return res.status(500).json({
            message: 'No se obtuvo respuesta'
        }); 
    }

};

export const updateGastos = async(req, res) => {
    try{
        const {id} = req.params;
        const {nombre, valor} = req.body;
        
        const [result] = await pool.query('UPDATE gasto SET nombre = IFNULL(?, nombre), valor = IFNULL(?, valor) WHERE id = ?', [nombre, valor, id]);
    
        if ( result.affectedRows === 0 ) return res.status(404).json({
            message: 'El gasto a actualizar no existe'
        });
        const [rows] =  await pool.query('SELECT * FROM gasto WHERE id = ?', [id]);
    
        res.json(rows[0]);
    }catch(error){
        return res.status(500).json({
            message: 'No se obtuvo respuesta'
        }); 
    }

};