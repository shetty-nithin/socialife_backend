export const upload = (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename)
}

export default { upload }