import {savePostInDB} from "../helpers/PostHeplers/savePostInDB.js";
import Post from "../models/Post.js";


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

        Post.findByIdAndUpdate({_id: id}, {$inc: {viewsCount: 1}, returnDocument: 'after'}, (err, doc) => {
            if (!err && doc) {
                res.status(200).json(doc)
            } else if (!doc) {
                res.status(404).json({
                    "message": 'Не удалось найти статью'
                })
            } else {
                res.status(500).json({
                    "message": 'Не удалось вернуть статью'
                })
            }

        })
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