import moment from 'moment';
import _ from 'lodash';
import { parse } from 'url';

// export const advancedResults = async (req, model, populate, select) => {
//   try {
//     let query; let queryStr;
//     const reqQuery = { ...req.query };

//     const removeFields = ['select', 'sort', 'limit'];
//     removeFields.forEach((param) => delete reqQuery[param]);

//     if (reqQuery.field?.length) {
//       const { gt, gte, lt, lte } = reqQuery;
//       if (!gt || !gte || !lt || !lte || !reqQuery.in) {
//         // throw new ApplicationError('kindly add a gt, gte, lt, lte in your query params');
//       }
//       const key = reqQuery.field;
//       const iin = reqQuery?.in;
//       delete reqQuery.field;
//       delete reqQuery?.page;
//       delete reqQuery?.in;

//       if (key === 'createdAt' || key === 'updatedAt') {
//         for (const i in reqQuery) {
//           if (['gt', 'gte', 'lt', 'lte', 'in'].includes(i)) {
//                // this is formatted to Year , Month and Day.
//             reqQuery[i] = moment(reqQuery[i], moment.ISO_8601);
//           }
//         }
//       }

//       if (iin) {
//         try {
//           reqQuery.in = JSON.parse(iin);
//           if (!Array.isArray(reqQuery.in)) {
//             // throw new ApplicationError('kindly provide a proper array in the in parameter');
//           }
//         } catch (error) {
//           // throw new ApplicationError("kindly provide a proper array in the 'in' parameter");
//         }
//       }

//       queryStr = JSON.stringify(reqQuery);
//       const parsedInput = JSON.parse(queryStr);
//       query = Object.entries(parsedInput).reduce((acc, [key, value]) => {
//         if (!['gt', 'gte', 'lt', 'lte', 'in'].includes(key)) {
//           acc.reportTypeId = value;
//         } else {
//           if (!acc.createdAt) {
//             acc.createdAt = {};
//           }
//           acc.createdAt[`$${key}`] = value;
//         }
//         return acc;
//       }, {});

//       console.log('Query ===========> ', query)

//     } else {
//       if (reqQuery?.page) delete reqQuery?.page;
//       query = reqQuery;
//     }


//     query = model.find(query);

//     /* if (populate?.length) {
//       query = query.populate('account', '_id name email country phone');
//     } */

//     if (select) {
//       query = query.select(select);
//     }

//     if (req.query.sort) {
//       if (req.query.sort === 'ASC' || req.query.sort === 'asc') {
//         query = query.sort({ createdAt: -1 });
//       }
//       if (req.query.sort === 'DESC' || req.query.sort === 'desc') {
//         query = query.sort({ createdAt: 1 });
//       }
//     }

//     const limit = parseInt(req.query.limit, 10) || 20;

//     if (req.query.limit) {
//       query = query.limit(limit);
//     }

//     const results = await query;

//     return {
//       count: results.length,
//       data: results,
//     };
//   } catch (error) {
//     // throw new ApplicationError(error.message);
//   }
// };

export const advancedResults = async (req, model, populate, select) => {
  try {
    const { query } = parse(req.url, true);
    const transformedQuery = Object.entries(query).reduce((acc, [key, value]) => {
      if (key === 'gt' || key === 'gte' || key === 'lt' || key === 'lte' || key === 'eq') {
        if (!acc.createdAt) {
          acc.createdAt = {};
        }
        acc.createdAt[`$${key}`] = moment(value, moment.ISO_8601);
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (query.limit) {
      delete transformedQuery.limit;
    }

    const results  = await model.find(transformedQuery)
      .limit(parseInt(query.limit, 10));

    return {
      count: results.length,
      data: results,
    };
  } catch (error) {
    console.log('Error ', error)
  }
  
}
