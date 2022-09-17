# app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

分页器的展示所需要的条件：
1需要知道当前是第几个：pageNo字段代表当前页面
2需要知道每一个页面展示多少条数据：pageSize字段代表
3需要知道整个分页器一共有多少条数据:total字段进行代表
4需要知道分页器连续页面的格式：5|7，因为以奇数对称较为好看

