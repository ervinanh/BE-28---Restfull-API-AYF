const Article = require('../../models/articles/m_articles');
const {res_error, res_success} = require('../../response')

const getAllArticles = async (req, res) => {
    // nanti kamu benahi, aku cuman ngecheck jwt nya bisa apa enggak
    try {
        await Article.find({}, (err, result) => {
            if(err) return res_error(res, 400, "400 Bad Request", err.message)
            
            return res_success(res, 200, "200 OK", "Data Articles", result)
        }).clone().catch(err => console.log(err))
    } catch (error) {
        if(error) return res_error(res, 500, "500 Internal Server Error",error.message)
    }
}

const getArticleById = async (req, res) => {
    try {
        const _idArticle = req.params.id;
        await Article.findOne({"_id":_idArticle}, (err, result) => {
            if(err) return res_error(res, 400, "400 Bad Request", err.message)
            
            return res_success(res, 200, "200 OK", "Data Articles", result)
        }).clone().catch(err => console.log(err))
    } catch (error) {
        if(error) return res_error(res, 500, "500 Internal Server Error",error.message)
    }
}

const changeArticleById = async (req, res) => {
    try {
        const _idArticle = req.params.id;
        const {title} = req.body;

        await Article.updateOne({"_id":_idArticle}, {$set:{"title":title}}, (err, result) => {
            if(err) return res_error(res, 400, "400 Bad Request", err.message)

            return res_success(res, 200, "200 OK", "Articles name was changed")
        }).clone().catch(err => console.log(err))
    } catch (error) {
        if(error) return res_error(res, 500, "500 Internal Server Error",error.message)
    }
}

const storeArticle = async (req, res) => {
        try {
            const {author, title, image, likes, content, slug, comments, category} = req.body
            if(req.user.user.role != "63768bc8eceebff9eda8e878" || req.user.user.role == null) res_error(res, 403, "403 Forbidden", err.message);
            Article.create({author, title, image, likes, content, slug, comments, category}, (err, result) => {
                if(err) return res_error(res, 400, "400 Bad Request", err.message)
    
                return res_success(res, 201, "201 Created", "Your was post a article")
            })
        } catch (error) {
            if(error) return res_error(res, 500, "500 Internal Server Error",error.message)
        }
}

const deleteArticleById = async (req, res) => {
    try {
        let _idArticle = req.params.id;
        await Article.deleteOne({_id:_idArticle}, (err, result) => {
            if(err) return res_error(res, 400, "400 Bad Request", err.message)

            return res_success(res, 200, "200 OK", "Your was deleted a article")
        }).clone().catch(err => console.log(err))
    } catch (error) {
        if(error) return res_error(res, 500, "500 Internal Server Error",error.message)
    }
    
}

const deleteAllArticle = async (req, res) => {
    try {
        await Article.deleteMany({}, (err, result) => {
            if(err) return res_error(res, 400, "400 Bad Request", err.message)

            return res_success(res, 200, "200 OK", "Your was deleted all articles")
        }).clone().catch(err => console.log(err))
    } catch (error) {
        if(error) return res_error(res, 500, "500 Internal Server Error",error.message)
    }
    
}

module.exports = {getAllArticles, getArticleById, changeArticleById, storeArticle, deleteArticleById, deleteAllArticle}