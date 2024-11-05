const express = require('express');
const Aluno = require('../models/aluno');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const aluno = await Aluno.find();
        res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const aluno = await Aluno.findOne({ _id: id });

        if (!aluno) {
            res.status(422).json({ mensagem: "Aluno não encontrado" });
            return;
        }

        const posts = await Post.find({ autorId: id });  // Pega todos os Posts do Usuário

        res.status(200).json({aluno, posts});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.post('/', async (req, res) => {
    const {nome, email, senha, ativo} = req.body;
    
    const aluno = {
        nome,
        idade,
        ra,
        turmaId
    }

    try {
        await Aluno.create(aluno);
        res.status(201).json(aluno);
    } catch(error) {
        res.status(500).json(error.message);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const fieldsToUpdate  = req.body;

        const updatedUsuario = await Usuario.findByIdAndUpdate(id, fieldsToUpdate, { new: true });

        if (!updatedAluno) {
            return res.status(422).json({ mensagem: "Aluno não encontrado" });
        }

        res.status(200).json(updatedAluno);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar Aluno", erro: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Post.deleteMany({ autorId: id });  // Apaga todos os Posts o Usuário

        const aluno = await Usuario.findByIdAndDelete(req.params.id);
        
        if (!aluno) {
            return res.status(422).json({ mensagem: "Aluno não encontrado" });
        }

        res.status(200).json({ mensagem: "Excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao excluir aluno", erro: error.message });
    }
});



module.exports = router;