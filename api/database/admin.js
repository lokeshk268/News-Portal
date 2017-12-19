var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var adminSchema = new Schema({
    
    id: {
        type: String,
        unique: true
    },
    pass: String
})

module.exports = mongoose.model('admin', adminSchema);