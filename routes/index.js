var express = require('express');
var router = express.Router();
var userModel=require('../models/users')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
  res.render('add-users');
});

router.post('/add', function(req, res, next) {
  var bodydata ={
    uname: req.body.txt1,
    ugender: req.body.txt2,
    umobile: req.body.txt3,
  }
  var mydata = userModel(bodydata);
  mydata.save();
  res.send('record added')
});
router.get('/display', function(req, res, next) {
  var mydata
  userModel.find()
  .then(data=>{
    console.log(data);
    res.render('display',{mydata:data})
  })
  .catch(err=>console.log('error'+err))
});

router.get('/show/:id', function(req, res, next) {
  var myid=req.params.id;
  userModel.findById(myid)
  .then(data=>{
    res.render('show',{mydata:data})
  })
  .catch(err=>console.log('error'+err))
});
router.get('/delete/:id', function(req, res, next) {
  var myid=req.params.id;
  userModel.findByIdAndDelete(myid)
  .then(data=>{
    res.redirect('/display');
  })
});

router.get('/edit/:id', function(req, res, next) {
  var myid=req.params.id;
  userModel.findById(myid)
  .then(data=>{
    res.render('edit',{mydata:data});
  })
});

router.post('/update/:id', function(req, res, next) {
  var myid=req.params.id;
  var mydata={
    uname:req.body.txt1,
    ugender:req.body.txt2,
    umobile:req.body.txt3,
  }
  userModel.findByIdAndUpdate(myid,mydata)
  .then(data=>{
    res.redirect('/display');
  })
  .catch(err=>console.log('error' + err))
});


module.exports = router;
