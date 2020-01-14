## 迷你天气

[![HitCount](http://hits.dwyl.io/TimeGarage/TimeGarage/MiniWeather.svg)](http://hits.dwyl.io/TimeGarage/TimeGarage/MiniWeather)&ensp; ![stars](https://img.shields.io/github/stars/TimeGarage/MiniWeather?color=yellow&style=flat-square)&ensp; ![forks](https://img.shields.io/github/forks/TimeGarage/MiniWeather?style=flat-square)&ensp; ![issues](https://img.shields.io/github/issues/TimeGarage/MiniWeather?color=red&style=flat-square)&ensp; ![license](https://img.shields.io/github/license/TimeGarage/MiniWeather?style=flat-square)

### 项目介绍

迷你天气是一款微信小程序，由高德地图API根据经纬度提供地理位置信息，和风天气API提供气象数据。用户可以使用迷你天气获取实时、每小时和未来7天的气象信息，同时还可以查询空气质量和其它实用指数信息（如紫外线指数、运动指数和洗车指数等。

### 运行截图

<img src="./images4md/Hourly.png" alt="img" width="200px" /> <img src="./images4md/Detail.png" alt="img" width="200px" /> <img src="./images4md/Location.png" alt="img" width="200px" />									

### 目录结构

```
├── LICENSE 
├── README.md
├── app.js
├── app.json
├── app.wxss
├── images4md            //运行截图
│   ├── Detail.png
│   ├── Hourly.png
│   └── Location.png
├── pages
│   ├── img
│   ├── index						 //展示页面
│   │   ├── index.js
│   │   ├── index.wxml
│   │   └── index.wxss
│   └── logs						 //日志输出
│       ├── logs.js
│       ├── logs.json
│       ├── logs.wxml
│       └── logs.wxss
├── project.config.json
├── sitemap.json
└── utils
    ├── network.js       
    └── util.js					 //日期转换

```

### 联系方式

个人博客：[「少数派报告」](https://www.timegarage.works)

Email：82610725@163.com

WeChat：DalePeng

<img src="./images4md/QR.png" alt="img" width="150px" />





