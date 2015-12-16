var express = require('express');
var router = express.Router();
var app = express()


router.get('/stream/:query', function(req, res, next) {
	dataHand.stream(req.params.query)
	res.send({success:true})
});

router.get('/addWord/:word', function(req, res, next){
	dataHand.addWord(req.params.word)
	res.send({success:true})
})

router.get('/removeWord/:word', function(req, res, next){
	dataHand.removeWord(req.params.word)
	res.send({success:true})
})

router.get('/destroy', function(req, res, next){
	dataHand.destroy()
	res.send({success:true})
})

router.get('/isStreaming', function(rew, res, next){
	var isStreaming = dataHand.isStreaming()
	res.send({
		success: true,
		isStreaming: isStreaming
	})
})

module.exports = router;
