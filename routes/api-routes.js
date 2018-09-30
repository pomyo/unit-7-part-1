
// const todo_list = require("../data/todo-list.js");
const db = require("../models");
const util = require("../public/js/util.js");

module.exports = function (app) {
    
    app.delete('/api/delete', function(req, res) {
        let id = req.body.id;
        console.log(util.timeStampedMsg(`Incoming delete request id: ${id}`));

        let query = { _id : id };
        let entry = { success : false, message: "" };
        db.Todo.findByIdAndDelete(query)
        .then(function(data) {
            entry.success = true;
            entry.message = `${data.text} deleted`;
            console.log(util.timeStampedMsg(`Successfully deleted: { id: ${id}, text: ${data.text} }`));
            res.json(entry);
        })
        .catch(function (err) {
            entry.message = err;
            console.log(util.timeStampedMsg(`Failed to delete: { id: ${id}, error: ${err} }`));
            res.json(entry);
        });

    });

    app.post('/api/add', function(req, res) {
        let todo = req.body.todo;
        console.log(util.timeStampedMsg(`Incoming add todo request: ${todo}`));

        let query = { text: todo};
        let entry = { success : false, message: "" };
        db.Todo.create(query)
            .then (function(data) { 
                entry.success = true;
                entry.message = `${data.text} added`;
                entry.data = data;
                console.log(util.timeStampedMsg(`Successfully added: { id: ${data._id}, text: ${data.text} }`));
                res.json(entry);
            })
            .catch(function(err) {
                entry.message = err;
                console.log(util.timeStampedMsg(`Failed to add: { id: ${id}, error: ${err} }`));
                res.json(entry);
            });
    });

    app.put('/api/update', function(req, res) {
        let id = req.body.id;
        console.log(util.timeStampedMsg(`Incoming update request id: ${id}`));

        let query = { _id : id };
        let checked = req.body.checked;
        let entry = { success : false, message: "" };

        db.Todo.findOneAndUpdate(query, {$set: { completed: checked}}, { new: true })
        .then(function(data) {
                entry.success = true;
                entry.message = `${data.text} updated`;
                entry.data = data;
                console.log(util.timeStampedMsg(
                    `Successfully updated: { id: ${data._id}, text: ${data.text}, completed: ${data.completed} }`));
                res.json(entry);
        })
        .catch(function(err) {
                entry.message = err;
                console.log(util.timeStampedMsg(`Failed to update: { id: ${id}, error: ${err} }`));
                res.json(entry);
        });        
    });

    app.get('/api/list', function(req, res) {
        let entry = { success : false, message: "" };
        db.Todo.find({})
        .then(function(data) {
            
            entry.success = true;
            entry.message = `Loaded ${data.length} todo entries`;
            entry.data = data;
            res.json(entry);
            data.forEach(entry => {
                console.log(util.timeStampedMsg(
                    `Loading todo entry: { id: ${entry._id}, text: ${entry.text}, completed: ${entry.completed} }`))
            });
        
        })
        .catch(function(err) {
            entry.message = err;
            console.log(util.timeStampedMsg(`Failed to load initial todo list: { error: ${err} }`));
            res.json(entry);
        });
    });

}