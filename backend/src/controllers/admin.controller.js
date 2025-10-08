import{Song} from "../models/song.model.js"
import{Album} from "../models/album.model.js";
import cloudinary from "../db/cloudinary.js";

const uploadToCloudinary = async (file) => {
    try{
        const result = await cloudinary.uploader.upload(file.tempFilePath , {
            resource_type: "auto",
        })
        return result.secure_url;
    }catch(err){
        console.log("uploadToCloudinary failed: ", err);
        throw new Error("Error uploadToCloudinary failed",err);
    }
}

export const createSong = async (req, res ,next) => {
    try{
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(403).json({message:'No file uploaded'});
        }
        const{title,artist,albumId,duration} = req.body
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile

        const audioUrl =  await uploadToCloudinary(audioFile);
        const imageUrl =  await uploadToCloudinary(imageFile);

        const song = new Song({
            title,
            artist,
            albumId : albumId || null,
            duration,
            imageFile,
        })
        await song.save()

            //if song belong to an album updates the album song array
        if(albumId){
            await Album.findByIdAndUpdate(albumId,{
                $push:{songs:song._id}
            })
        }
        return res.status(201).json({message:'Song saved successfully'})
    }catch (err){
        console.log("Error in create song controller",err)
        next(err)
    }
}

export const deleteSong = async (req, res ,next) => {
    try{
        const {id}=req.params

        const song = await song.findById(id)

        //if song belongs to the album update the album

        if(song.albumId){
            await Album.findByIdUpdate(song.albumId,{
                $pull:{songs:song._id}
            })
        }

        await Song.findByIdAndDelete(id)
        return res.status(201).json({message:'Song deleted'})
    }catch(err){
        console.log("Error in delete song controller",err)
        next(err)
    }
}

export const createAlbum = async (req, res ,next) => {
    try{
        const{title,artist,releaseYear} = req.body
        const imageFile = req.files

        const imageUrl =  await uploadToCloudinary(imageFile);

        const album = new Album({
            title,
            artist,
            releaseYear,
            imageUrl,
        })

        album.save()
        return res.status(201).json({message:'Song saved successfully'})
    }catch(err){
        console.log("Error in createAlbum")
        next(err)
    }
}
export const deleteAlbum = async (req, res ,next) => {
    try{
        const {id}=req.params
        await Song.deleteMany({albumId:id})
        await Album.findByIdAndDelete(id)
        return res.status(201).json({message:'Song deleted'})
    }catch(err){
        console.log("Error in deleteAlbum")
        next(err)
    }
}

export const checkAdmin = async (req, res ,next) => {
    res.status(200).json({admin:true})
}