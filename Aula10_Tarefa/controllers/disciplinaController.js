const express = require('express');
const Disciplina = require("../models/disciplina");
const Aluno = require("../models/aluno");
const router = express.Router();

router.get('/', async (req,res) => {
    try {
        const disciplina = await Disciplina.find();
        res.status(200).json(disciplina);
    }catch(error){
        res.status(500).json({error: error.message})
    }
});

router.get('/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const disciplina = await Disciplina.findOne({_id: id});

        if (!disciplina) {
            res.status(422).json({ mensagem: "Aluno não encontrado" });
            return;
        }

        const alunos = await Aluno.find({turmaId: id});

        res.status(200).json({disciplina, alunos});
    } catch(error) {
        res.status(500).json({error});
    }
});

router.post('/', async (req,res) => {
    const { nome, cargaHoraria, sala } = req.body;

    const disciplina = {
        nome,
        cargaHoraria,
        sala
    }

    try {
        await Disciplina.create(disciplina);
        res.status(201).json(disciplina);
    } catch (err) {
        res.status(500).json({message: "Ocorreu um erro", err: err.message});
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const fieldsToUpdate = req.body;

        const updatedDisciplina = await Disciplina.findByIdAndUpdate(id, fieldsToUpdate, { new: true });

        if (!updatedDisciplina) {
            return res.status(422).json({ mensagem: "Disciplina não encontrada" });
        }

        res.status(200).json(updatedDisciplina);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar disciplina", erro: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Aluno.deleteMany({ turmaId: id });

        const disciplina = await Disciplina.findByIdAndDelete(id);
        
        if (!disciplina) {
            return res.status(422).json({ mensagem: "Disciplina não encontrada" });
        }

        res.status(200).json({ mensagem: "Excluída com sucesso!" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao excluir disciplina", erro: error.message });
    }
});

module.exports = router;