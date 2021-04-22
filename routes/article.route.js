const express = require('express');
const router = express.Router();
const Article = require('../controllers/article.controller');
const authenticate = require('../common/authentication');
const clarify = require('../common/clarify');

router.route('/')
.get(Article.getArticles)
.post(authenticate, Article.newArticle);

router.route('/new')
.get(function (req, res){
    res.render('new_article')
})


router.route('/:id')
.get(Article.getArticle)
.delete(authenticate, clarify, Article.deleteArticle)
.patch(authenticate, clarify, Article.updateArticle);

router.route('/:id/like')
.get(authenticate, Article.getLike)
.post(authenticate, Article.likeArticle);

router.route('/:id/comment')
.post(authenticate, Article.comment);

router.route('/:id/edit')
.get(authenticate, clarify, Article.viewEditArticle)
module.exports = router;
