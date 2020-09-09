const db = require('./dbConnection');
const io = require('./socketConnect');

exports.sendMessage = async (req, res) => {
  try {
    const dbo = await db.getDb();
    switch (req.body.message.toLowerCase()) {
      case 'hello':
      await dbo.collection("chats").insert(req.body);
      await dbo.collection("chats").insert({
        message: "How are you doing ? How can I help you ?",
        userId: "bot007",
        date: new Date()
      })
      break;
      case 'i want to check my balance':
      await dbo.collection("chats").insert(req.body);
      await dbo.collection("chats").insert({
        message: "You have R200. Anything else i can help with ?",
        userId: "bot007",
        date: new Date()
      })
      break;
      case 'no thanks':
      await dbo.collection("chats").insert(req.body);
      await dbo.collection("chats").insert({
        message: "Awesome, Happy to assist goodbye.",
        userId: "bot007",
        date: new Date()
      })
      break;
      default:
      await dbo.collection("chats").insert(req.body);
      await dbo.collection("chats").insert({
        message: "Please ask only the specified questions. Lol !!",
        userId: "bot007",
        date: new Date()
      })
      break;
    }
    io.refreshChat();
    res.send({
      success: true
    });
  } catch (error) {
    res.send({
      success: false,
      message: error
    });
  }
}

exports.getMessage = async (req, res) => {
  try {
    const dbo = await db.getDb();
    const data = await dbo.collection("chats").find().toArray();
    res.send({
      success: true,
      data: data
    });
  } catch (e) {
    res.send({
      success: false,
      message: e
    });
  }
}
