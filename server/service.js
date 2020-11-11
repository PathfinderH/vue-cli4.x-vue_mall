//导入数据库操作文件
const db = require('./db.js');
const jwt = require('jsonwebtoken')
var path = require('path'); //系统路径模块
var fs = require('fs'); //文件模块




//根据商品类别获取product_list数据
exports.getProductList = (req, res) => {

    let category = req.body.category
    let pageNo = Number(req.body.page) || 1;
    let pageCount = Number(req.body.pageSize) || 5;
    let pageSize = pageCount;
    let page = (pageNo - 1) * pageCount;


    let sql = `select * from product_list where category='${category}'`
    db.base(sql, null, (result, error) => {
        if (!req.body.page) {
            db.base(sql, null, (result, error) => {
                if (error) {
                    res.json({ status: 0, message: "获取全部数据失败" });
                } else {
                    res.json({ status: 201, message: `获取${category}全部数据成功`, data: result })
                }
            })

        } else {
            paging(result.length)
        }
    })

    function paging(total) {
        let sql = `select * from product_list where category='${category}' limit ${page},${pageSize};`
        db.base(sql, null, (result, error) => {
            if (error) {
                res.json({ status: 0, message: "获取分页数据失败" });
            } else {
                res.json({ status: 200, message: `获取${category}分页数据成功`, data: result, total: total })
                    // console.log(result);
            }
        })
    }
};




//获取商品详情
exports.getProduct = (req, res) => {
    let id = req.params.id;
    let sql = 'select * from product_list where id=?';
    let data = id;
    db.base(sql, data, (result, error) => {
        if (error) {
            res.json({ status: 0, message: "获取商品详情数据失败" });
        } else {
            res.json({ status: 200, message: "获取商品详情数据成功", data: result[0] });
        }
    });
};

//获取商品详情介绍图片
exports.getProductImg = (req, res) => {
    let id = req.params.id;
    let sql = 'select * from product_img where id=?';
    let data = [id];
    db.base(sql, data, (result, error) => {
        if (error) {
            res.json({ status: 0, message: "获取商品详情介绍图片失败" });
        } else {
            res.json({ status: 200, message: "获取商品详情数据成功", data: result[0] });
        }
    });
};

//获取购物车信息
exports.getShopcar = (req, res) => {
    let info = req.params;
    let sql = "select * from product_list where find_in_set(id,?)>0";
    let data = info.id;
    db.base(sql, data, (result, error) => {
        if (error) {
            res.json({ status: 0, message: "获取购物车数据失败" });
        } else {
            res.json({ status: 200, message: "获取商品详情数据成功", data: result });
        }

    });

};



//获取搜索信息
exports.getSearch = (req, res) => {
    let info = req.params.info;
    let sql = "select * from product_list where title like ?"
    let data = '%' + info + '%';
    db.base(sql, data, (result, error) => {
        if (error) {
            res.json({ status: 0, message: "获取搜索数据失败" });
        } else {
            res.json({ status: 200, message: "获取商品详情数据成功", data: result });
        }
    })
}

//注册账号
exports.register = (req, res) => {
    let info = req.body;
    let username = info.username
    let sql = 'select * from user where username=?'
    db.base(sql, username, (result, error) => {
        if (error) {
            res.json({ status: 0, message: '注册账号失败' })
        } else {
            if (result.length == 0) {
                let sql = 'insert into user set ?';
                db.base(sql, info, (result) => {
                    if (result.affectedRows == 1) {
                        res.json({ status: 200, message: '注册账号成功' });
                    } else {
                        res.json({ status: 0, message: '注册账号失败' });
                    }
                });
            } else {
                res.json({ status: 204, message: '用户名已存在' })
            }
        }
    })
};


//登录账号
exports.login = (req, res) => {
    let arr = [];
    let info = req.body;
    for (let key in info) {
        arr.push(info[key]);
    }
    let sql = 'select * from  user where username=? and password=?'
    db.base(sql, arr, (result, error) => {
        if (error) {
            res.json({ status: 0, message: "登录失败" });
        } else {
            if (!result.length) {
                res.json({ status: 204, message: "账户或密码错误" });
            } else if (result[0].password == info.password) {
                var data = {
                    username: info.username,
                    id: result[0].id
                }

                var token = jwt.sign({ data }, 'abcd', { expiresIn: 60 * 60 });
                return res.json({ status: 200, message: '登录成功', token: token, data: data })
            }
        }

    })
};

//将用户数据更新到数据库
exports.updateDatabaseInfo = (req, res) => {
    let info = req.body;
    let sql = `update user set ${info.field}=? where id=${info.id}`;
    let data = info.data;
    db.base(sql, data, (result, error) => {
        if (error) {
            res.json({ status: 0, message: "更新用户数据失败" });
        } else {
            if (result.affectedRows == 1) {
                res.json({ status: 200, message: "更新用户数据成功" });
            } else {
                res.json({ status: 0, message: "更新用户数据失败" });
            }

        }
    });
}


//查询用户数据
exports.getUserInfo = (req, res) => {
    let info = req.body;
    let sql = `select ${info.field} from  user where id=${info.id}`;
    db.base(sql, null, (result, error) => {
        console.log(result);
        if (error) {
            res.json({ status: 0, message: "查询用户数据失败" });
        } else {

            res.json({ status: 200, message: "查询用户数据成功", data: result });
        }
    });
}



/****************************
 * 以下方法从json文件中获取数据
 * **************************/

//读取data.json文件函数
function getData(callback) {
    fs.readFile(path.join(__dirname, './data.json'), 'utf-8', (error, data) => {
        if (error) throw error
        callback(JSON.parse(data), error)
    })
}
//获取首页竖向轮播图数据
exports.getHomeSlide = (req, res) => {
    getData((data, error) => {
        if (error) {
            res.json({ status: 0, message: "获取首页轮播图数据失败" });
        } else {
            res.json({ status: 200, message: "获取首页轮播图数据成功", data: data.home_swipe });
        }
    })
}



//主页推荐数据
exports.getRecommend = (req, res) => {
    getData((data, error) => {
        if (error) {
            res.json({ status: 0, message: "获取主页推荐数据失败" });
        } else {
            res.json({ status: 200, message: "获取主页推荐数据成功", data: data.home_content_gird });
        }
    })
}

//主页图标数据
exports.getHomeIcon = (req, res) => {
    getData((data, error) => {
        if (error) {
            res.json({ status: 0, message: "获取主页图标数据失败" });
        } else {
            res.json({ status: 200, message: "获取主页图标数据成功", data: data.home_icon });
        }
    })
}




//数码3C页轮播图
exports.getDigitalSlide = (req, res) => {
    getData((data, error) => {
        if (error) {
            res.json({ status: 0, message: "获取数码3C页播图数据失败" });
        } else {
            res.json({ status: 200, message: "获取数码3C页播图数据成功", data: data.phone_slide });
        }
    })
}

//分类页数据
exports.getClassify = (req, res) => {
    getData((data, error) => {
        if (error) {
            res.json({ status: 0, message: "获取分类页数据失败" });
        } else {
            res.json({ status: 200, message: "获取分类页数据成功", data: data.classify_items });
        }
    })
}


//个人中心页更多工具图标数据
exports.getMineIcon = (req, res) => {
    getData((data, error) => {
        if (error) {
            res.json({ status: 0, message: "获取个人中心页图标数据失败" });
        } else {
            res.json({ status: 200, message: "获取个人中心页图标数据成功", data: data.mine_icon_list });
        }
    })
}