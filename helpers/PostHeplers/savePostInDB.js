import Post from "../../models/Post.js";


export const savePostInDB = async (req) => {

    const doc = new Post({
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags?.split(','),
        user: req.userId,
    });

    return await doc.save()
}