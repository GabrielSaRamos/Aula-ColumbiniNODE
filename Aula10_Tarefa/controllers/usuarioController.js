const express = require('express');
const Usuario = require('../../models/usuario');
const Post = require('../../models/post');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findOne({ _id: id });

        if (!usuario) {
            res.status(422).json({ mensagem: "Usuario não encontrado" });
            return;
        }

        const posts = await Post.find({ autorId: id });  // Pega todos os Posts do Usuário

        res.status(200).json({usuario, posts});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.post('/', async (req, res) => {
    const {nome, email, senha, ativo} = req.body;
    
    const usuario = {
        nome,
        email,
        senha,
        ativo
    }

    try {
        await Usuario.create(usuario);
        res.status(201).json(usuario);
    } catch(error) {
        res.status(500).json(error.message);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        const updatedUsuario = await Usuario.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedUsuario) {
            return res.status(422).json({ mensagem: "Usuário não encontrado" });
        }

        res.status(200).json(updatedUsuario);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar usuário", erro: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Post.deleteMany({ autorId: id });  // Apaga todos os Posts o Usuário

        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        
        if (!usuario) {
            return res.status(422).json({ mensagem: "Usuário não encontrado" });
        }

        res.status(200).json({ mensagem: "Excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao excluir usuário", erro: error.message });
    }
});



module.exports = router;