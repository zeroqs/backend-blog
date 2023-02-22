import multer from "multer";


export const multerStorage = () => {
    const storage = multer.diskStorage({
        destination: (_, __, cb) => {
            cb(null, 'uploads')
        },
        filename: (_, file, cb) => {
            cb(null, file.originalname)
        }
    })
    return multer({storage})
}