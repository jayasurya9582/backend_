import jwt from 'jsonwebtoken'
import Movie from '../models/Movie';
import Admin from "../models/Admin";
import { res } from './user-controller';
export const addMovie=async()=>{
    const extractedToken=req.headers.autherization.split(" ")[1];
    if(!extractedToken && extractedToken.trim()===""){
        return res.status(404).json({message: "Token not Found"});
    }
    console.log(extractedToken);

    let adminId;

    //verify token
    jwt.verify(extractedToken,process.env.SECRET_KEY,(err,decrypted)=>{
        if(err){
            return res.status(400).json({message:`${err.message}`})
        }else{
            adminId=decrypted.id;
            return;
        }
    });
    //create new movie
    const {title,description,releaseDate,posterUrl,featured, actors}=req.body;
    if(!title && title.trim()==="" && !description && description.trim()=="" && !posterUrl && posterUrl.trim()===""){
        return res.status(422).json({message: "Invalid INputs"});

    }

    let movie;
    try {
        movie=new movie({
            title,
            description,
            releaseDate: new Date(`${releaseDate}`),
            featured,
            actors,
            admin : adminId,
            posterUrl,
        });
        const session= await mongoose.startSession();
        const adminUser=await Admin.findVyId(adminId);
        session.startTransaction();
        await movie.save({session});
        adminUser.addedMovies.pudh(movie);
        await adminUser.save({session});
        await session.commitTransaction();
    } catch(err){
        return console.log(err);
    }

    if(!movie){
        return res.status(500).json({message:"Request Failed"});
    }


    return res.status(201).json({movie});
};

export const getAllMovies=async(req,res,next)=>{
    let movies;

    try {
        movies=await Movie.find();
    } catch(err){
        return console.log(err);
    }
    if(!movies){
        return res.status(500).json({message: 'Request Failed'});
    }
    return res.status(200).json({movies});
};

export const getMovieById=async (req,rexnext)=>{
    const id=req.param.id;
    let movie;
    try{
        movie=await Movie.findById(id)
    }catch(err){
        return console.log(err)
    }
    if(!movie){
        return res.status(404).json({message: "Invalid Movie ID"})
    }
    return res.status(200).json({movie});
};