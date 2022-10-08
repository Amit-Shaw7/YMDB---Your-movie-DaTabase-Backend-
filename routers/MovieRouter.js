import express from "express";
import { addToFav, getFavMovie, removeFromFav} from "../controllers/MovieController.js";
import { verifyToken } from "../verifyToken.js";
const MovieRouter = express.Router();

MovieRouter.route('/add')
    .post(verifyToken, addToFav)

MovieRouter.route('/remove')
    .delete(verifyToken , removeFromFav)

MovieRouter.route('/yourmovies')
    .get(verifyToken , getFavMovie)

export default MovieRouter;






































// MovieRouter.route('/all')
//     .get(getFavMovie)