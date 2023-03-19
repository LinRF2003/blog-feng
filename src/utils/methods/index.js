const store = require("@/store");

// 获取父标签列表
const getFatherTags = (categoryTags) => {
    let ft = [];
    for (const tag in categoryTags) {
        ft.push(tag);
    }
    return ft;
}

// 获取子标签列表 需要传入父标签
const getSonTags = (categoryTags,tag) => {
    const tags = categoryTags[tag].tags;
    let sonTags = [];
    for (const tag in tags) {
        sonTags.push(tags[tag]);
    }
    return sonTags;
}

module.exports = {
    getFatherTags,
    getSonTags
}