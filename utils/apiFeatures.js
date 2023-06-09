class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const location = this.queryStr.location
      ? {
          address: {
            $regex: this.queryStr.location,
            $options: 'i',
          },
        }
      : {};
    this.query = this.query.find({ ...location });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    // Remove fields from query i.e location is not a field in the db
    const removeFields = ['location', 'page'];
    removeFields.forEach((el) => delete queryCopy[el]);
    this.query = this.query.find(queryCopy);
    return this;
  }

  pagination(resultsPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);
    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
