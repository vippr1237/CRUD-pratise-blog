const mongoose = require('mongoose');
const Article = require('../models/article.model')
const User = require('../models/user.model')
const {articleValidator} = require('../common/validation')
const jwt = require('jsonwebtoken');
//const refreshToken = require('../common/refreshToken')
    
const getArticles = (req, res) => {
    // const newtoken = refreshToken(req.body.token);
    
    Article.find().sort({createAt: -1})
    .then(async (result) =>{
        const data = await getUserNames(result);
        res.render('home',{article: data});
    })
    .catch((err) =>{
        console.log(err);
    })
}

const getArticle = (req, res) => {
    Article.findById(req.params.id)
    .then(async (result) =>{
        let data = JSON.parse(JSON.stringify(result));
        let user = await User.findById(data.author);
        data.username = user.username;
        data.comments.sort((a, b) => {return new Date(b.createAt) - new Date(a.createAt)})
        data.comments = await getUserNames(data.comments);
        
        res.render('article_detail',{detail: data});
    })
    .catch((err) =>{
        console.log(err);
    })
}

const newArticle = async (req, res) =>{
    const {error} = articleValidator(req.body);
    if (error) return res.json(error.details[0].message);
    const article = new Article({
        title: req.body.title,
        body: req.body.body,
        author: req.user._id
    });
    try{
        await article.save();
        res.redirect('/');
    } 
    catch(err){
        res.json(err);
    }   
}
 
const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findOne({_id: req.params.id});
        if (article.author == req.user._id) {
        const deleted = await Article.remove({_id: req.params.id})
        res.redirect('/')
        }
        else {
            res.json('Access Denied');
        }
    }
    catch (err) {
        res.json(err);
    }
}

const updateArticle = async (req, res) => {
    try {
        const article = await Article.findOne({_id: req.params.id});
        const {error} = articleValidator(req.body);
        //validate 
        if (error) return res.json(error.details[0].message);
        const updated = await Article.updateOne(
        {_id: req.params.id},
        {$set: {title: req.body.title, body: req.body.body}}
        );
        res.redirect('/');
    }
    catch (err) {
        res.json(err);
    }
}

async function likeArticle(req, res) {
    try {
        const article = await Article.findOne({_id: req.params.id});
        if (article.likes.indexOf(req.user._id) != -1){
            article.likes.splice(article.likes.indexOf(req.user._id), 1);
            const updated = await article.save();
        } else {
            article.likes.push(req.user._id);
            const updated = await article.save();
        }
        res.json({like :article.likes.indexOf(req.user._id), count: article.likes.length});
    } catch (err) {
        res.json(err);
    }
}

async function comment(req, res) {
    try {
        const newComment = {
            author: req.user._id,
            body: req.body.body
        }
        const article = await Article.findOne({_id: req.params.id});
        article.comments.push(newComment);
        let updated = await article.save();
        let data = JSON.parse(JSON.stringify(updated));
        data.comments = await getUserNames(data.comments);
        res.json(data.comments);
    } catch (err) {
        res.json(err);
    }
}

async function getLike(req, res) {
        
        const article = await Article.findById(req.params.id);
        if (article.likes.indexOf(req.user._id) != -1)
            return res.json(1);
        else 
            return res.json(-1);
}

async function getEditable(req, res) {
    const article = await Article.findOne({_id: req.params.id});
    if (article.author == req.user._id) {
        return res.json(1);
    } else {
        return res.json(-1);
    }
}

async function viewEditArticle (req, res) {
    const article = await Article.findOne({_id: req.params.id});
    res.render('editarticle',{article: article});
}


//ham` phu thg` dung`

async function getUserNames(result) {
    let data = JSON.parse(JSON.stringify(result));
        for (let i = 0; i < data.length; i++) {
            let user = await User.findById(data[i].author);
            data[i].username = user.username;
            //console.log(data[i].author)
        }
    return data;
}


module.exports = {
    getArticles: getArticles,
    newArticle: newArticle,
    getArticle: getArticle,
    deleteArticle: deleteArticle,
    updateArticle: updateArticle,
    likeArticle: likeArticle,
    comment : comment,
    viewEditArticle: viewEditArticle,
    getLike: getLike,
    getEditable: getEditable,
}