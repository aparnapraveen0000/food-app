const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        
        orderId: {
            type: Schema.Types.ObjectId,
            ref: 'order', 
            required: false,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5, 
        },
        comment: {
            type: String,
            trim:true,
        },
    },
    { timestamps: true }
);

const reviewModel = mongoose.model('review', reviewSchema);
module.exports = reviewModel;
