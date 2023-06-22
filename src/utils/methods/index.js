const store = require("@/store");

// 获取子标签列表 需要传入父标签
const getSonTags = (categoryTags,tag) => {
    const tags = categoryTags[tag].tags;
    let sonTags = [];
    for (const tag in tags) {
        sonTags.push(tags[tag]);
    }
    return sonTags;
}

// 转换时间
const formatDate = (timestamp)=> {
    let year = timestamp.getFullYear();
    let month = ("0" + (timestamp.getMonth() + 1)).slice(-2);
    let day = ("0" + timestamp.getDate()).slice(-2);
    let hours = ("0" + timestamp.getHours()).slice(-2);
    let minutes = ("0" + timestamp.getMinutes()).slice(-2);
    let seconds = ("0" + timestamp.getSeconds()).slice(-2);

    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}

module.exports = {
    getSonTags,
    formatDate
}
