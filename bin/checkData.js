var request;
function checkKind(record) {
  return record[3] == request.kind;
}
function checkDistinction(record){
  return record[4].includes(request.distinction);
}
function checkGrade(record) {
  //return record[5].includes(request.grade);
  return record[5] == request.grade;
}
function checkSubject(record) {
  //return record[6].includes(request.subject);
  return record[6] == request.subject;
}

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
      if(req.kind) results = results.filter(checkKind)
      if(req.distinction) results = results.filter(checkDistinction);
      if(req.grade) results = results.filter(checkGrade);
      if(req.name){
        for(var i=0;i<req.name.length;i++){
          results = results.filter(val => {
            return val[1].includes(req.name[i]) || val[2].includes(req.name[i])
          });
        }
      }
      if(req.overview){
        for(var i=0;i<req.overview.length;i++){
          results = results.filter(val => {
            return val[8].includes(req.overview[i])
          });
        }
      }
      if(req.subject) results = results.filter(checkSubject);
      if(req.id){
        results = results.filter(val => {
          return val[0] == req.id
        });
      }
    }
    return results;
}