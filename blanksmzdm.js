/*
环境评价
SMZDM_COOKIE 什么值得买Cookie
什么值得买自动签到任务
更新地址：https://github.com/Tsukasa007/my_script
============Quantumultx==============
[task_local]
#什么值得买自动签到
0 43 1/8 * * ? smzdm_mission.js, tag=什么值得买自动签到, img-url=https://raw.githubusercontent.com/tsukasa007/icon/master/smzdm_mission.png, enabled=true
================龙==============
[脚本]
cron "0 43 1/8 * * ?" script-path=smzdm_mission.js,tag=什么值得买自动签到
==============电涌================
什么值得买自动签到 = type=cron,cronexp="0 43 1/8 * * ?",wake-system=1,timeout=3600,script-path=smzdm_mission.js
============小火箭==========
什么值得买自动签到= type=cron,script-path=smzdm_mission.js, cronexpr="0 43 1/8 * * ?", timeout=3600, enable=true
*/
const  smzdmCookieKey  =  ""device_id=1984504037159003719257480592db73b457d4748e3c27fba5f7c03748; __gads=ID=b45f5c929de5b3b5-22424c0084c600a1:T=1616068656:R:S=ALNI_MYQW-zwvvQc20yig5sv9Gwrza_8Sg; homepage_sug=a; r_sort_type=score; ad_date=3; user=user%3A1904850900%7C1904850900; smzdm_id=1904850900; _zdmA.time=1627921742854.39521.https%3A%2F%2Fwww.smzdm.com%2F; smzdm_user_view=97DB58E806118DBCDDE791A6131B4475; smzdm_user_source=8CA5866152A7CC657A93D861FE1D7A6E; _gat_UA-27058866-1=1; _zdmA.uid=ZDMA.h00MoF1Nu.1627921808.2419200; _zdmA.vid=*; Hm_lvt_9b7ac3d38f30fe89ff0b8a0546904e58=1627920855; Hm_lpvt_9b7ac3d38f30fe89ff0b8a0546904e58=1627921808; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%221904850900%22%2C%22first_id%22%3A%2217432f91158df-0364281a7de51f8-116b634a-1327104-17432f9115947%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E8%87%AA%E7%84%B6%E6%90%9C%E7%B4%A2%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Fwww.baidu.com%2Flink%22%7D%2C%22%24device_id%22%3A%2217432f91158df-0364281a7de51f8-116b634a-1327104-17432f9115947%22%7D; userId=user:1904850900|1904850900; zdm_qd=%7B%22referrer%22%3A%22https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3DYAI67lB0FD9ELJMBFfnD2GPd3L8MDTW-PO3kKumlZzu%26wd%3D%26eqid%3Df293824500517e1c00000002610819c1%22%7D; _ga_09SRZM2FDD=GS1.1.1627920851.5.1.1627921808.0; footer_floating_layer=0; ad_json_feed=%7B%7D; bannerCounter=%5B%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A2%2C%22surplus%22%3A1%7D%2C%7B%22number%22%3A0%2C%22surplus%22%3A1%7D%5D; _ga=GA1.2.1128423766.1590037196; _gid=GA1.2.362904745.1627920854; amvid=4ac6efbb3a32ed76ade2f37bdc6b3077"" ;
const  scriptName  =  "什么值得买" ;
让 clickGoBuyMaxTimes  =  12 ;  // 好价点击去购买的次数
让 clickLikeProductMaxTimes  =  7 ;  // 好价点值次数
让 clickLikeArticleMaxTimes  =  7 ;  //好文点赞次数
让 clickFavArticleMaxTimes  =  7 ;  // 好文收藏次数

let  magicJS  =  MagicJS ( scriptName ,  "INFO" ) ;
const  $  =  new  Env ( "什么值得买自动签到" ) ;
魔术师。UnifiedPushUrl  =  magicJS 。读( "smzdm_unified_push_url" )  ||  魔术师。阅读（“magicjs_unified_push_url” ）；
常量 通知 =  $ 。节点( ) ? 要求( './sendNotify' ) : '' ;
让 结果 =  [ ]
让 cookieSMZDMs  =  [ ]
如果 （过程。ENV 。SMZDM_COOKIE ） {
  如果 （过程。ENV 。SMZDM_COOKIE 。的indexOf （'＆' ） >  - 1 ） {
    cookieSMZDMs  = 进程。ENV 。SMZDM_COOKIE 。拆分( '&' ) ;
  }  else  if  ( process . env . JD_COOKIE . indexOf ( '\n' )  >  - 1 )  {
    cookieSMZDMs  = 进程。ENV 。SMZDM_COOKIE 。拆分( '\n' ) ;
  } 其他 {
    cookieSMZDMs  =  [进程. ENV 。SMZDM_COOKIE ] ;
  }
}

//签到
功能 登录 （cookie ） {
  返回 新的 承诺（（解决） =>  {
    让 选项 =  {
      网址：'https : //zhiyou.smzdm.com/user/checkin/jsonp_checkin' ，
      标题：{
        "接受" : "*/*" ,
        "Accept-Encoding" : "gzip, deflate, br" ,
        "Accept-Language" : "zh-cn" ,
        “连接”：“保持活动” ，
        “曲奇”：曲奇，
        "Host" : "zhiyou.smzdm.com" ,
        "Referer" : "https://m.smzdm.com/zhuanti/life/choujiang/" ,
        “用户代理”：
            “Mozilla/5.0（iPhone；CPU iPhone OS 14_2，如 Mac OS X）AppleWebKit/605.1.15（KHTML，如 Gecko）Mobile/15E148/smzdm 9.9.0 rv:91（iPhone 11 Pro Max；iOS 14.2；zh_CN）/ iphone_smzdmapp/9.9.0/wkwebview/jsbv_1.0.0" ,
      } ,
    } ;
    魔术师。获取（选项， （错误， 响应， 数据） =>  {
      如果 （错误） {
        魔术师。logWarning ( `每日签到，请求异常：${ err } ` ) ;
        resolve ( "每日签到，请求异常" ) ;
      } 其他 {
        魔术师。log ( `每日签到成功` ) ;
      }
    } ) ;
  } ) ;
}


