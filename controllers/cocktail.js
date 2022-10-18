const DB = require('../db.config');
const Cocktail = DB.Cocktail;

exports.getAllCocktails = (req, res) => {
    Cocktail.findAll()
        .then(cocktails => res.json({data:cocktails}))
        .catch(err => res.status(500).json({message: 'Database error',err}));
};

exports.getCocktail = async (req, res, next) => {
    let cocktailId = parseInt(req.params.id);

    if(!cocktailId){
        return res.json(400).json({message: 'Missing Parameter'});
    }
    try {
        let cocktail = await Cocktail.findOne({where: {id: cocktailId}, raw: true});
        
        if((cocktail === null)){
            return res.status(404).json({message: 'This cocktail does not exist'});
        }
        // cocktail found
        return res.json({data: cocktail});
        
    } catch (err) {    
        return res.status(500).json({message: 'Database Error', error: err});
    }
};


exports.addCocktail = async (req, res) => {
    const {user_id, nom, description, recette} = req.body;
    if(!user_id || !nom || !description || !recette){
        return res.status(400).json({message: 'Missing data'});
    }
    let cocktail = await Cocktail.findOne({where: { nom: nom }, raw : true});

    try {
        if(cocktail !== null){
            return res.status(409).json({message: `The name ${nom} already exists !`});
        }  
        cocktail = await Cocktail.create(req.body);
        return res.json({message: `Cocktail ${nom} created`, data:cocktail});      
    } catch (err) {
        return res.status(500).json({message: 'Database Error', error: err});
    }
};

exports.updateCocktail = async (req, res) => {
    let cocktailId = parseInt(req.params.id);

    if(!cocktailId){
        return res.json(400).json({message: 'Missing Parameter'});
    }
    let cocktail = await Cocktail.findOne({where : {id: cocktailId}, raw: true});

    try {
        if(cocktail === null){
            return res.status(400).json({message: 'This cocktail not exist'});
        }
        await Cocktail.update(req.body, {where: {id: cocktailId}});
        return res.json({message: 'Cocktail updated'});
    } catch (error) {
        return res.status(500).json({message: 'Database Error', error: err});
    }
};

exports.trashCocktail = (req, res) => {

    let cocktailId = parseInt(req.params.id);
    
    if(!cocktailId){
        return res.json(400).json({message: 'Missing Parameter'});
    }
    
    Cocktail.destroy({ where: {id: cocktailId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({message: 'Database Error', error: err}));
};

exports.untrashCocktail = (req, res) => {
    let cocktailId = parseInt(req.params.id);
    
    if(!cocktailId){
        return res.json(400).json({message: 'Missing Parameter'});
    }
    Cocktail.restore({where: {id: cocktailId}})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({message: 'Database Error', error: err}));
};

exports.deleteCocktail = (req, res) => {
    let cocktailId = parseInt(req.params.id);

    if(!cocktailId){
        return res.json(400).json({message: 'Missing Parameter'});
    }

    Cocktail.destroy({ where: {id: cocktailId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({message: 'Database Error', error: err}));
};