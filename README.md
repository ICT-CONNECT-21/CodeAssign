# コード付与支援ツール CodeAssign

## ●ツール概要

　デジタルコンテンツと学習指導要領コードの紐付けデータを作成するためのツールです。
　本ツールは文部科学省の2021年度事業「オンライン学習システムの全国展開、先端技術・教育データの利活用推進事業（学習指導要領コードの利活用に関する調査研究事業）」の成果の一部として公開しております。

## ●動作保証環境

　OS		：　Windows 10
　ブラウザ	：　Google Chrome

　ネットワーク環境：
　　　ツールのご利用にあたっては、オフライン環境でもご利用いただけますが、
　　　事前準備の段階ではインターネットに接続している必要があります。


## ●使い方

　「コード付与支援ツール　操作マニュアル」をご参照ください。


## ●利用OSS

　本ツールでは、学習指導要領コードを検索する処理において、
　経済産業省がオープンソース（MIT LICENSE）として公開しているIMIコンポーネントツールである
　「産業分類候補生成パッケージ一式」を利用しています。
　
　[参照]
　https://info.gbiz.go.jp/tools/imi_tools/index.html
　https://github.com/code4sabae/imi-enrichment-jsic-es
　
　
　その他、以下のOSSを利用しています。
　
**jQuery**
```
jQuery v3.2.1(https://jquery.com/download/)
MIT License
(c) JS Foundation and other contributors | jquery.org/license
```

**Express**
```
Express 4.17.1(https://github.com/expressjs/express)
MIT License
Copyright (c) 2009-2014 TJ Holowaychuk <tj@vision-media.ca>
Copyright (c) 2013-2014 Roman Shtylman <shtylman+expressjs@gmail.com>
Copyright (c) 2014-2015 Douglas Christopher Wilson <doug@somethingdoug.com>
```

**bootstrap-vue**
```
bootstrap-vue 2.21.2(https://github.com/bootstrap-vue/bootstrap-vue)
MIT License
Copyright (c) 2016-2020 - BootstrapVue
```

**axios**
```
axios 0.24.0(https://github.com/axios/axios)
MIT License
Copyright (c) 2014-present Matt Zabriskie
```

**vue**
```
vue 3.2.21(https://github.com/vuejs/vue-next)
MIT License
Copyright (c) 2018-present, Yuxi (Evan) You
```

**vuex**
```
vuex 4.0.2(https://github.com/vuejs/vuex)
MIT License
Copyright (c) 2016 Nguyen Quoc Anh
```

**vue-axios**
```
vue-axios 3.4.0(https://github.com/imcvampire/vue-axios)
MIT License
Copyright (c) 2016 Nguyen Quoc Anh
```

**pdf.js**
```
pdf.js 2.10.377(https://github.com/mozilla/pdf.js)
Apache License Version 2.0
Copyright 2012 Mozilla Foundation
```

**vue-loaders**
```
vue-loaders 4.1.4(https://github.com/Hokid/vue-loaders)
MIT License
Copyright (c) 2018-present Kirill Horoshilov
```

**csv-parse**
```
csv-parse 5.0.3(https://github.com/adaltas/node-csv)
MIT License
Copyright (c) 2010 Adaltas
```

**iconv-lite**
```
iconv-lite 0.6.3(https://github.com/ashtuchkin/iconv-lite)
MIT License
Copyright (c) 2011 Alexander Shtuchkin
```

**encoding-japanese**
```
encoding-japanese 1.0.30(https://github.com/polygonplanet/encoding.js)
MIT License
Copyright (c) 2014-2019 Polygon Planet
```



## ●学習指導要領コードJSONデータ

　本ツールでは、文部科学省で公開している学習指導要領コードのコード表を元に、
　JSON形式に整形したデータを組み込んで利用しています。
　
　[参照]
　https://www.mext.go.jp/a_menu/other/data_00002.htm

```
{
	"@context": "https://www.mext.go.jp/a_menu/other/index_00001.htm",
	"@graph": [
		{
			"@id": "1565",
			"@type": "コード型",
			"コード種別": "https://www.mext.go.jp/content/20201016-mxt_syoto01-000010374_3.pdf",
			"表記": "8220263216000000",
			"説明": "(ｶ) キリスト教の伝来，織田《おだ》・豊臣《とよとみ》の天下統一を手掛かりに，戦国の世が統一されたことを理解すること。",
			"第01桁": "8",
			"第02桁": "2",
			"第03桁": "2",
			"第04桁": "0",
			"第05桁": "2",
			"第06桁": "6",
			"第07桁": "3",
			"第08桁": "2",
			"第09桁": "1",
			"第10桁": "6",
			"第11桁": "0",
			"第12桁": "0",
			"第13桁": "0",
			"第14桁": "0",
			"第15桁": "0",
			"第16桁": "0"
		},
		{
			"@id": "1566",
			"@type": "コード型",
			"コード種別": "https://www.mext.go.jp/content/20201016-mxt_syoto01-000010374_3.pdf",
			"表記": "8220263217000000",
			"説明": "(ｷ) 江戸幕府の始まり，参勤交代や鎖国などの幕府の政策，身分制を手掛かりに，武士による政治が安定したことを理解すること。",
			"第01桁": "8",
			"第02桁": "2",
			"第03桁": "2",
			"第04桁": "0",
			"第05桁": "2",
			"第06桁": "6",
			"第07桁": "3",
			"第08桁": "2",
			"第09桁": "1",
			"第10桁": "7",
			"第11桁": "0",
			"第12桁": "0",
			"第13桁": "0",
			"第14桁": "0",
			"第15桁": "0",
			"第16桁": "0"
		}
	]
}
```



## ●出力ファイル（output.csv）

　本ツールが作成するデジタルコンテンツと学習指導要領コードの紐付けデータのCSVファイルです。

```
content_id,gakushu_shidoyoryo_code,access_info,comment,search_string
コンテンツID,学習指導要領コード,アクセス情報,コメント,検索文字列
"c00043","8323230400000000","https://XXXX.jp/YYYY/ZZZZ/index.html?page=26","教科書紙面本文","○○○○○"
"c00043","8323230500000000","https://XXXX.jp/YYYY/ZZZZ/index.html?page=26","教科書紙面挿絵","○○○○○"
...
```



