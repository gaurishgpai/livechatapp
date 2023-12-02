const Message = require("../models/message");
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
async function addMessage(req, res) {
  const { admin_id, visitor_id, sender, message } = req.body;
  try {
    const result = await Message.create({
      admin_id: admin_id,
      visitor_id: visitor_id,
      sender: sender,
      message: message,
    });
    res.status(201).json({ message: "message saved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function getMessage(req, res) {
  const { id } = req.query;
  try {
    const messages = await Message.find({ visitor_id: id });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function getVisitorName(req, res) {
  const { id } = req.query;
  const objectId = new ObjectId(id);

  console.log(id);

  try {
    const result = await Message.aggregate([
      { $match: { admin_id: objectId } },
      { $sort: { timestamp: -1 } },
      {
        $lookup: {
          from: "visitors",
          localField: "visitor_id",
          foreignField: "_id",
          as: "visitor",
        },
      },
      { $unwind: "$visitor" },
      {
        $match: {
          "visitor.status": "notresolved",
        },
      },
      {
        $group: {
          _id: "$visitor_id",
          lastMessage: { $first: "$$ROOT" },
        },
      },
    ]);

    res.json(result);

    console.log(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
module.exports = { addMessage, getMessage, getVisitorName };
