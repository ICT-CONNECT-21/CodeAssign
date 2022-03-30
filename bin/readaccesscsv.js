const fs = require("fs");
const csv = require("csv-parse");
const iconv = require("iconv-lite");
module.exports = function(callback) {
    var csvdata = [];
    var inputFilePath = "./lib/accessdata.csv";
    const stream = fs.createReadStream(inputFilePath, { encoding: 'binary' });
    let data = '';
    stream.on('error', err => {
        console.error(err);
        callback(-1);
    });
    stream.on('data', chunk => {
        data += chunk;
    });
    stream.on('end', () => {
        const buf = Buffer.from(data, 'binary');
        const str = iconv.decode(buf, 'Shift_JIS');

        csv.parse(str, function(err, records, info) {
            if (err) {
                return console.error(err);
            }
            records.forEach((element, index) => {
                if (!element) return;
            });
            csvdata = records;
            callback(csvdata)
        })
    })
    
}