// 获取点击去购买和点值的链接
函数 GetProductList ( )  {
  返回 新的 承诺（（解决， 拒绝） =>  {
    让 getGoBuyOptions  =  {
      url : "https://faxian.smzdm.com/" ,
      标题：{
        "接受" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q =0.9" ,
        "Accept-Language" : "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6" ,
        "缓存控制" : "max-age=0" ,
        “连接”：“保持活动” ，
        "Host" : "www.smzdm.com" ,
        "用户代理" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36 Edg/84.0.522.52" ,
      } ,
      正文: "" ,
    } ;
    魔术师。get ( getGoBuyOptions ,  ( err ,  resp ,  data )  =>  {
      如果 （错误） {
        拒绝（错误）；
      } 其他 {
        // 获取每日去购买的链接
        让 goBuyList  = 数据。匹配( / https?: \/ \/ go \ .smzdm \ .com \/ [ 0-9a-zA-Z ] * \/ [ ^"' ] * _0 / gi ) ;
        如果 （！！goBuyList ） {
          // 去除重复的商品链接
          let  goBuyDict  =  { } ;
          去购买清单。forEach ( (元素)  =>  {
            让 productCode  =  element 。匹配( / https?: \/ \/ go \ .smzdm \ .com \/ [ 0-9a-zA-Z ] * \/ ( [ ^"' ] * _0 ) / ) [ 1 ] ;
            goBuyDict [产品代码]  = 元素；
          } ) ;
          goBuyList  = 对象。值（goBuyDict ）；
          魔术师。logDebug （`当前获取的每日去购买链接：$ { JSON 。字符串化（goBuyList ）} ` ）;
        } 其他 {
          goBuyList  =  [ ] ;
        }

        // 获取每日点值的链接
        让 productUrlList  = 数据。匹配（/ HTTPS ?: \ / \ / WWW \。 smzdm \。的COM \ / p \ / [ 0-9 ] * / GI ）;
        让 likeProductList  =  [ ] ;
        如果 （！！productUrlList ） {
          产品网址列表。forEach ( (元素)  =>  {
            像产品列表。推（元件。匹配（/ HTTPS ?: \ / \ / WWW \。 smzdm \。的COM \ / p \ / （[ 0-9 ] * ）/）[ 1 ] ）;
          } ) ;
        }
        解决（[ goBuyList ， likeProductList ] ）；
      }
    } ) ;
  } ) ;
}

// 获取点赞和收藏的好文Id
函数 GetDataArticleIdList ( )  {
  返回 新的 承诺（（解决， 拒绝） =>  {
    让 getArticleOptions  =  {
      url : "https://post.smzdm.com/" ,
      标题：{
        "接受" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q =0.9" ,
        "Accept-Language" : "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6" ,
        "Host" : "post.smzdm.com" ,
        "用户代理" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36 Edg/85.0.564.41" ,
      } ,
      正文: "" ,
    } ;
    魔术师。获取( getArticleOptions ,  ( err ,  resp ,  data )  =>  {
      如果 （错误） {
        魔术师。logWarning ( `获取好文列表失败，请求异常：${ err } ` ) ;
        拒绝（“GetArticleListErr” ）；
      } 其他 {
        试试 {
          让 articleList  = 数据。匹配（/数据文章= “ *数据类型= ”赞“，” / GI ）;
          让 结果 =  [ ] ;
          文章列表。forEach ( (元素)  =>  {
            结果。推（元件。匹配（/数据文章= “ （。* ）的数据类型= ”赞“，” /）[ 1 ] ）;
          } ) ;
          解决（结果）；
        } 抓住 （错误） {
          魔术师。logWarning ( `获取好文列表失败，执行异常：${ err } ` ) ;
          拒绝（“GetArticleListErr” ）；
        }
      }
    } ) ;
  } ) ;
}

// 点击去购买
函数 ClickGoBuyButton ( cookie ,  url )  {
  返回 新的 承诺（（解决） =>  {
    让 clickGoBuyOptions  =  {
      网址：网址，
      标题：{
        曲奇：曲奇，
      } ,
    } ;
    魔术师。get ( clickGoBuyOptions ,  ( err ,  resp ,  data )  =>  {
      解决( ) ;
    } ) ;
  } ) ;
}

// 好价点值
功能 ClickLikeProduct ( cookie ,  articleId )  {
  返回 新的 承诺（（解决） =>  {
    让 ClickLikeProductOptions  =  {
      网址：“https://zhiyou.smzdm.com/user/rating/ajax_add” ，
      标题：{
        "接受" : "application/json, text/javascript, */*; q=0.01" ,
        "Accept-Language" : "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6" ,
        "Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8" ,
        "Host" : "zhiyou.smzdm.com" ,
        "来源" : "https://faxian.smzdm.com" ,
        "Referer" : "https://faxian.smzdm.com/" ,
        "用户代理" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36 Edg/85.0.564.41" ,
        “曲奇”：曲奇，
      } ,
      正文：`article_id= ${ articleId } &channel_id=3&rating=1&client_type=PC&event_key=%E7%82%B9%E5%80%BC&otype=%E5%80%BC&aid= ${ articleId } &p=16&cid=2&source=%E6% 97%A0&atp=3&tagID=%E6%97%A0&sourcePage=https%3A%2F%2Ffaxian.smzdm.com%2F&sourceMode=%E6%97%A0` ,
    } ;
    魔术师。发布( ClickLikeProductOptions ,  ( err ,  resp ,  data )  =>  {
      如果 （错误） {
        魔术师。logWarning ( `好价${ articleId }点值失败，请求异常：${ articleId } ` ) ;
        解决（假）；
      } 其他 {
        试试 {
          让 obj  =  JSON 。解析（数据）；
          如果 （OBJ 。ERROR_CODE  ==  0 ） {
            魔术师。logDebug ( `好价${ articleId }点值成功` ) ;
            解决（真）；
          } else if (obj.error_code == 1) {
            magicJS.logDebug(`好价${articleId}点值重复点值`);
            resolve(true);
          } else {
            magicJS.logWarning(`好价${articleId}点值失败，接口响应异常：${data}`);
            resolve(false);
          }
        } catch (err) {
          magicJS.logWarning(`好价${articleId}点值失败，执行异常：${articleId}`);
          resolve(false);
        }
      }
    });
  });
}

// 好文点赞
function ClickLikeArticle(cookie, articleId) {
  return new Promise((resolve) => {
    let ClickLikeProductOptions = {
      url: "https://zhiyou.smzdm.com/user/rating/ajax_add",
      headers: {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Host": "zhiyou.smzdm.com",
        "Origin": "https://post.smzdm.com",
        "Referer": "https://post.smzdm.com/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36 Edg/85.0.564.41",
        "Cookie": cookie,
      },
      body: `article_id=${articleId}&channel_id=11&rating=1&client_type=PC&event_key=%E7%82%B9%E5%80%BC&otype=%E7%82%B9%E8%B5%9E&aid=${articleId}&p=2&cid=11&source=%E6%97%A0&atp=76&tagID=%E6%97%A0&sourcePage=https%3A%2F%2Fpost.smzdm.com%2F&sourceMode=%E6%97%A0`,
    };
    magicJS.post(ClickLikeProductOptions, (err, resp, data) => {
      if (err) {
        magicJS.logWarning(`好文${articleId}点赞失败，请求异常：${articleId}`);
        resolve(false);
      } else {
        try {
          let obj = JSON.parse(data);
          if (obj.error_code == 0) {
            magicJS.logDebug(`好文${articleId}点赞成功`);
            resolve(true);
          } else if (obj.error_code == 1 && obj.error_msg == "已喜欢") {
            magicJS.logDebug(`好文${articleId}点赞失败，重复点值。`);
            resolve(false);
          } else {
            magicJS.logWarning(`好文${articleId}点赞失败，接口响应异常：${data}`);
            resolve(false);
          }
        } catch (err) {
          magicJS.logWarning(`好文${articleId}点赞失败，请求异常：${err}`);
          resolve(false);
        }
      }
    });
  });
}

// 好文收藏/取消收藏
function ClickFavArticle(cookie, articleId) {
  return new Promise((resolve) => {
    let options = {
      url: "https://zhiyou.smzdm.com/user/favorites/ajax_favorite",
      headers: {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Host": "zhiyou.smzdm.com",
        "Origin": "https://post.smzdm.com",
        "Referer": "https://post.smzdm.com/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36 Edg/85.0.564.41",
        "Cookie": cookie,
      },
      body: `article_id=${articleId}&channel_id=11&client_type=PC&event_key=%E6%94%B6%E8%97%8F&otype=%E6%94%B6%E8%97%8F&aid=${articleId}&cid=11&p=2&source=%E6%97%A0&atp=76&tagID=%E6%97%A0&sourcePage=https%3A%2F%2Fpost.smzdm.com%2F&sourceMode=%E6%97%A0`,
    };
    magicJS.post(options, (err, resp, data) => {
      if (err) {
        magicJS.logWarning(`好文${articleId}收藏失败，请求异常：${articleId}`);
        resolve(false);
      } else {
        try {
          let obj = JSON.parse(data);
          if (obj.error_code == 0) {
            magicJS.logDebug(`好文${articleId}收藏成功`);
            resolve(true);
          } else if (obj.error_code == 2) {
            magicJS.logDebug(`好文${articleId}取消收藏成功`);
            resolve(true);
          } else {
            magicJS.logWarning(`好文${articleId}收藏失败，接口响应异常：${data}`);
            resolve(false);
          }
        } catch (err) {
          magicJS.logWarning(`好文${articleId}收藏失败，请求异常：${err}`);
          resolve(false);
        }
      }
    });
  });
}

// 获取每日抽奖active_id
function GetLotteryActiveId(cookie) {
  return new Promise((resolve) => {
    let options = {
      url: "https://m.smzdm.com/zhuanti/life/choujiang/",
      headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "m.smzdm.com",
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148/smzdm 9.9.6 rv:93.4 (iPhone13,4; iOS 14.5; zh_CN)/iphone_smzdmapp/9.9.6/wkwebview/jsbv_1.0.0",
      },
    };
    magicJS.get(options, (err, resp, data) => {
      if (err) {
        magicJS.logWarning(`获取每日抽奖Id失败，请求异常：${err}`);
        resolve("获取每日抽奖Id失败，请求异常");
      } else {
        try {
          let activeId = /name\s?=\s?\"lottery_activity_id\"\s+value\s?=\s?\"([a-zA-Z0-9]*)\"/.exec(data);
          if (activeId) {
            resolve(activeId[1]);
          } else {
            magicJS.logWarning(`获取每日抽奖activeId失败`);
            resolve("");
          }
        } catch (err) {
          magicJS.logWarning(`获取每日抽奖activeId失败，请求异常：${err}`);
          resolve("");
        }
      }
    });
  });
}

