const fs = require("fs");
const path = require("path");
const csv = require("csv-parse");
const iconv = require("iconv-lite");
console.log(process.argv);

if (!process.argv[2] || !process.argv[3]) {
    return console.log("コマンドラインのパラメーターが足りませんでした。");
}
if (path.extname(process.argv[2]) != ".csv") {
    return console.log("コマンドラインのパラメーターがcsvファイルではありませんでした。");
}
if (path.extname(process.argv[3]) != ".json") {
    return console.log("コマンドラインのパラメーターがjsonファイルではありませんでした。");
}
var inputFilePath = process.argv[2];
var outputFilePath = process.argv[3];
const stream = fs.createReadStream(inputFilePath, { encoding: 'binary' });
let data = '';
stream.on('error', err => {
  console.error(err);
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
        console.log(records);
        var elements = [];
        records.forEach((element, index) => {
            if (index == 0 || index == 1) return;
            if (!element) return;

            const param = {
                "@id": element[1],
                "@type": "コード型",
                "コード種別": "https://www.mext.go.jp/content/20201016-mxt_syoto01-000010374_3.pdf",
                "表記": element[3],
                "説明": element[2]
            }
            var chars = element[3].replace(" ","").split('');
            chars.forEach((value, index) => {
                if (index < 9) {
                    param["第0"+(index+1)+"桁"] = value;
                } else {
                    param["第"+(index+1)+"桁"] = value;
                }
            })
            elements.push(param);
        });

        result ={
            "@context": "https://www.mext.go.jp/a_menu/other/index_00001.htm",
            "@graph": elements
        }
        console.log(result);
        var dataJson = JSON.stringify(result);
        fs.writeFile(outputFilePath, dataJson, function(err) {
            if (err) {
                console.log("データ書き込みが失敗しました！");
                return console.error(err);
            }
            console.log("データ書き込みが成功しました！");
        });
    })
})