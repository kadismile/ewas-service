import { features } from "process";
import { Article } from "../models/ArticleModel/ArticleModel.js";
import { article_validation } from "../validations/crud-validations.js";
import multer from "multer";
import path from "path";

export const allArticle = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;
  const skip = (page - 1) * limit;

  if (req.method == "GET") {
    const article = await Article.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalItems = await Article.countDocuments();

    return res.status(200).json({
      status: "success",
      data: article,
      totalPages: Math.ceil(totalItems / limit),
    });
  }
};

export const singleArticle = async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id);
  return res.status(200).json({
    status: "success",
    data: article,
  });
};

export const createArticle = async (req, res) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../images/articles/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const upload = multer({
    storage: storage,
  }).single("featureImage");

  const body = req.body;
  const { title, postContent, category } = body;

  if (req.file) {
    const featureImage = req.file.filename;
    console.log(featureImage);
  } else {
    const featureImage = null;
  }

  try {
    const { error } = article_validation.validate(body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    let article = await findArticleByTitle(title);
    if (article) {
      return res.status(301).json({
        status: "failed",
        message: `Article already exists with the title "${title}"`,
      });
    }

    article = new Article({
      title,
      postContent,
      category,
      featureImage,
    });

    await article.save();
    if (article) {
      return res.status(201).json({
        status: "success",
        data: article,
      });
    }
  } catch (e) {
    console.log("Error", e);
    return res.status(500).json({
      status: "error",
      message: e,
    });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const params = req.query;
    const id = params.articleId;
    //console.log(id);
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return res.status(301).json({
        status: "failed",
        message: `Article does not exist`,
      });
    }
    return res.status(200).json({
      status: "success",
      message: `Article deleted`,
    });
  } catch (e) {
    console.log("Error", e);
    return res.status(500).json({
      status: "error",
      message: e,
    });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, postContent, category } = req.body;
    const article = await Article.findByIdAndUpdate(id, {
      title,
      postContent,
      category,
    });
    if (!article) {
      return res.status(301).json({
        status: "failed",
        message: `Article fail to update`,
      });
    }
    return res.status(200).json({
      status: "success",
      data: article,
    });
  } catch (e) {
    console.log("Error", e);
    return res.status(500).json({
      status: "error",
      message: e,
    });
  }
};

const findArticleByTitle = async (title) => {
  const article = await Article.findOne({ title }).select("+postContent");
  if (!article) {
    return null;
  }
  return article;
};
