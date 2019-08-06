const checkExpired = require('./checkExpired');
var Crawler = require("crawler");
let result = [];
let resultOld = [];
let resultMain = [];

const run = async (url) => {
    var c = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error) {
                console.log(error);
            } else {
                var $ = res.$;
                const tagA = $("a");
                for(let i = 0; i < tagA.length; i++) {
                    if(tagA[i].attribs.href.indexOf('http') != -1 && tagA[i].attribs.href.indexOf('dantri.com.vn') == -1
                        && tagA[i].attribs.href.indexOf('.vn') == -1) {
                        //if(checkExpired(tagA[i].attribs.href)) {
                            resultMain.push(tagA[i].attribs.href)
                        //}
                    } else {
                        let href = tagA[i].attribs.href;
                        if(href.indexOf('http') == -1) {
                            href = 'https://dantri.com.vn' + href;
                        }

                        if(resultOld.indexOf(href) == -1 && href.indexOf('?') == -1 && href.indexOf('dantri.com.vn') != -1) {
                            result.push(href)
                        }
                    }
                }
                console.log(result)
            }
            done();
        }
    });

    await c.queue([url]);
}
resultOld.push('https://dantri.com.vn/')
resultOld.push('https://dantri.com.vn')
const fn = async () => {
    await run('https://dantri.com.vn/')
    for(var z = 0; z < 4; z ++) {

    }
}
fn();