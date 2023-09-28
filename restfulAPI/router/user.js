
const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    res.send("Hellowww");
});

router.get('/:id',(req,res)=>{
    res.send(req.params.id);
});

router.post('/',(req,res)=>{
    res.send(req.body);
});
router.patch('/:id',(req,res)=>{
    res.json(req.body);
});
router.delete('/:id',(req,res)=>{
    res.send(req.params.id);
});



module.exports = router;