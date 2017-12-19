const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoryPreferenceSchema = new Schema({
    category: [String],
    subcategory: [String]
});

module.exports = CategoryPreferenceSchema;