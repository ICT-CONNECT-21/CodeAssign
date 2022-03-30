var request;

module.exports = function(records, req) {
    var results = records;
    if(results === -1 || !results){
      return
    }
    for(var i=0;i<results.length;i++){
      if(results[i].length < 8){
        results[i].push("");
      }
    }
    request = req;
    if(Array.isArray(results) && results.length > 0) {
      if(req.id){
        results = results.filter(val => {
          return val[0] == req.id
        });
      }
    }
    return results;
}