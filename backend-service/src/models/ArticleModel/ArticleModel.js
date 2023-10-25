import { Schema, model } from "mongoose";

const articleSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Please Add Title"],
    },
    postContent: {
      type: String,
      required: [true, "Please Add contents"],
    },
    featureImage: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: [true, "Please Add Category"],
    },
    isPublish: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

articleSchema.pre("findOne", async function () {
  this.where({ isPublish: true });
});

articleSchema.pre("find", async function () {
  this.where({ isPublish: true });
});

export const Article = model("Article", articleSchema);
