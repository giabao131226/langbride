
const Test = require("../../models/test.model")
const Answer = require("../../models/answer.model")

module.exports.getExam = async (req,res) => {
    const id = req.params.id;

    const data =  await Test.find({IDBKT: id})

    if(data.length>0){
        return res.json({"success": true,"data": data})
    }
    res.json({success: false})
}

module.exports.getAnswer = async (req,res) => {
    const idCauHoi = req.params.id;

    const data = await Answer.find({IDCauHoi: idCauHoi})

    if(data.length>0){
        return res.json({success: true,listAnswer: data})
    }
    res.json({success: false});
}

module.exports.getPoint = async (req,res) => {
    
    const answer = req.body.answer
    const totalQuestion = req.body.totalQuestion
    const pointPerTotal = parseFloat((10/totalQuestion).toFixed(2))

    const results = await Promise.all(answer.map(async (item) => {
        const value = await Answer.find({"IDCauHoi": item.questionID,isCorrect: true})
        if(value.tieuDe == item.value) return item;
        return null;
    })  
    )
    const correct = results.filter(item => item !== null)

    const point = (correct.length*pointPerTotal);
    
    res.json({
        "success": true,
        "mark": point,
        "countCorrect": correct.length,
        "totalQuestion": totalQuestion
    })
    
}