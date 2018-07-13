module.exports = [
    {
        _id: Math.round(Math.random() * 1000000),
        text:
            "你好",
        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
        user: {
            _id: 1,
            name: "Developer"
        }
    },
    {
        _id: Math.round(Math.random() * 1000000),
        text: "在吗",
        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
        user: {
            _id: 1,
            name: "Developer"
        }
    },
    {
        _id: Math.round(Math.random() * 1000000),
        text: "这是测试",
        createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
        system: true
    }
];