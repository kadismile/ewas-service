

export const Paginator = async function(data, Model, populate, fields)  {
  const page = parseInt(data.page, 10) || 0;
  const limit = parseInt(data.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Model.countDocuments(data.query);
  const sort = data.sort;

  const results = await retrieve(Model, populate, fields, page, limit , sort);

  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
    };
  }

  return {
    data: results,
    totalDocs: total,
    count: results.length,
    page: page || 0,
    limit,
    prevPage: pagination.prev?.page || null,
    nextPage: pagination.next?.page || null,
  };
}

const retrieve = (Model, populateFields, page, limit, sort) => {
  let query = Model.find({});
  populateFields.forEach((field) => {
    query = query.populate(field[0]);
  });
  query.sort(sort ? (sort === 'desc' ? { createdAt: -1 } : { createdAt: 1 }) : { createdAt: -1 })
  query.limit(parseInt(limit, 10) || 10)
  query.skip(parseInt(page * limit, 10) || 0); 
  return query
}
