import express from 'express';
import produtosController from '../controllers/produtosController';

const router = express.Router();

router.route('/').get(produtosController.getProdutos).post(produtosController.createProduto);
router.route('/:id').put(produtosController.updateProduto).delete(produtosController.deleteProduto);
router.route('/stats').get(produtosController.getTotalandTotalValueProdutos)

export default router;