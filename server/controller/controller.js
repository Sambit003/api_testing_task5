const EbookModel = require('../models/model');

// get all ebooks
const getAllEbooks = async(req, res)=>{
    try {
        const ebooks = await EbookModel.find();
        res.json(ebooks);
    } catch (error) {
        res.json({message:error});
    }
}

// add new ebook
const addNewEbook = async(req, res)=>{
    const ebook = new EbookModel({
        title:req.body.title,
        link:req.body.link
    });
    try {
        const savedEbook = await ebook.save();
        res.json({message:"Ebook added successfully", data:savedEbook});
    } catch (error) {
        res.json({message:error});
    }
}

module.exports = {getAllEbooks, addNewEbook};