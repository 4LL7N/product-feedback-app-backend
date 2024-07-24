const mongoose = require("mongoose");
const Feedback = require("./feedbackModel");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: [true, "Comment must have content"],
    },
    user: {
      type: {
        image: String,
        name: String,
        username: String,
      },
      require: [true, "comment must have author"],
    },
    feedback: {
      type: mongoose.Schema.ObjectId,
      ref: "Feedback",
      require: [true, "Comment must belong to feedback"],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

commentSchema.virtual("replies", {
  ref: "Reply",
  foreignField: "commentOn",
  localField: "_id",
});

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "replies",
    select: "-__v",
  });
  next();
});

commentSchema.statics.commentCount = async function (doc) {
  const stat = await this.aggregate([
    {
      $match: { feedback: doc.feedback },
    },
    { $group: { _id: "$feedback", num: { $sum: 1 } } },
  ]);
  if(stat.length > 0 ){
    const updatefeedback = await Feedback.findByIdAndUpdate(doc.feedback,{
        commentNo:stat[0].num
    },{new:true})
  }else{
    const updatefeedback = await Feedback.findByIdAndUpdate(doc.feedback,{
        commentNo:0
    },{new:true})
  }
  return stat
};

commentSchema.post("save", function (doc) {
  this.constructor.commentCount(doc)
});
commentSchema.post("findOneAndDelete", function (doc) {
    this.model().constructor.commentCount(doc) 
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
