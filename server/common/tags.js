// const tags =
// {
//     '前端': ['json', 'html5', 'javascript', 'firefox', 'jquery', '前端'],
//     'Java': ['eclipse', 'java', 'spring boot', 'spring cloud']
// }
// for (const key in tags) {

//     for (const a in tags[key]) {

//         console.log(tags[key][a]);
//     }
//     console.log(key);
// }

exports.tags = [
    {
        id: 100,
        name: '前端',
        children: [
            {
                id: 10001,
                name: 'json',
            },
            {
                id: 10002,
                name: 'html5',
            },
            {
                id: 10003,
                name: 'javascript',
            },
            {
                id: 10004,
                name: 'firefox',
            },
            {
                id: 10005,
                name: '前端',
            },
            {
                id: 10006,
                name: 'css',
            },
            {
                id: 10007,
                name: 'React'
            },
            {
                id: 10008,
                name: 'Vue'
            },
            {
                id: 10009,
                name: 'Node'
            }
        ]
    },
    {
        id: 101,
        name: '后端',
        children: [
            {
                id: 10101,
                name: 'pho',
            },
            {
                id: 10102,
                name: 'java',
            }
        ]
    },
    {
        id: 102,
        name: '数据结构与算法',
        children: [
            {
                id: 10201,
                name: '算法',
            },
            {
                id: 10202,
                name: '数据结构',
            }
        ]
    },
    {
        id: 103,
        name: '大数据',
        children: [
            {
                id: 10301,
                name: 'sql',
            },
            {
                id: 10302,
                name: 'mysql',
            }
        ]
    },
    {
        id: 104,
        name: '移动开发',
        children: [
            {
                id: 10401,
                name: 'android',
            },
            {
                id: 10402,
                name: 'ios',
            },
            {
                id: 10403,
                name: 'iphone',
            }
        ]
    },
    {
        id: 105,
        name: '游戏',
        children: [
            {
                id: 10501,
                name: '游戏引擎',
            },
            {
                id: 10502,
                name: '动画',
            },
            {
                id: 10503,
                name: '贴图',
            }
        ]

    },
    {
        id: 106,
        name: '编程语言',
        children: [
            {
                id: 10601,
                name: 'python',
            },
            {
                id: 10602,
                name: 'java',
            },
            {
                id: 10603,
                name: 'javascript',
            },
            {
                id: 10604,
                name: 'php',
            },
            {
                id: 10605,
                name: 'c#',
            },
            {
                id: 10606,
                name: 'c++',
            },
            {
                id: 10607,
                name: 'c语言',
            },
            {
                id: 10608,
                name: 'go',
            },
            {
                id: 10699,
                name: '其他语言',
            },
        ]
    },
    {
        id: 999,
        name: '其他',
        children: [
            {
                id: 99999,
                name: '其他',
            }
        ]
    },
]

// for (const key in tags) {

//     // for (const a in tags[key]) {

//     //     console.log(tags[key][a]);
//     // }
//     // console.log(tags[key]);
//     for (const a in tags[key].children) {
//         console.log(tags[key].children[a]);
//     }
// }


// const a =['10001','10002','10102'];
// const fatherTags = new Set();
// for (const item of a) {
//     fatherTags.add(parseInt(item/100));
// }
// console.log([...fatherTags]);

// console.log(JSON.stringify([...fatherTags]));
// // find 可以查找数据中有对应的对象
// console.log(tags.find(e=>e.id==101));
// const tagsId = ['111','222']
// const fatherTagsId = new Set();
// for (const item of tagsId) {
//     fatherTagsId.add(parseInt(item/100));
// }
// console.log(JSON.stringify([...fatherTagsId]));
// const fatherTags = JSON.stringify([...fatherTagsId]);
// const tagss = JSON.stringify(tagsId);
// console.log(tagss);
// console.log(fatherTags);


// 标签数组没有判断前端传过来的值是数字还是字符串