export const returnDataWithoutPassHash = (res,user,token='') => {
    const {password, ...userData} = user._doc
    res.json({
        ...userData,
        token
    })
}