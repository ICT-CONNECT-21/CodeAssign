const fs = require("fs");

var json;

module.exports = function(){
  main();
  return json;
};

async function main(){
  await readJson();
}

async function readJson(){
  fs.readdir("../lib",(err,file) => {
    pushJson(file);
  });
}

var pushJson = function(file){
  var base = "../lib/"
  var jsons = [];
  var index = 0;
  for(var i=0;i<file.length;i++){
    if(file[i].includes(".json")){
      jsons[index] = require(base+file[i]);
      index++;
    }
  }
  var no,graph;
  var last = parseInt(jsons[0]["@graph"][jsons[0]["@graph"].length-1]["@id"]);
  for(var i=1;i<jsons.length;i++){
    for(var j=0;j<jsons[i]["@graph"].length;j++){
      graph = jsons[i]["@graph"][j];
      jsons[0]["@graph"].push(graph);
      no = parseInt(jsons[0]["@graph"][jsons[0]["@graph"].length-1]["@id"]);
      jsons[0]["@graph"][jsons[0]["@graph"].length-1]["@id"] = no + last;
    }
    last = parseInt(jsons[0]["@graph"][jsons[0]["@graph"].length-1]["@id"]);
  }
  json = jsons[0];
}