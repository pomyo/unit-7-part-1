const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ListSchema = new Schema ( {
    text: {
        type: String,
        trim: true,
        required: "There must be some text",
        validate: [
            function(input) {
                return input.length <= 100;
            },
            "Input too long. Keep it under 100 characters"
        ]
    },
    completed: {
        type: Boolean,
        default: false,
        required: "There must be a completed flag"
    }
});

const Todo = mongoose.model("Todo", ListSchema);

module.exports = Todo;