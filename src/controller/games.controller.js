import {
    getDataGameByID_repo, 
    addCartByUserID_repo,
    getCartByUserID_repo,
    addBibliotecaGameByID_repo
} from "../repository/repo.js";

export async function buyGamesOnCart(req, res){
    let { user_id } = res.locals;
    
    const doc = await addBibliotecaGameByID_repo(user_id);

    if(!doc){
        res.status(404).send("Jogo não encontrado, não foi possivel adicionado a Bibliotéca.");
    } else {
        res.status(201).send(doc);
    }
}
export async function getGameByID(req, res){
    let { user_id, game_id } = res.locals;
    game_id = Number(game_id);

    const doc = await getDataGameByID_repo(game_id, user_id);

    if(!doc){
        res.status(404).send("Jogo não encontrado.");
    } else {
        res.status(201).send(doc);
    }
}
export async function addCartByID(req, res){
    let { user_id, game_id } = res.locals;
    game_id = Number(game_id);

    const doc = await addCartByUserID_repo(user_id, game_id);

    if(!doc){
        res.status(404).send("Jogo ja está no carrinho");
    } else {
        res.status(201).send(doc);
    }
}
export async function getCartByID(req, res, next){
    let { user_id } = res.locals;

    const doc = await getCartByUserID_repo(user_id);

    if(!doc){
        res.status(404).send("Não foi encontrado.");
    } else {
        res.status(201).send(doc);
    }
}