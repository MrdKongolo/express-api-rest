const express = require('express');
const checTokenMiddleware = require('../jsonwebtoken/check');

const cocktailCtrl = require('../controllers/cocktail');

let router = express.Router();

/** Middleware for logging date */

router.use((req, res, next) => {
    const event = new Date();
    console.log('Cocktail Time', event.toString());
    next();
});

router.get('', cocktailCtrl.getAllCocktails);

router.get('/:id', checTokenMiddleware, cocktailCtrl.getCocktail);

router.put('', checTokenMiddleware, cocktailCtrl.addCocktail);

router.patch('/:id', checTokenMiddleware, cocktailCtrl.updateCocktail);

router.delete('/trash/:id', checTokenMiddleware, cocktailCtrl.trashCocktail);

router.post('/untrash/:id', checTokenMiddleware, cocktailCtrl.untrashCocktail);

router.delete('/:id', checTokenMiddleware, cocktailCtrl.deleteCocktail);
 
module.exports = router;