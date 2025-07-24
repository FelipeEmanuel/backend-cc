import asyncHandler from 'express-async-handler'
import Produto from '../models/produtos'

const getProdutos = asyncHandler(async (req, res) => {

    const { filters } = req.query;

    const pagination = req.query.pagination as Record<string, any> | undefined;
    const page = pagination?.page;
    const limit = pagination?.limit;

    const filtros = filters ? JSON.parse(JSON.stringify(filters)) : {};

    const p = page ? Number(page) : 1
    const l = limit ? Number(limit) : 20

    const produtos = await Produto.find(filtros)
        .sort({ created_at: -1 })
        .skip((l * p) - l)
        .limit(l)
        
    const count = await Produto.countDocuments(filtros)
    
    res.setHeader('x-total-count', count)

    res.status(200).json(produtos)
})

const createProduto = asyncHandler(async (req, res) => {

    const {name, qtd, price, type} = req.body

    if (!name) {
        res.status(400)
        throw new Error('Please add a name!')
    }

    //const game = await Palpite.create(obj)
    const produto = await Produto.create({
        name, qtd, price, type
    })

    res.status(200).json(produto)
})

const updateProduto = asyncHandler(async (req, res) => {
    const produto = await Produto.findById(req.params.id)

    if(!produto) {
        res.status(400)
        throw new Error('Produto not found')
    }

    const updatedProduto = await Produto.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedProduto)
})

const deleteProduto = asyncHandler(async (req, res) => {
    
    try {
        await Produto.findByIdAndDelete(req.params.id)
        //const produtos = await Produto.find().sort({'createdAt': -1}).limit(100)
        res.status(200).json("Deletado")
    } catch (error) {
        res.status(400)
        throw new Error('Produto not found')
    }

       
})


export default { getProdutos, createProduto, updateProduto, deleteProduto }