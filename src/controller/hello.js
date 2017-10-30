
var noop = function(){}
var path = require('path');
const logger = require('@log4js-node/log4js-api').getLogger(path.relative(process.cwd(),module.id));
var coparser = require('co-body');

/**
 * 示例控制器， 支持async/await操作
 */
exports.hello = async function (ctx, next) {
    var body = {}
    try{
        body = await coparser.json(ctx)
    }catch(e){
        logger.error(e);
        return await next();
    }
    logger.debug("%s, body after: %s" , ctx.traceid, JSON.stringify(body))
    if(body.name == 'koa') ctx.body = 'KOA';
    else ctx.body = 'we are at home!';
}