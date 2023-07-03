const UserReq = require("../models/UserReq");

async function getAllUserReqs(req, res) {
  try {
    const data = await UserReq.findAll();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function addNewReq(req, res) {
  // console.log(req);
  try {
    const { userId } = req.body;

    const { reqContent, datePosted } = req.body;

    await UserReq.create({
      userId,
      reqContent,
      datePosted,
    });

    return res.status(201).json({ message: "Sikeresen hozzáadta kérését" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

module.exports = { getAllUserReqs, addNewReq };
