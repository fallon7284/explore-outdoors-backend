const NodeCache = require( "node-cache" );
const myCache = new NodeCache({stdTTL: 60 * 60 * 24});

function getUrlFromRequest(req) {
    const url = req.protocol + '://' + req.headers.host + req.originalUrl
    return url
}

const get = (req, res, next) => {
    console.log('ran get function')
    const url = getUrlFromRequest(req)
    const data = myCache.get(url)
    if(data){
        console.log('got data from cache')
        res.status(200).send(data)
    }
    else {
        return next()
    }
}

const set = (req, res, next) => {
    console.log('ran set function')
    const url = getUrlFromRequest(req)
    myCache.set(url, req.body)
    console.log('set data on cache', myCache.data)
    return next()
}


module.exports = { get, set }