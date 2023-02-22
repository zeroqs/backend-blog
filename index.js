import express from 'express'
import {isValidLogIn, isValidPost, isValidSignUp} from "./validations/validations.js";
import {connectDB} from "./mongoose/connectDB.js";
import isAuth from "./middleware/isAuth.js";
import * as userController from './controllers/userController.js'
import * as postController from './controllers/postController.js'
import {multerStorage} from "./multerStorage/multerStorage.js";


connectDB()

export const app = express()
const upload = multerStorage()


app.use(express.json())
app.use('/uploads',express.static('uploads'));

app.post('/upload', isAuth, upload.single("image"), (req,res) => {
    res.json({
        "url": `/uploads/${req.file.originalname}`
    })
} )

app.get('/', (req, res) => {
    res.status(200).send("Test")
})

app.get('/user', isAuth, userController.getUser)
app.get('/users', userController.getAllUsers)

app.post('/sign-up', isValidSignUp,  userController.register)
app.post('/log-in', isValidLogIn, userController.logIn)

app.get('/posts', postController.getAllPosts)
app.get('/posts/:id', postController.getByPost)
app.post('/posts', isAuth, isValidPost, postController.createPost)
app.delete('/posts/:id', isAuth, postController.deletePost)


app.listen(4444, (e) => {
    if (e) return console.log(e)
})
