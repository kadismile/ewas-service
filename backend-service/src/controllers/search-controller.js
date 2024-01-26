import { searchFields } from '../helpers/search-fields.js';
import { Report } from '../models/ReportModel/Report.js';
import { User } from '../models/UserModel/UserModel.js';
import { Article } from '../models/ArticleModel/ArticleModel.js';

export const searchRsource = async (req, res) => {
  const doc = req.body;
  const { query, type, searchText } = doc;
  let limit = 50;
  if (query?.limit) {
    limit = parseInt(query.limit, 10);
    delete query.limit;
  }

  const fields = searchFields[type] || [];
  const method = {
    text: {
      query: searchText,
      path: fields,
      fuzzy: { maxEdits: 2, prefixLength: 2 },
      score: { boost: { value: 5 } },
    },
  };

  console.log('Query ======================>>>>>>>>>>>>>>>>. ', Model(type))

  return res.status(200).json({
    status: "success",
    data: await Model(type).aggregate([
      {
        $search: {
          ...method,
        },
      },
      { $match: query },
      {
        $limit: limit,
      },
    ]),
  });
};

const Model = (type) => {
  let model;
  switch (type) {
    case 'reports':
      model = Report;
      break;
    case 'users':
      model = User;
      break;  
    case 'articles':
      model = Article;
      break;  
    default:
      model = Report;
  }
  return model;
};
