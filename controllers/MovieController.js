import { createError } from "../error.js"
import { MovieModel } from "../models/MovieModel.js";
import { UserModel } from "../models/UserModel.js";

export const addToFav = async (req, res, next) => {

    try {
        console.log("Running");
        if (!req.body) { return res.status(202).json({msg : "Empty Field Recieved"}); }
        const user = await UserModel.findByIdAndUpdate(req.userId
            , {
                $addToSet: { favorites: req.body.movieId },
            });

        const movie = new MovieModel({ ...req.body, userId: req.userId });
        const savedMovie = await movie.save();
        if (savedMovie) {
            return res.status(200).json({
                msg: "Movie Added Succesfully",
                movie: savedMovie
            })
        } else { return res.status(500).json({msg : "!! Please Check Your Connection"}); }
    } catch (error) { return res.status(500).json({msg : "Internakl srever error"}); }
}

export const removeFromFav = async (req, res, next) => {
    try {
        if (!req.body) { return res.status(202).json({msg : "Empty Field Recieved"}); }
        const user = await UserModel.findByIdAndUpdate(req.userId
            , {
                $pull: { favorites: req.body.movieId },
            });

        console.log("Running");
        const deletedMovie = await MovieModel.findOneAndDelete({ movieId: req.body.movieId });
        if (deletedMovie) {
            return res.status(200).json({
                msg: "Movie deleted Succesfully",
                movie: deletedMovie
            })
        } else { return res.status(500).json({msg : "!! Please Check your internet connection "}); }
    } catch (error) { return res.status(500).json({msg : "Internal server error"}); }
}

export const getFavMovie = async (req, res, next) => {
    try {
        // console.log(req.userId)
        const favMovie = await MovieModel.find({ userId: req.userId });
        if (favMovie) {
            return res.status(200).json({
                msg: "Movie Retrieved Succesfully",
                movies: favMovie
            })
        } else { return res.status(500).json({msg : "!! Please Check your internet connection"}); }
    } catch (error) { return res.status(500).json({msg : "Internal server error"}); }
}