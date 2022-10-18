class MainError extends Error{
    constructor(errorMessage){
        super();
        
        this.name = this.constructor.name;
        this.message = this.errorMessage;

        if(this instanceof RequestError){
            this.statusCode = 400;
            this.type = 'request';
        }
        if(this instanceof CocktailError){
            this.statusCode = 400;
            this.type = 'request';
        }
    }
}

class RequestError extends MainError{};
class CocktailError extends MainError{};

module.exports = {MainError, RequestError, CocktailError};