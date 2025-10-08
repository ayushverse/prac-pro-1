import {Song} from '../models/song.model.js';

export const getAllSongs = async (req, res,next) => {
    try{
        const songs = await Song.find().sort({createdAt : -1});
        //-1 -> desc -> newest to oldest
        res.json(songs);

    }catch(err){
        next(err);
    }
}

export const getFeaturedSongs = async (req, res,next) => {
    try{
        //every single time when refresh we need random songs
        //fetching 6 random songs using mongoDB aggregation pipeline
        const songs = await Song.aggregate([
            {
                $sample:{size:6}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1,
                }
            }
        ])
            res.json(songs);
    }catch(err){
        next(err);
    }
}
export const getMadeForYouSongs = async (req, res,next) => {
    try{
        //every single time when refresh we need random songs
        //fetching 4 random songs using mongoDB aggregation pipeline
        const songs = await Song.aggregate([
            {
                $sample:{size:4}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1,
                }
            }
        ])
        res.json(songs);
    }catch(err){
        next(err);
    }
}
export const getTrendingSongs = async (req, res,next) => {
    try{
        //every single time when refresh we need random songs
        //fetching 4 random songs using mongoDB aggregation pipeline
        const songs = await Song.aggregate([
            {
                $sample:{size:4}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1,
                }
            }
        ])
        res.json(songs);
    }catch(err){
        next(err);
    }
}