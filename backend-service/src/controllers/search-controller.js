import { Report } from '../models/ReportModel/Report.js';
import { User } from '../models/UserModel/UserModel.js';

export const searchRsource = async (req, res) => {
  const doc = req.body;
  const { query, model, searchTerm } = doc;
  let limit = 50;
  if (query?.limit) {
    limit = parseInt(limit, 10);
    delete query.limit;
  }

  let pipeline = [
    {
      $match: {
        $text: { $search: searchTerm },
      },
    },
    {
      $limit: limit,
    },
  ];
  const accountDataStages = getAccountDataStages(type);
  if (accountDataStages) {
    pipeline = pipeline.concat(accountDataStages);
  }
  const data = await Model(model).aggregate(pipeline);
  return res.status(200).json({
    status: "success",
    data
  });
};
const Model = (type) => {
  let model;
  switch (type) {
    case 'report':
      model = Report;
      break;
      case 'users':
        model = User;
        break;  
    default:
      model = Report;
  }
  return model;
};
const getAccountDataStages = (type) => {
  if (type === 'transactions') {
    return [
      {
        $lookup: {
          from: 'accounts',
          localField: 'account',
          foreignField: '_id',
          as: 'account',
        },
      },
      {
        $addFields: {
          account: { $arrayElemAt: ['$account', 0] },
        },
      },
    ];
  }
  return undefined;
};
