const express = require('express');
const app = express();
const fs = require("fs")
const iconv = require("iconv-lite");
const enrichment = require("./bin/main");
const readcsv = require("./bin/readcsv");
const readaccesscsv = require("./bin/readaccesscsv");
const checkData = require("./bin/checkData");
const getAccessData = require("./bin/getAccessData");

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json())

app.use('/css', express.static(__dirname + '/dist/css/'));
app.use('/js', express.static(__dirname + '/dist/js/'));

var data;
var kinds = [];
var subjects = [];
var grades = [];
var distinction = [];
var csvExists = true;

var accessdata;
var accesscsvExists = true;

readcsv(csvData => {
  if(csvData === -1){
    csvExists = false;
    return;
  }
  data = csvData;
  data.forEach(d => {
    kinds.push(d[3]);
    distinction.push(d[4]);
    grades.push(d[5]);
    subjects.push(d[6]);
  });
});

readaccesscsv(csvData => {
  if(csvData === -1){
    accesscsvExists = false;
    return;
  }
  accessdata = csvData;
});


app.get("/api/selectbox",(req,res) => {
  if(!csvExists){
    res.send(csvExists);
    return;
  }
  kinds = kinds.filter((x,i,self) => {
    return self.indexOf(x) === i;
  });
  subjects = subjects.filter((x,i,self) => {
    return self.indexOf(x) === i;
  });
  grades = grades.filter((x,i,self) => {
    return self.indexOf(x) === i;
  });
  distinction = distinction.filter((x,i,self) => {
    return self.indexOf(x) === i;
  });
  var selects = [kinds,subjects,grades,distinction];
  res.send(selects);
});

app.post("/api/imi",(req,res) => {
  try{
    const done = enrichment(req.body.txt);
    res.send(done);
  }catch(e){
    throw e;
  }
});

app.post("/api/meta",(req,res) => {

  /*
  var len = data.length;
  var count = 0;
  var reqData = req.body.data;
  if(reqData.length !== 0){
    reqData.forEach(d => {
      data.push(d);
      count++;
    });
  }
  */
  if(!data) res.send("");
  var results = checkData(data,req.body.param);
  res.send(results);
  //data.splice(len,count);

});

app.post("/api/access",(req,res) => {

  if(!accessdata) res.send("");
  var results = getAccessData(accessdata,req.body.param);
  res.send(results);

});

app.post("/api/checkdata",(req,res) => {
  var data = req.body.data;
  if(!data) res.send("");
  var results = checkData(data,req.body.param);
  res.send(results);
});

var option = {flag: "a"};
app.post("/api/coordinate",(req,res) => {
  var data = req.body.coordinate;
  var writeData = data.content_id
          + "," + data.gakushu_shidoyoryo_code
          + "," + data.access_info
          + "," + data.comment
          + "," + data.search_string
          + "," + data.x
          + "," + data.y
          + "," + data.w
          + "," + data.h
          + "\n"
  fs.writeFile("./log/coordinate.csv",writeData,option,err => {
    if(err) throw err;
  });
});

app.post("/api/log",(req,res) => {
  var log = req.body.log + "\n";
  var now = new Date();
  now = formatDate(now, "yyyy/MM/dd HH:mm:ss");
  //起動ログをわかりやすくするため、上下を改行する
  if(req.body.log == "TOOL STARTED"){
    log = "\n" + now + "  *************** TOOL STARTED ***************\n";
  }else{
    log = now + "  " + log;
  }
  fs.writeFile("./log/codeassign.log",log,option,err => {
    if(err) throw err;
  });
  res.send(log);
});

app.post("/api/appendCSV",req => {
  var list = req.body.list;
  var writeData = "\"" + list.id + "\",\"" + list.name + "\",\"\",\"" + list.kind + "\",\"" +
                  list.distinction + "\",\"" + list.grade + "\",\"" +
                  list.subject + "\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"\r\n";
  var files = fs.readdirSync("./lib");
  var file;
  var count = 0;
  files.forEach(f => {
    if(f == "metadata.csv"){
      file = f;
      count++;
    }
  });
  if(count > 0){
    fs.appendFileSync("./lib/"+file,iconv.encode(writeData,"shift_jis"));
  }else{
    fs.writeFileSync("./lib/metadata.csv",iconv.encode(writeData,"shift_jis"));
  }
  
  readcsv(csvData => {
    data = csvData;
  });
});

app.listen(3000);

function formatDate(date, format) {
  format = format.replace(/yyyy/g, date.getFullYear());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
  format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
  format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
  return format;
};