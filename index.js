const checkExpired = require('./checkExpired');
const fs = require('fs');
var Crawler = require("crawler");
let result = [];
let resultOld = [];
let resultMain = [];

const appendFile = (text) => {
    fs.appendFile('text.txt', text + '\n', function (err) {
        if (err) {
        } else {
        }
    })
}

const run = async (url) => {
    let i = j = 0;
    var c = new Crawler({
        maxConnections : 10,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            try {
                if(error) {
                    console.log(error);
                } else {
                    var $ = res.$;
                    const tagA = $("a");
                    const n = tagA.length;
                    for(let i = 0; i < n; i++) {
                        let hrefTagA = tagA[i].attribs.href;
                        if(hrefTagA && hrefTagA.indexOf('javascript') == -1 && (hrefTagA.indexOf('facebook') == -1 && hrefTagA.indexOf('bitly') == -1
                            && hrefTagA.indexOf('google') == -1
                            && hrefTagA.indexOf('dmca') == -1 && hrefTagA.indexOf('bit.ly') == -1)) {
                            if (hrefTagA && hrefTagA.indexOf('http') != -1 && hrefTagA.indexOf('24h.com.vn') == -1
                                && hrefTagA.indexOf('.vn') == -1
                                && hrefTagA.indexOf('javascript') == -1) {
                                //if(checkExpired(tagA[i].attribs.href)) {
                                resultMain.push(tagA[i].attribs.href)
                                appendFile(tagA[i].attribs.href)
                                //}
                            } else {
                                let href = tagA[i].attribs.href;
                                if (href && href.indexOf('http') == -1) {
                                    href = 'https://www.24h.com.vn' + href;
                                }

                                if (href && resultOld.indexOf(href) == -1 && href.indexOf('?') == -1 && href.indexOf('24h.com.vn') != -1) {
                                    result.push(href);
                                    resultOld.push(href);
                                }
                            }
                        }
                    }
                    console.log("done");
                }
                done();
                setTimeout(() => {
                    if(!result || result.length == 0) return;
                    const url = result.shift();
                    console.log("==============", url);
                    run(url)
                }, 300)
            } catch (e) {
                console.log(e)
            }

        }
    });

    await c.queue([url]);
}
resultOld.push('https://www.24h.com.vn')
resultOld.push('https://www.24h.com.vn/')
const fn = async () => {
    await run('https://www.24h.com.vn')
}
fn();