
import { manageFileUpload } from '../helpers/file-upload-helper.js';
import { Paginator } from '../helpers/paginator-helper.js';
import { Article } from '../models/ArticleModel/ArticleModel.js';
import { article_validation } from '../validations/crud-validations.js'

export const articleResource = async (req, res) => {
  try {

  if (req.method == 'GET') {
    const populate = [
      ['user'],
      ['attachments'],
    ]
    const articles = await Paginator({...req.query}, Article, populate);
    return res.status(200).json({
      status: 'success',
      data: articles
    });
  }

  if (req.method == 'PATCH') {
    const { _id } = req.body
    delete req.body._id
    const article = await Article.find({_id})
    if (article) {
      await Article.findByIdAndUpdate({ _id }, req.body);
      if (req?.file) {
        req.files = [req.file]
      } else {
        for (let file of req.files) {
          const { path, filename } = file
          await manageFileUpload(path, filename, article, 'articles')
        }
      }
      return res.status(200).json({
        status: 'success',
        message: 'Article Updated'
      });
    }
  }

  if (req.method == 'DELETE') {
    const { _id } = req.body
    const article = await Article.find({_id})
    if (article) {
      await Article.deleteOne({_id})
      res.status(200).json({
        status: 'success',
        message: 'Article Deleted'
      });
    } else {
      res.status(401).json({
        status: 'failed',
        message: 'Cannot Deleted Department '
      });
    }
    
  }

  } catch (e) {
    return res.status(500).json({
      status: "error",
      message: e
    });
  }
}

export const createArticle = async (req, res) => { 
  const body = req.body
    const article = new Article(body);
    await article.save();
    if (article) {
      if (req?.file) {
        req.files = [req.file]
      } else {
        for (let file of req.files) {
          const { path, filename } = file
          await manageFileUpload(path, filename, article, 'articles')
        }
      }
      res.status(201).json({
        status: 'success',
        data: article
      });
    }
}

export const editArticle = async (req, res) => { 
  try {
    const { _id, title, description } = req.body
    const article = await Article.findOne({_id})
    if (article) {
      await Article.findByIdAndUpdate({ _id }, {
        title,
        description
      });
      if (req?.file) {
        req.files = [req.file]
      } else {
        for (let file of req.files) {
          const { path, filename } = file
          await manageFileUpload(path, filename, article, 'articles')
        }
      }
      res.status(201).json({
        status: 'success',
        data: article
      });
    }
  } catch (error) {
    console.log(error)
  }
  
}

export const getOneArticle = async (req, res) => {
  try {
    const { articleId } = req.query
    const article = await Article.findOne({ _id:  articleId }).populate('attachments');
    res.status(200).json({
      status: "success",
      data: { article }
    });
  } catch (error) {
    console.log('Error ------', error)
    return res.status(500).json({
      status: "failed",
      error
    });
  }
}
