import {savePostInDB} from "../helpers/PostHeplers/savePostInDB.js";
import Post from "../models/Post.js";
import _ from 'lodash';
export const createPost = async (req, res) => {
    try {
        const post = await savePostInDB(req)
        res.status(200).json(post)

    } catch (e) {
        console.log(e)
        res.status(500).json({
            "message": 'Не удалось создать статью'
        })
    }
}


export const getAllPosts = async (req, res) => {
    try {
        const post = await Post.find().populate('user').exec()
        res.json(post)
        res.status(200)
    } catch (e) {
        res.status(500).json({
            "message": 'Не удалось создать статью'
        })
    }
}

export const getByPost = async (req, res) => {
    try {
        const id = req.params.id
        try {
            const post = await Post.findById({_id:id}).populate('user')

            res.status(200).json(post)
        }catch (e) {
            res.status(500).json({
                "message": 'Не удалось вернуть статью'
            })
            console.log(e)
        }
    } catch (e) {
        console.log(e)
    }
}

export const deletePost = (req, res) => {
    const id = req.params.id
    Post.findOneAndDelete({_id:id}, (err,doc) => {
        if (!err && doc) {
            res.json({
                "status": "Статья удалена"
            })
        } else {
            console.log(e)
            res.status(500).json({
                "message": 'Не удалось удалить статью'
            })
        }
    })
}