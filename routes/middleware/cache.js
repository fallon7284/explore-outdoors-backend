const NodeCache = require( "node-cache" );
const myCache = new NodeCache({stdTTL: 60 * 60 * 24});

function getUrlFromRequest(req) {
    const url = req.protocol + '://' + req.headers.host + req.originalUrl
    return url
}

const get = (req, res, next) => {
    const url = getUrlFromRequest(req)
    const data = myCache.get(url)
    return data
}

const set = (req, data) => {
    const url = getUrlFromRequest(req)
    myCache.set(url, data)

}


module.exports = { get, set }