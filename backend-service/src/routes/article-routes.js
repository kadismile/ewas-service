import express from "express";
import {
  allArticle,
  singleArticle,
  createArticle,
  deleteArticle,
  updateArticle,
} from "../controllers/article-controller.js";
import { protectedRoute, authorize } from "../middlewares/auth-middleware.js";

const router = express.Router();
router.get("/", allArticle);
router.get("/:id", singleArticle);
router.post("/create", createArticle);
router.delete("/delete", deleteArticle);
router.put("/:id", updateArticle);

//router.post('/',  protectedRoute, authorize(['superAdmin']), articleResource);

export default router;
