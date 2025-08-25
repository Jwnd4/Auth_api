module.exports = async (req, res) => {
    // 允许所有来源访问（测试用）
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 允许 POST 方法
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    // 允许 JSON 格式
    res.setHeader('Content-Type', 'application/json');

    // 不管什么请求，都返回成功
    res.status(200).json({ 
        success: true, 
        message: "API 能访问了！",
        method: req.method  // 显示请求方式（GET/POST）
    });
};