// 每日抽奖
function LotteryDraw(cookie, activeId) {
  return new Promise((resolve) => {
    let options = {
      url: `https://zhiyou.smzdm.com/user/lottery/jsonp_draw?callback=jQuery34109305207178886287_${new Date().getTime()}&active_id=${activeId}&_=${new Date().getTime()}`,
      headers: {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "zhiyou.smzdm.com",
        "Referer": "https://m.smzdm.com/zhuanti/life/choujiang/",
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148/smzdm 9.9.0 rv:91 (iPhone 11 Pro Max; iOS 14.2; zh_CN)/iphone_smzdmapp/9.9.0/wkwebview/jsbv_1.0.0",
      },
    };
    magicJS.get(options, (err, resp, data) => {
      if (err) {
        magicJS.logWarning(`每日抽奖失败，请求异常：${err}`);
        resolve("每日抽奖失败，请求异常");
      } else {
        try {
          let newData = /\((.*)\)/.exec(data);
          let obj = JSON.parse(newData[1]);
          if (obj.error_code === 0 || obj.error_code === 1 || obj.error_code === 4) {
            magicJS.logInfo(`每日抽奖结果：${obj.error_msg}`);
            resolve(obj.error_msg);
          } else {
            magicJS.logWarning(`每日抽奖失败，接口响应异常：${data}`);
            resolve("每日抽奖失败，接口响应异常");
          }
        } catch (err) {
          magicJS.logWarning(`每日抽奖失败，请求异常：${err}`);
          resolve("每日抽奖失败，请求异常");
        }
      }
    });
  });
}

