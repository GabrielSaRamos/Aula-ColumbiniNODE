const express = require('express');
const Exame = require("../models/exame");
const Cliente = require("../models/cliente");
const router = express.Router();

router.get('/', async (req,res) => {
    try {
        const exame = await Exame.find();
        res.status(200).json(exame);
    }catch(error){
        res.status(500).json({error: error.message})
    }
});

router.get('/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const exame = await Exame.findOne({_id: id}).populate("id_cliente");

        if (!exame) {
            res.status(422).json({ mensagem: "Exame não encontrado" });
            return;
        }

        res.status(200).json({exame});
    } catch(error) {
        res.status(500).json({error});
    }
});

router.post('/', async (req,res) => {
    const { nome, clinica, id_cliente } = req.body;

    const exame = {
        nome,
        clinica,
        id_cliente
    }

    try {
        await Exame.create(exame);
        res.status(201).json(exame);
    } catch (err) {
        res.status(500).json({message: "Ocorreu um erro", err: err.message});
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const fieldsToUpdate = req.body;

        const updatedExame = await Exame.findByIdAndUpdate(id, fieldsToUpdate, { new: true });

        if (!updatedExame) {
            return res.status(422).json({ mensagem: "Exame não encontrada" });
        }

        res.status(200).json(updatedExame);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar exame", erro: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Cliente.deleteMany({ id_cliente: id });

        const exame = await Exame.findByIdAndDelete(id);
        
        if (!exame) {
            return res.status(422).json({ mensagem: "Exame não encontrada" });
        }

        res.status(200).json({ mensagem: "Excluída com sucesso!" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao excluir exame", erro: error.message });
    }
});

module.exports = router;