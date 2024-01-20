import moment from 'moment';
import _ from 'lodash';
import { parse } from 'url';

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
        if (key === 'exists') {
          acc.userId = {};
          acc.userId[`$${key}`] = value;
        }
        acc[key] = value;
      }
      
      return acc;
    }, {});

    
    if (query.limit  || query.sort || query.exists) {
      if (query.limit) {
        delete transformedQuery.limit;
      }

      if (query.sort) {
        delete transformedQuery.sort;
      }

      if (query.exists) {
        delete transformedQuery.exists;
      }
      
    }

    const results  = await model.find(transformedQuery)
      .limit(parseInt(query.limit, 10))
      .populate('reportTypeId')
      .sort({ createdAt: query.sort ? query.sort : 'desc' })
    return {
      count: results.length,
      data: results,
    };
  } catch (error) {
    console.log('Error ', error)
  }
  
}
