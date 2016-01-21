/**
 * Created by Totep on 1/21/16.
 */
var mongoose = require('mongoose');
var Events = require('events');
var Shifts = require('shifts');
var Volunteers = require('volunteers');

//creates a schema to standardize Task creation

var TaskSchema = new mongoose.Schema ({
    name: {String, required: true},
    description: {String, required: true},
    event_id: {String, required: true}
});

// Deletes Task and all associated Items

TaskSchema.statics.delete = function(id, callback){
    this.findById(id, function(err, result){
        if (err) {
            callback(err);
        } else if (result != undefined){
            result.remove(callback);
        }
    });
    Shift.remove({categoryID: id}, function(err){
        if(err) {
            callback(err);
        } else if (!err); {
            callback()
        }
    })
};

module.exports = mongoose.model('Task', TaskSchema);