// 获取用户信息，新版
function WebGetCurrentInfoNewVersion(smzdmCookie) {
  返回 新的 承诺（（解决） =>  {
    让 选项 =  {
      url : "https://zhiyou.smzdm.com/user/exp/" ,
      标题：{
        饼干：smzdmCookie ，
      } ,
      正文: "" ,
    } ;
    魔术师。获取（选项， （错误， 响应， 数据） =>  {
      如果 （错误） {
        魔术师。logError ( `获取用户信息失败，异常信息：${ err } ` ) ;
        解析（[空， 空， 空， 空， 空， 空， 空] ）；
      } 其他 {
        试试 {
          // 获取用户名
          让 用户名 = 数据。匹配（/信息-东西-昵称。*之右\。 smzdm \。的COM \ /用户[ ^ < ] * > （[ ^ < ] * ） < /）[ 1 ] 。修剪( ) ;
          // 获取近期经验值变动情况
          让 pointTimeList  = 数据。匹配( / <div class="scoreLeft"> ( . * ) < \/ div> / gi ) ;
          让 pointDetailList  = 数据。match ( / <div class= [ '" ] scoreRight 省略号[ '" ] > ( . * ) < \/ div> / gi ) ;
          让 minLength  =  pointTimeList 。长度 >  pointDetailList 。长度？点详细信息列表。长度：点时间列表。长度；
          让 userPointList  =  [ ] ;
          for  (让 i  =  0 ;  i  <  minLength ;  i ++ )  {
            用户点列表。推（{
              时间：pointTimeList [ i ] 。匹配( / \< div class= [ '" ] scoreLeft [ '" ] \> ( . * ) \< \/ div \> / ) [ 1 ] ,
              详细信息：pointDetailList [ i ] 。匹配( / \< div class= [ '" ] scoreRight 省略号[ '" ] \> ( . * ) \< \/ div \> / ) [ 1 ] ,
            } ) ;
          }
          // 获取用户资源
          让 assetsNumList  = 数据。匹配( / assets-part [ ^< ] * > ( . * ) < / gi ) ;
          让 points  =  assetsNumList [ 0 ] 。匹配( / assets-num [ ^< ] * > ( . * ) < / ) [ 1 ] ;  // 积分
          让 经验 =  assetsNumList [ 2 ] 。匹配( / assets-num [ ^< ] * > ( . * ) < / ) [ 1 ] ;  // 经验
          让 黄金 =  assetsNumList [ 4 ] 。匹配( / assets-num [ ^< ] * > ( . * ) < / ) [ 1 ] ;  // 金币
          // let prestige = assetsNumList[6].match(/assets-num[^<]*>(.*)</)[1]; //威望
          让 声望 =  0 ;
          让 银 =  assetsNumList [ 6 ] 。匹配( / assets-num [ ^< ] * > ( . * ) < / ) [ 1 ] ;  // 碎银子
          resolve ( [ userName ,  userPointList ,  Number (点数) ,  Number (经验) ,  Number ( gold ) ,  Number (声望) ,  Number ( silver ) ] ) ;
        } 抓住 （错误） {
          魔术师。logError ( `获取用户信息失败，异常信息：${ err } ` ) ;
          解析（[空， 空， 空， 空， 空， 空， 空] ）；
        }
      }
    } ) ;
  } ) ;
}

// 获取用户信息
函数 WebGetCurrentInfo ( smzdmCookie )  {
  返回 新的 承诺（（解决） =>  {
    让 webGetCurrentInfo  =  {
      网址：`https   : //zhiyou.smzdm.com/user/info/jsonp_get_current?with_avatar_ornament= 1 & callback=jQuery112403507528653716241_ ${新日期（）。getTime ( ) } &_= ${新日期( ) . getTime ( ) } ` ,
      标题：{
        "Accept" : "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01" ,
        "Accept-Language" : "zh-CN,zh;q=0.9" ,
        “连接”：“保持活动” ，
        "DNT" : "1" ,
        "Host" : "zhiyou.smzdm.com" ,
        "Referer" : "https://zhiyou.smzdm.com/user/" ,
        "用户代理" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36" ,
        "Cookie" : smzdmCookie ,
      } ,
    } ;
    magicJS.get(webGetCurrentInfo, (err, resp, data) => {
      try {
        let obj = JSON.parse(/\((.*)\)/.exec(data)[1]);
        if (obj["smzdm_id"] !== 0) {
          resolve([
            obj["nickname"], // 昵称
            `https:${obj["avatar"]}`, // 头像
            obj["vip_level"], // 新版VIP等级
            obj["checkin"]["has_checkin"], //是否签到
            Number(obj["checkin"]["daily_checkin_num"]), //连续签到天数
            Number(obj["unread"]["notice"]["num"]), // 未读消息
            Number(obj["level"]), // 旧版等级
            Number(obj["exp"]), // 旧版经验
            Number(obj["point"]), // 积分
            Number(obj["gold"]), // 金币
            Number(obj["silver"]), // 碎银子
          ]);
        } else {
          magicJS.logWarning(`获取用户信息异常，Cookie过期或接口变化：${data}`);
          resolve([null, null, null, null, null, false, null, null]);
        }
      } catch (err) {
        magicJS.logError(`获取用户信息异常，代码执行异常：${err}，接口返回数据：${data}`);
        resolve([null, null, null, null, null, false, null, null]);
      }
    });
  });
}

(async () => {
  // 通知信息
  let title = "什么值得买";
  let subTitle = "";
  let content = "";
  // 获取Cookie
  // let smzdmCookie = magicJS.read(smzdmCookieKey);

  if (!!cookieSMZDMs === false) {
    // magicJS.logWarning("没有读取到什么值得买有效cookie，请访问zhiyou.smzdm.com进行登录");
    // magicJS.notify(scriptName, "", "❓没有获取到Web端Cookie，请先进行登录。");
    notify.sendNotify(scriptName,"没有读取到什么值得买有效cookie，请访问zhiyou.smzdm.com进行登录")
    content+=("\n没有读取到什么值得买有效cookie，请访问zhiyou.smzdm.com进行登录")
  } else {
    for (let i = 0; i < cookieSMZDMs.length; i++) {
      try {
        $.index = i+1
        content+=("\n========== [Cookie " + $.index + "] Start ========== ")
        magicJS.log("\n========== [Cookie " + $.index + "] Start ========== ")
        let smzdmCookie = cookieSMZDMs[i]
        // 任务完成情况
        let clickGoBuyTimes = 0;
        let clickLikePrductTimes = 0;
        let clickLikeArticleTimes = 0;
        let clickFavArticleTimes = 0;

        // 查询签到前用户数据
        let [nickName, avatar, beforeVIPLevel, beforeHasCheckin, , beforeNotice, , , beforePoint, beforeGold, beforeSilver] = await WebGetCurrentInfo(smzdmCookie);
        if (!nickName) {
          magicJS.notify(scriptName, "", "❌Cookie过期或接口变化，请尝试重新登录");
          magicJS.done();
        } else {
          let [, , , beforeExp, , beforePrestige] = await WebGetCurrentInfoNewVersion(smzdmCookie);
          magicJS.logInfo(
              `昵称：${nickName}\nWeb端签到状态：${beforeHasCheckin}\n签到前等级${beforeVIPLevel}，积分${beforePoint}，经验${beforeExp}，金币${beforeGold}，碎银子${beforeSilver}， 未读消息${beforeNotice}`
          );

          //web签到
          if (!beforeHasCheckin) {
            content+="签到！"
            await SignIn(smzdmCookie);
          }

          // 每日抽奖
          let activeId = await GetLotteryActiveId(smzdmCookie);
          if (activeId){
            content = await LotteryDraw(smzdmCookie, activeId);
          }

          // 获取去购买和好价Id列表
          let [, [goBuyList = [], likProductList = []]] = await magicJS.attempt(magicJS.retry(GetProductList, 5, 1000)(), [[], []]);
          // 获取好文列表
          let [, articleList = []] = await magicJS.attempt(magicJS.retry(GetDataArticleIdList, 5, 1000)(), []);

          // 好价点击去购买，Web端点击已无奖励，放弃
          const clickGoBuyAsync = async () => {
            let clickGoBuyList = goBuyList.splice(0, clickGoBuyMaxTimes);
            if (clickGoBuyList.length > 0) {
              for (let i = 0; i < clickGoBuyList.length; i++) {
                await ClickGoBuyButton(smzdmCookie, clickGoBuyList[i]);
                magicJS.logInfo(`完成第${i + 1}次“每日去购买”任务，点击链接：\n${clickGoBuyList[i]}`);
                clickGoBuyTimes  +=  1 ;
                等待 magicJS 。睡眠（3100 ）；
              }
            }
          } ;

          // 好价点值
          const  clickLikeProductAsync  =  async  ( )  =>  {
            让 clickLikeProductList  =  likProductList 。splice ( 0 ,  clickLikeProductMaxTimes ) ;
            如果 （clickLikeProductList 。长度 >  0 ） {
              对于 （让 我 =  0 ; 我 <  clickLikeProductList 。长度; 我++ ） {
                等待 ClickLikeProduct ( smzdmCookie ,  clickLikeProductList [ i ] ) ;
                魔术师。logInfo ( `完成第${ i  +  1 }次“好价点值”任务，好价Id：${ clickLikeProductList [ i ] } ` ) ;
                clickLikePrductTimes  +=  1 ;
                等待 magicJS 。睡眠（3100 ）；
              }
            }
          } ;

          // 好文点赞
          const  clickLikeArticleAsync  =  async  ( )  =>  {
            让 likeArticleList  =  articleList 。splice ( 0 ,  clickLikeArticleMaxTimes ) ;
            如果 （likeArticleList 。长度 >  0 ） {
              对于 （让 我 =  0 ; 我 <  likeArticleList 。长度; 我++ ） {
                等待 ClickLikeArticle ( smzdmCookie ,  likeArticleList [ i ] ) ;
                魔术师。logInfo ( `完成第${ i  +  1 }次“好文点赞”任务，好文Id：${ likeArticleList [ i ] } ` ) ;
                clickLikeArticleTimes  +=  1 ;
                等待 magicJS 。睡眠（3100 ）；
              }
            }
          } ;

          // 好文收藏
          const  clickFavArticleAsync  =  async  ( )  =>  {
            让 favArticleList  =  articleList 。splice ( 0 ,  clickFavArticleMaxTimes ) ;
            如果 （favArticleList 。长度 >  0 ） {
              // 好文收藏
              对于 （让 我 =  0 ; 我 <  favArticleList 。长度; 我++ ） {
                等待 ClickFavArticle ( smzdmCookie ,  articleList [ i ] ) ;
                魔术师。logInfo ( `完成第${ i  +  1 }次“好文收藏”任务，好文Id：${ articleList [ i ] } ` ) ;
                clickFavArticleTimes  +=  1 ;
                等待 magicJS 。睡眠（3100 ）；
              }
              //取消收藏
              对于 （让 我 =  0 ; 我 <  favArticleList 。长度; 我++ ） {
                等待 ClickFavArticle ( smzdmCookie ,  articleList [ i ] ) ;
                魔术师。logInfo ( `取消第${ i  +  1 }次“好文收藏”任务的好文，好文Id：${ articleList [ i ] } ` ) ;
                等待 magicJS 。睡眠（3100 ）；
              }
            }
          } ;

          等待 承诺。all ( [ clickGoBuyAsync ( ) ,  clickLikeProductAsync ( ) ] ) ;
          等待 承诺。all ( [ clickLikeArticleAsync ( ) ,  clickFavArticleAsync ( ) ] ) ;

          //查询签到后用户数据
          等待 magicJS 。睡眠（3000 ）；
          让 [ ， ， afterVIPLevel ， afterHasCheckin ， afterCheckinNum ， afterNotice ， ， ， afterPoint ， afterGold ， afterSilver ]  =  AWAIT  WebGetCurrentInfo （smzdmCookie ）;
          让 [ ， afteruserPointList ， ， afterExp ， ， afterPrestige ]  =  AWAIT  WebGetCurrentInfoNewVersion （smzdmCookie ）;
          魔术师。日志信息(
              `昵称：${ nickName } \nWeb端签到状态：${ afterHasCheckin } \n签到后等级${ afterVIPLevel }，积分${ afterPoint }，经验${ afterExp }，金币${ afterGold }，碎银子${ afterSilver }，未读消息${ afterNotice } `
          ) ;

          // 通知内容
          if  ( afterExp  &&  beforeExp )  {
            让 addPoint  =  afterPoint  -  beforePoint ;
            让 addExp  =  afterExp  -  beforeExp ;
            让 addGold  =  afterGold  -  beforeGold ;
            // 让 addPrestige = afterPrestige - beforePrestige;
            让 addSilver  =  afterSilver  -  beforeSilver ;
            内容 +=  ！！内容？"\n" : "" ;
            内容 +=
                "积分"  +
                后点 +
                ( addPoint  >  0 ? "(+"  +  addPoint  +  ")" : "" )  +
                "经验"  +
                afterExp  +
                ( addExp  >  0 ? "(+"  +  addExp  +  ")" : "" )  +
                "金币"  +
                后金 +
                ( addGold  >  0 ? "(+"  +  addGold  +  ")" : "" )  +
                "\n"  +
                《碎银子》 +
                后银 +
                ( addSilver  >  0 ? "(+"  +  addSilver  +  ")" : "" )  +
                // '威望' + afterPrestige + (addPrestige > 0 ? '(+' + addPrestige + ')' : '') +
                " 未读消息"  +
                事后通知；
          }

          content  +=  `\n点值${ clickLikePrductTimes } / ${ clickLikeProductMaxTimes }去购买${ clickGoBuyTimes } / ${ clickGoBuyMaxTimes } \n点赞${ clickLikeArticleTimes } / ${ clickLikeArticleMaxTimes }收藏${ clickLikeArticleTimes } / ${ clickFavArticle } ` ;

          内容 +=  ！！内容？"\n" : "" ;
          如果 （afteruserPointList 。长度 >  0 ） {
            content  +=  "用户近期经验变动情况(有延迟)：" ;
            在用户点列表之后。forEach ( (元素)  =>  {
              content  +=  `\n ${ element [ "time" ] }  ${ element [ "detail" ] } ` ;
            } ) ;
            content  +=  "\n如经验值无变动，请更新Cookie。" ;
          } 其他 {
            content  +=  “没有获取到用户近期的经验变动情况” ；
          }

          title  =  ` ${ scriptName } - ${ nickName } V ${ afterVIPLevel } ` ;
          // magicJS.notify(title, subTitle, content, { "media-url": avatar });
        }
      } 抓住 （错误） {
        // magicJS.logError(`执行任务出现异常：${err}`);
        结果。push ( `执行任务出现异常：${ err } ` )
        // magicJS.notify(scriptName, "", "❌执行任务出现，请演示日志");
        通知。sendNotify (  scriptName , `❌执行任务出现，请示范日志` ) ;
      }
      含量+ = （“\ n ========== [曲奇”  +  $ 。指数 +  “]结束========== \ n \ n \ n”个）
      魔术师。日志（“\ n ========== [曲奇”  +  $ 。指数 +  “]结束========== \ n \ n \ n”个）
      结果。推送（内容）
    }
  }
  魔术师。完成( ) ;
  通知。sendNotify (  scriptName , result . join ( "\n" ) ) ;
} ) ( ) ;

// 更漂亮的忽略
功能 MagicJS （脚本名= “MagicJS” ，日志级别= “INFO” ）{返回 新 类{构造函数（）{如果（这个。版本= “2.2.3.3” ，这个。脚本名称=脚本名，这个。记录等级= { DEBUG：5 , INFO : 4 , NOTIFY : 3 ,警告：2 ，ERROR：1 ，CRITICAL：0 ，无：- 1 } ，此。isLoon = "undefined" != typeof  $loon , this 。isQuanX = "undefined" != typeof  $task , this 。isJSBox = "undefined" != typeof  $drive , this . isNode = "undefined" != typeof 模块＆！这个。isJSBox ，这个。isSurge = "undefined" != typeof  $httpClient && ! 这个。是龙，这个。节点= {请求：无效 0 ，fs：无效 0 ，数据：{ } } ，这个。iOS用户代理=“Mozilla/5.0（iPhone；CPU iPhone OS 13_3_1 像 Mac OS X）AppleWebKit/605.1.15（KHTML，像 Gecko）版本/13.0.5 Mobile/15E148 Safari/604.1” ，这个. pcUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Edg/84.0.522.59" ,这个. logLevel = logLevel ，这个。_barkUrl = "" ,这个. isNode ) {这个。节点。fs = require ( "fs" ) ,这个.node.request=require("request");try{this.node.fs.accessSync("./magic.json",this.node.fs.constants.R_OK|this.node.fs.constants.W_OK)}catch(err){this.node.fs.writeFileSync ( "./magic.json" , "{}" , { encoding : "utf8" } ) }这个。节点。data = require ( "./magic.json" ) }否则 这个。isJSBox && （$文件。存在（“驱动：// MagicJS” ）|| $文件。MKDIR （“驱动：// MagicJS” ）， $文件。存在（“驱动：// MagicJS /魔法。) || $文件。写入（{数据：$数据（{字符串：“{}” } ），路径：“drive://MagicJS/magic.json” } ））}设置 barkUrl （网址）{这个。_barkUrl =网址。替换( / \/ + $ / g , "" ) }设置 logLevel ( level ){这个。_logLevel = "string" == typeof  level ? 水平。toUpperCase ( ) : "DEBUG" } get  logLevel ( ) {返回 这个。_logLevel } get  isRequest ( ) { return "undefined" != typeof  $request && "undefined" == typeof  $response } get  isResponse ( ) { return"undefined" != typeof  $response } get  request ( ) { return "undefined" != typeof  $request ? $request : void  0 } get  response ( ) { return "undefined" != typeof  $response ? （$响应。hasOwnProperty （“身份” ）&& （$响应。的StatusCode = $响应。状态）, $响应。hasOwnProperty ( "statusCode" ) && ( $response . status = $response . statusCode ) , $response ) : void  0 } get  platform ( ) { return  this . 是浪涌？“浪涌”：这个。是全X吗？“量子X”：这个。是龙吗？“龙”：这个。isJSBox ? “JSBox”：这个。是节点？"Node.js" : "Unknown" } read ( key , session = "" ) { let  val = "" ; 这个。isSurge || 这个。是龙吗？val = $persistentStore 。读（键）：这个。是全X吗？val = $prefs 。键值（重点）：这个。是节点？价值=这个。节点。数据：这个。isJSBox && ( val = $file . read ( "drive://MagicJS/magic.json" ) . string ) ; 试试{这个。isNode && ( val = val [ key ] ) , this . isJSBox && ( val= JSON 。解析（VAL ）[键] ），会话&& （“串” == typeof运算 VAL && （VAL = JSON 。解析（VAL ）），VAL = VAL && “对象” == typeof运算 VAL？VAL [会话]：空）}赶上（错误）{这个。日志错误（错误），val = session？{ }：空，这个。del ( key ) } void  0 === val && ( val = null ) ; try { val && "string" == typeof  val && ( val = JSON . parse ( val ) ) } catch ( err){}return this.logDebug(`READ DATA [${key}]${session?`[${session}]`:""}(${typeof val})\n${JSON.stringify(val)}`),val}write(key,val,session=""){let 数据=会话？{ } : "" ; 如果（会话&& （此。isSurge ||此。isLoon ）？数据= $ persistentStore 。读（键）：会话&&此。isQuanX？数据= $首选项。valueForKey （键）：此。isNode？数据=这个。节点。数据：这个。isJSBox && （数据= JSON 。解析（$文件。读（“驱动器：//MagicJS/magic.json” ）。字符串）），会话）{尝试{ “字符串” == typeof运算数据&& （数据= JSON 。解析(数据) ) ,数据= "对象" == typeof运算 数据&&数据？数据：{ } }捕捉（错误）{这个。日志错误（错误），这个。del ( key ) , data = { } }这个。isJSBox || 这个。是节点？( data [ key ] && "object" == typeof  data [ key ]|| （数据[键] = { } ），数据[键] 。hasOwnProperty ( session ) || （数据[键] [会话] = null ），void  0 === val ? 删除 数据[键] [会话]：数据[键] [会话] =val ) : void  0 === val ? 删除 数据[会话]：数据[会话] = val }否则 这个。isNode || 这个。isJSBox ? 无效 0 === val ? 删除 数据[键] :数据[键] = val :数据= void  0 === val ?空: val ; "object" == typeof  data && ( data = JSON . stringify ( data ) ) , this . isSurge || 这个。是龙吗？$persistentStore 。写（数据，键）：这个。是全X吗？$prefs 。setValueForKey ( data , key )：这个。是节点？这个。节点。FS 。writeFileSync （“./magic.json” ，数据）：这个。isJSBox && $file 。写（{数据：$数据（{字符串：数据} ），路径：“驱动器：//MagicJS/magic.json” } ），这个。logDebug ( `WRITE DATA [ ${ key } ] ${会议？`[ ${ session } ]` : "" } ( ${ typeof  val } )\n ${ JSON . stringify ( val ) } `)}del(key,session=""){this. logDebug(`DELETE KEY [ ${ key } ] ${ session ? `[ ${ session } ]` :"" } `)，这个。写（键，空，会话）}通知（标题=这个。脚本名称，子标题=“”，正文=“”，选择=“”）{让 convertOptions; if(opts=(_opts=>{let newOpts={};如果( "string" == typeof  _opts )这个。是龙吗？newOpts = { openUrl : _opts }：这个。是全X吗？newOpts = { "open-url" : _opts } : this 。isSurge && ( newOpts = { url : _opts } ) ; else  if ( "object" == typeof  _opts ) if（此。isLoon ）newOpts 。openUrl = _opts [ "open-url" ] ? _opts [ "open-url" ] : "" , newOpts 。mediaUrl = _opts [ “媒体网址” ] ? _opts [ “媒体网址” ]：“” ；否则 ，如果（这个。isQuanX ）newOpts = _opts [ “开网址” ] || _opts[ “媒体网址” ] ? _opts：{ } ；否则 如果（此。isSurge ）{让 的OpenURL = _opts [ “开放-URL” ] || _opts 。打开网址；newOpts = openUrl ? { url : openUrl } : { } }返回 newOpts } ) ( opts ) ，1 ==参数。长度&& （标题=此。SCRIPTNAME ，字幕= “” ，体=参数[ 0 ] ），此。logNotify ( `title: ${ title } \nsubTitle: ${ subTitle } \nbody: ${ body } \noptions: ${ "object" == typeof  opts ? JSON . stringify ( opts ) :选择} `)，这个。isSurge)$notification。交（标题，副标题，身体，OPTS）; 否则 ，如果（这个。isLoon）OPTS？$通知。帖子（标题，副标题，身体，OPTS）：$通知。帖子（标题，副标题，body);else if(this.isQuanX)$notify(title,subTitle,body,opts);else if(this.isNode){if(this._barkUrl){let content=encodeURI(`${title}/${subTitle}\n${body}`) ; 这个。得到（` $ {此。_barkUrl } / $ {内容} ` ，（）=> { } ）} }否则 如果（这个。isJSBox ）{让 推= {标题：标题，身体：字幕？` ${ subTitle } \n ${ body } `：身体} ; $推。时间表（推）} } notifyDebug （标题=此。SCRIPTNAME ，字幕= “” ，身体= “” ，OPTS = “” ）{ “调试” ===此。LOGLEVEL && （1个==参数。长度&& （标题=此。SCRIPTNAME ，字幕= "" , body = arguments [ 0 ] ) , this . 通知（标题，副标题，身体，OPTS ））}日志（MSG ，级别= “INFO” ）{此。logLevels [这个. _logLevel ] <这个。日志级别[级别. toUpperCase ( ) ] ||控制台。log ( `[ ${ level } ] [ ${ this . scriptName } ]\n ${ msg } \n` ) } logDebug ( msg ) { this . 日志（味精，“调试” ）}日志信息（味精）{这个。日志（味精，“信息” ）}日志通知（味精）{this.log(msg,"NOTIFY")}logWarning(msg){this.log(msg,"WARNING")}logError(msg){this.log(msg,"ERROR")}logRetry(msg){this.log(msg,"RETRY")}adapterHttpOptions(options , method ) { let  _options = "object" == typeof  options ? 对象。分配（{ } ，选项）：{网址：选项，标题：{ } } ；_options 。hasOwnProperty ( "header" ) && ! _options 。hasOwnProperty ( "headers" ) && ( _options. 标头= _options 。标题，删除 _options 。头）；const  headersMap = { accept : "Accept" , "accept-ch" : "Accept-CH" , "accept-charset" : "Accept-Charset" , "accept-features" : "Accept-Features" , "accept-encoding " : "接受编码" , "接受语言" : "接受语言" , ", "access-control-allow-credentials" : "Access-Control-Allow-Credentials" , "access-control-allow-origin" : "Access-Control-Allow-Origin" , "access-control-allow-methods" : "Access-Control-Allow-Methods" , "access-control-allow-headers" : "Access-Control-Allow-Headers" , "access-control-max-age" : "Access-Control-Max-Age" , "access-control-expose-headers" : "Access-Control-Expose-Headers" , "access-control-request-method" : "访问控制请求方法” ，“访问控制请求头”：“访问控制请求头” ，年龄：“年龄” ，允许：“允许” ，替代：“替代” ，授权：“授权” ，“缓存控制”：“缓存控制” ，连接：“连接” ，“内容编码”：“内容编码” ，“内容语言”：“内容语言” ，“内容长度”：“内容长度”，“内容位置”："Content-Location" , "content-md5" : "Content-MD5" , "content-range" : "Content-Range" , "content-security-policy" : "Content-Security-Policy" , "content-type" ”：“内容类型” ，cookie：“Cookie” ，dnt：“DNT” ，日期：“日期” ，etag：“ETag” ，期望：“预期” ，过期：“Expires" , from : "From" ,主机: "主机" , "if-match" : "If-Match" , "if-modified-since" : "If-Modified-Since" , "if-none-match" : "If-None-Match" , "if-range" : "If-Range" , "if-unmodified-since" : "If-Unmodified-Since" , "last-event-id" : "Last-Event-ID" , "last-modified" : “上次修改” ，链接：“链接” ，位置：“位置” ，“最大转发”：“最大转发”，协商：“协商” ，来源：“来源” ，编译指示：“Pragma” ，“代理认证”：“代理认证” ，“代理授权”：“代理授权” ，范围：“范围” ，引用: "Referer" , "retry-after" : "Retry-After" , "sec-websocket-extensions" : "Sec-Websocket-Extensions" , "sec-websocket-key": "Sec-Websocket-Key" ,“sec-websocket-origin”：“Sec-Websocket-Origin” ，“sec-websocket-protocol”：“Sec-Websocket-Protocol” ，“sec-websocket-version”：“Sec-Websocket-Version” ，服务器："服务器" , "set-cookie" : "Set-Cookie" , "set-cookie2" : "Set-Cookie2" , "strict-transport-security" : "Strict-Transport-Security" , tcn : "TCN" , te : "TE" ,预告片：“预告片” ，“传输编码”: "Transfer-Encoding" , upgrade : "Upgrade" , "user-agent" : "User-Agent" , "variant-vary" : "Variant-Vary" ,变化: "Vary" , via : "Via" ,警告：“警告” ，“www-authenticate”：“WWW-Authenticate” ，“x-content-duration”：“X-Content-Duration” ，“x-content-security-policy”：“X-Content-Security-Policy" , "x-dn​​sprefetch-control" :"X-DNSPrefetch-Control" , "x-frame-options" : "X-Frame-Options" , "x-requested-with" : "X-Requested-With" , "x-surge-skip-scripting" : "X-Surge-Skip-Scripting" } ; if ( "object" == typeof  _options . headers ) for ( let  key  in  _options . headers ) headersMap [ key ] && ( _options .key]]=_options.headers[key],delete _options.headers[key]);_options.headers&&"object"==typeof _options.headers&&_options.headers["User-Agent"]||(_options.headers&&"object"==typeof _options.headers||(_options 。headers = { } ) ，这个。是节点？_options 。标头[ "User-Agent" ] = this 。pcUserAgent : _options 。标头[ "User-Agent" ] = this 。iOS用户代理) ; 让 skipScripting = ! 1 ; if ( ( "object" == typeof  _options . opts &&（！0 === _options 。OPTS 。提示|| ！0 === _options 。OPTS [ “跳过-脚本” ] ）|| “对象” == typeof  _options 。标题&& ! 0 === _options 。headers [ "X-Surge-Skip-Scripting" ] ) && ( skipScripting = ! 0 ) , skipScripting || （这个。是浪涌？_options 。标头[ "X-Surge-Skip-Scripting" ] = ! 1：这个。是龙吗？_options 。headers [ "X-Requested-With" ] = "XMLHttpRequest" : this 。isQuanX && ( "object" != typeof  _options . opts && ( _options . opts = { } ) , _options . opts .hints=!1)),this.isSurge&&!skipScripting||delete _options.headers["X-Surge-Skip-Scripting"],!this.isQuanX&&_options.hasOwnProperty("opts")&&delete _options.opts,this.isQuanX&&_options.hasOwnProperty("opts")&&删除 _options 。opts [ "Skip-Scripting" ] , "GET" ===方法&& ! 这个。isNode && _options 。身体) {让 qs =对象。键（_options 。体）。map ( key => void  0 === _options . body ? "" : ` ${ encodeURIComponent ( key)}=${encodeURIComponent(_options.body[key])}`).join("&");_options.url.indexOf("?")<0&&(_options.url+="?"),_options.url.lastIndexOf("&")+1!=_options.网址。长度&& _options 。网址。lastIndexOf ( "?" ) + 1 != _options 。网址。长度&& ( _options . url += "&" ) , _options . url += qs ，删除 _options 。body }返回 这个。是全X吗？( _options . hasOwnProperty ( "body" )&& "string" != typeof  _options 。体&& （_options 。体= JSON 。字符串化（_options 。体）），_options 。方法=方法）：这个。是节点？(删除 _options . headers [ "Accept-Encoding" ] , "object" == typeof  _options . body && (“GET” ===方法？（_options 。QS = _options 。体，删除 _options 。体）：“POST” ===方法&& （_options 。JSON = ！0 ，_options 。身体= _options 。体）））：此。isJSBox && ( _options . header = _options .标题，删除 _options 。headers ) , _options } adapterHttpResponse ( resp ) { let  _resp = { body : resp . 正文，标题：分别。头，JSON：（）=> JSON 。解析（_resp 。体）} ; 返回 RESP 。hasOwnProperty ( "statusCode") &&分别。的StatusCode && （_resp 。状态= RESP 。的StatusCode ），_resp } GET （选项，回调）{让 _options =此。adapterHttpOptions ( options , "GET" ) ; 这个。logDebug ( `HTTP GET: ${ JSON . stringify ( _options ) } ` )，这个。isSurge || 这个。是龙吗？$httpClient 。获取（_options ，回调）：这个。是全X吗？$任务。获取（_options ）。然后( resp => { resp . status = resp . statusCode ,回调( null , resp , resp . body ) }，原因=>回调（原因。错误，空，空））：这个。是节点？这个。节点。请求。得到（_options ，（ERR ，RESP ，数据）=> { RESP =此。adapterHttpResponse （RESP ），回调（ERR ，RESP ，数据) } )：这个。isJSBox && （_options 。处理机= RESP => {让 ERR = RESP 。错误？JSON 。字符串化（RESP 。错误）：无效 0 ，数据= “对象” == typeof运算 RESP 。数据？JSON 。字符串化（RESP 。数据）：resp.data;callback(err,resp.response,data)},$http.get(_options))}getPromise(options){return new Promise((resolve,reject)=>{magicJS.get(options,(err,resp)=>{err? 拒绝（错误）：解决（响应）} ）} ）}帖子（选项，回调）{让 _options = this 。adapterHttpOptions ( options , "POST" ) ; 如果（这个。logDebug （`HTTP POST：$ { JSON 。字符串化（_options ）} ` ），这.isSurge||this.isLoon)$httpClient.post(_options,callback);else if(this.isQuanX)$task.fetch(_options).then(resp=>{resp.status=resp.statusCode,callback(null,resp,resp.body)},reason=>{callback(reason.error,null,null)});else if(this.isNode){let resp=this.node.request.post(_options,callback);resp.status=resp.statusCode,delete resp.statusCode }否则 这个。isJSBox && （_options 。处理机= RESP => {让 ERR = RESP 。错误？JSON 。字符串化（RESP 。错误）：无效 0 ，数据= “对象” == typeof运算 RESP 。数据？JSON 。字符串化（RESP 。数据） :回复. 数据；回调（ERR ，RESP 。响应，数据）} ，$ HTTP 。发布（_options ））}获取 http （）{返回{获取：这个。getPromise ，发布：这个。发布} }完成（值= { } ）{ “未定义” ！= typeof $done && $done ( value ) } isToday ( day ) { if ( null == day ) return ！1 ; {让 今天=新 日期; return "string" == typeof  day && ( day = new  Date ( day ) ) , today 。getFullYear ( ) ==天。获得满年( ) &&今天。getMonth ( ) ==天。getMonth ( ) &&今天。getDay ( ) ==天。getDay ( ) } } isNumber ( val ) { return "NaN" !== parseFloat ( val ) 。toString ( ) }尝试（承诺，defaultValue = null ）{回报 承诺。然后( args => [ null , args ] ) 。捕捉（EX => （此。LOGERROR （EX ），[ EX ，默认值] ））}重试（FN ，重试= 5 ，间隔= 0 ，回调=空）{返回（ ...args ) => new  Promise ( ( resolve , reject ) => { function  _retry ( ... args ) { Promise . resolve ( ) . then ( ( ) => fn . apply ( this , args ) ) . then ( result = > { "function" == typeof  callback ? Promise .解决( ) 。然后( ( ) =>回调（结果））。然后( ( ) => { resolve ( result ) } ) 。catch ( ex => { retries >= 1 ? interval > 0 ? setTimeout ( ( ) => _retry . apply ( this , args ) ,间隔）：_retry 。apply ( this , args ) : reject ( ex ) , retries - } ) : resolve ( result ) } ) 。捕捉（EX => {此。logRetry （EX ），重试> = 1 &&间隔> 0？的setTimeout （（）=>_重试。apply ( this , args ) , interval ) :重试>= 1 ? _重试。apply ( this , args ) :拒绝( ex ) ,重试- } ) } _retry 。apply ( this , args ) } ) } formatTime ( time , fmt = "yyyy-MM-dd hh:mm:ss") { var  o = { "M+" :时间。getMonth ( ) + 1 , "d+" :时间。getDate ( ) , "h+" :时间。getHours ( ) , "m+" :时间。getMinutes ( ) , "s+" :时间。getSeconds ( ) , "q+" :数学。楼( (时间。getMonth ( ) + 3 ) / 3 ) ，S：时间。getMilliseconds ( ) } ; / ( y + ) /。试验（FMT ）&& （FMT = FMT 。代替（正则表达式。$ 1 ，（时间。和getFullYear （）+ “” ）。 SUBSTR （4 -正则表达式。1 美元。长度) ) ) ; for ( let  k  in  o ) new  RegExp ( "(" + k + ")" ) 。test ( fmt ) && ( fmt = fmt . replace ( RegExp . $1 , 1 == RegExp . $1 . length ? o [ k ] :（“00” + o [ k ] ）。substr （（“” + o [ k ] ）。长度）））；返回 fmt }现在( ) {返回 这个。formatTime ( new  Date , "yyyy-MM-dd hh:mm:ss" ) } today ( ) { return  this . 格式时间（新 日期, "yyyy-MM-dd" ) } sleep ( time ) { return  new  Promise ( resolve => setTimeout ( resolve , time ) ) } } ( scriptName ) }
// 更漂亮的忽略
function  Env ( t , e ) { "undefined" != typeof  process && JSON 。字符串化（过程。ENV ）。indexOf ( "GITHUB" ) > - 1 &&进程。退出（0 ）；类 s {构造函数( t ) {这个. env = t }发送( t, e = "GET" ) { t = "string" == typeof  t ? {网址：t }：t ；让 s = this 。得到; return "POST" === e && ( s = this . post ) , new  Promise ( ( e , i ) => { s . call ( this ,t , ( t , s , r ) => { t ? i ( t ) : e ( s ) } ) } ) } get ( t ) {返回 这个。发送. 调用（此。ENV ，牛逼）}后（牛逼）{返回 此。发送. 打电话（这个。env , t , "POST" ) } }返回 新 类{构造函数( t , e ) { this . 名称= t ，这个。http = new  s ( this ) , this . 数据=空，这个。dataFile = "box.dat" , this . 日志= [ ],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return 这个。使用setData （JSON 。字符串化（牛逼），ē ）}赶上{回报！1 } } getScript加入（吨）{返回 新 无极（é => {此。得到（{ URL：吨} ，（吨，s ^ ，我）=> È （我））}）}的runScript （吨，ê ）{返回 新 无极（小号=> {让 我=此。的GetData （“@ chavy_boxjs_userCfgs.httpapi” ）;我=我？我。代替（/ \ n /克，“” ）。修剪（）：我;让- [R =此。的GetData （ "@chavy_boxjs_userCfgs.httpapi_timeout" ) ; r = r ? 1 * r : 20 , r = e && e 。超时？电子。超时：r ；const [ o , h ] = i 。split ( "@" ) , n = { url : `http:// ${ h } /v1/scripting/evaluate` , body :{ script_text : t , mock_type : "cron" , timeout : r } , headers : { "X-Key" : o , Accept : "*/*" } } ; 这个。发布( n , ( t , e , i ) => s ( i ) ) } ) 。捕捉（吨=>此。LOGERR（牛逼））} loaddata （）{如果（！此。isNode （））返回{ } ; {这个。fs =这个。fs ? 这个。fs：需要（“fs” ），这个。路径=这个。路径？这个。路径：需要（“路径” ）; 常量 t =这个。路径。解决（此。数据文件），ê =此。路径。解决（过程。CWD （），此。数据文件），š =此。FS 。存在同步( t ) , i = ! s &&这个。FS 。存在同步( e ) ; 如果( ! s && ! i )返回{ } ; {常量 i = s ? t : e ; 尝试{返回 JSON 。解析（此。FS 。readFileSync （我））}捕获（吨）{返回{ } } } } }写数据（）{如果（此。isNode （））{此。fs =这个。fs ? 这个。fs：需要（“fs” ），这个。路径=这个。路径？这个。路径：需要（“路径” ）；常量 t =这个。路径。解决（这个. 数据文件），e =这个。路径。解决（过程。CWD （），此。数据文件），š =此。FS 。存在同步( t ) , i = ! s &&这个。FS 。存在同步（e ），r = JSON 。字符串化（这个. 数据) ; 小号？这个。FS 。writeFileSync ( t , r ) : i ? 这个。FS 。writeFileSync ( e , r )：这个。FS 。writeFileSync ( t , r ) } } lodash_get ( t , e , s ) { const  i = e .替换( / \[ ( \d + ) \] / g , ".$1" ) 。拆分（“。” ）；让 r = t ; for ( const  t  of  i ) if ( r = Object ( r ) [ t ] , void  0 === r ) return  s ; 返回 r } lodash_set (t , e , s ) {返回 对象( t ) !== t ? 吨：（阵列。IsArray的（ê ）|| （É = Ë 。的toString （）。匹配（/ [ ^ [ \] ] + /克）|| [ ] ），ê 。切片（0 ，- 1) 。减少（（吨，s ^ ，我）=>对象（吨[小号] ）===吨[小号]？吨[小号]：吨[小号] =数学。ABS （Ë [我+ 1 ] ）>> 0 == + e [ i + 1 ] ? [ ]：{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@ ( . * ? ) \. ( . * ? ) $ / . exec ( t ) , r = s ? 这个。getval ( s ) : "" ; if ( r ) try { const  t = JSON . 解析（r ）；e = t ? 这个。lodash_get ( t, i , "" ) : e } catch ( t ) { e = "" } } return  e } setdata ( t , e ) { let  s = ! 1 ; 如果（/ ^ @ /。试验（ê ））{常量[ ，我，- [R ] = / ^ @ （. * ? ) \。( . * ? ) $ / . exec ( e ) , o = this 。getval ( i ) , h = i ? “空” === o ? 空：o || “{}”：“{}” ；尝试{ const  e = JSON 。解析（h ）；这个。lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify( o ) , i ) } } else  s = this 。设置值（t ，e ）；return  s } getval ( t ) {返回 这个。isSurge ( ) || 这个。是龙( )吗？$persistentStore 。读（t ）：这个。是全X ( )吗？$prefs 。valueForKey ( t )：这个。节点( ) ? （此。数据=此。loaddata （），此。数据[吨] ）：此。数据&&这个。数据[ t ] || null } setval ( t , e ) {返回 这个。是浪涌( )|| 这个。是龙( )吗？$persistentStore 。写（t ，e ）：这个。是全X ( )吗？$prefs 。setValueForKey ( t , e )：这个。节点( ) ? （此。数据=此。loaddata （），此。数据[ ë ] =吨，这个。写入数据( ) , ! 0 ）：这个。数据&&这个。数据[ e ] || null } initGotEnv ( t ) {这个。得到了=这个。得到了吗？这个。得到：需要（“得到” ），这个。cktough =这个。坚韧不拔？这个。cktough：需要（“tough-cookie” ），这个。ckjar =这个。克贾尔？这个。ckjar：新 这个。克艰难。CookieJar , t && ( t . headers = t . headers ? t . headers : { } , void  0 === t . headers . Cookie&&无效 0 === t 。cookieJar && （吨。cookieJar =此。ckjar ））} GET （吨，ê = （（）=> { } ））{吨。headers && (删除 t . headers [ "Content-Type" ] ，删除 t . headers [ "Content-Length" ] )，这个。isSurge ( ) || 这个。是龙( )吗？（此。isSurge （）&&此。isNeedRewrite && （吨。标题=吨。标题|| { } ，对象。分配（吨。头，{ “X-浪涌跳过-脚本”：！1 } ）），$httpClient 。得到（牛逼，（牛逼，小号，我）=> { ！牛逼&&小号&& （小号。身体=我，Ş 。的StatusCode =小号。状态），ê （牛逼，s ^ ，我）} ））：此。是全X ( )吗？（这个。isNeedRewrite && （牛逼。OPTS =牛逼。OPTS || { } ，对象，分配（牛逼。OPTS ，{提示：！1 } ）），$任务。取( t ) 。然后( t => { const { statusCode : s , statusCode : i , headers :r ,正文: o } = t ; e ( null , { status : s , statusCode : i , headers : r , body : o } , o ) } , t => e ( t ) ) ) : this . isNode ( ) && ( this . initGotEnv ( t ),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s &&这个。克贾尔。setCookieSync ( s , null ) , e . cookieJar =这个。ckjar } } catch ( t ) {这个。logErr ( t ) } } ) 。然后( t => { const { statusCode : s , statusCode : i , headers :r ,正文: o } = t ; e ( null , { status : s , statusCode : i , headers : r , body : o } , o ) } , t => { const { message : s , response : i } = t ; e ( s , i , i&&我。body ) } ) ) } post ( t , e = ( ( ) => { } ) ) { if ( t . body && t . headers && ! t . headers [ "Content-Type" ] && ( t . headers [ " Content-Type" ] = "application/x-www-form-urlencoded" ) , t. 标题&&删除 t 。headers [ "Content-Length" ] ，this 。isSurge ( ) || 这个。isLoon ( ) )这个。isSurge ( ) && this 。isNeedRewrite && （吨。标题=吨。标题|| { } ，对象。分配（吨。头，{ “X-浪涌跳过-脚本”：！1 } ) ) ，$httpClient 。交（吨，（吨，s ^ ，我）=> { ！吨&&小号&& （小号。身体=我，š 。的StatusCode =小号。状态），È （吨，s ^ ，我）} ）; 别的 如果（此。isQuanX （））吨。方法= "POST" , this 。isNeedRewrite && （牛逼。OPTS =牛逼。OPTS || { } ，对象，分配（牛逼。OPTS ，{提示：！1 } ）），$任务。取( t ) 。那么（t => { const { statusCode : s , statusCode : i , headers : r , body : o } = t ; e ( null , { status : s , statusCode : i , headers : r , body : o } , o ) } , t => e ( t ) ); 否则 ，如果（这个。isNode （））{这个。initGotEnv ( t ) ; const { url : s , ... i } = t ; 这个。得到了。发布( s , i ) 。然后( t => { const { statusCode : s , statusCode : i ,标题：r ，正文：o } = t ; e ( null , { status : s , statusCode : i , headers : r , body : o } , o ) } , t => { const { message : s , response : i } = t ; Ë （小号，我，我&&我。body ) } ) } }时间( t , e = null ) { const  s = e ? 新 日期（e ）：新 日期；让 我= { "M+" : s 。getMonth ( ) + 1 , "d+" : s 。getDate ( ) , "H+"：秒。getHours ( ) , "m+" : s 。getMinutes ( ) , "s+" : s 。getSeconds ( ) , "q+" :数学。地板（（小号。得到月（）+ 3 ）/ 3 ），小号：小号。getMilliseconds ( ) } ; / ( y + ) /. 测试（吨）&& （吨=吨。代替（正则表达式。$ 1 ，（小号。和getFullYear （）+ “” ）。 SUBSTR （4 -正则表达式。$ 1 。长度）））; for ( let e in i ) new RegExp ( "(" + e + ")" ) 。    测试（吨）&& （吨=吨。代替（正则表达式。$ 1 ，1 ==正则表达式。$ 1 。长度？我[ ë ]：（“00” +我[ ë ] ）。SUBSTR （（“” +我[ ë ] ) .长度) ) ) ; 返回 t }msg ( e = t , s = "" , i = "" , r ) { const  o = t => { if ( ! t ) return  t ; if ( "string" == typeof  t )返回 this 。是龙( )吗？t：这个。是全X ( )吗？{ “打开网址”：t}：这个。是浪涌( ) ? {网址：t }：无效 0 ；if ( "object" == typeof  t ) { if ( this . isLoon ( ) ) { let  e = t 。打开网址|| 吨。网址|| t [ "open-url" ] , s = t 。媒体网址||t [ “媒体网址” ] ; 返回{的OpenURL：ê ，mediaUrl：小号} }如果（此。isQuanX （））{让 Ë =吨[ “开放-URL” ] || 吨。网址|| 吨。openUrl , s = t [ "media-url" ] || 吨。媒体网址；返回{"open-url" : e , "media-url" : s } } if ( this . isSurge ( ) ) { let  e = t . 网址|| 吨。打开网址|| t [ “打开网址” ] ; 返回{ url : e } } } } ; 如果（这个。isMute || （此。isSurge （）|| 这个。是龙( )吗？$通知。后（e ，s ，i ，o （r ））：这个。isQuanX （）&& $通知（ē ，s ^ ，我，Ô （[R ））），！ 这个。isMuteLog ) {让t = [ "" , "==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log( ... t ) { t . 长度> 0 && （此。日志= [ ...此。原木， ...吨] ），控制台。日志（牛逼。加入（此。logSeparator ））} LOGERR （牛逼，ē ）{常量 小号= ！这个。isSurge () & & ! 这个。isQuanX ( ) && ! 这个。isLoon ( ) ; 小号？这个。日志（“” ，`❗️ $ {这个。名字}！，错误' ，牛逼。栈）：此。日志（“” ，`❗️ $ {这个。名字}，错误！` ，牛逼）}等待（t ) { return  new  Promise ( e => setTimeout ( e , t ) ) } done ( t = { } ) { const  e = ( new  Date ) . 的getTime （），š = （ë -此。STARTTIME ）/ 1E3 ; 这个。日志（“” ，`🔔${这个。名称} , 结束! 🕛 ${ s }秒`),这个. 日志（），（此。isSurge（）||此。isQuanX（）||此。isLoon（））&&$完成（牛逼）}}（牛逼，ē）}
