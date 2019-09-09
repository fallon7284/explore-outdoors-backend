class Cache{
    constructor(){
        this.store = {}
        this.set = this.set.bind(this)
        this.get = this.get.bind(this)
    }
    set(req, val){
        const key = req.protocol + '://' + req.headers.host + req.originalUrl
        this.store[key] = val
    }

    get(req){
        const key = req.protocol + '://' + req.headers.host + req.originalUrl
        return this.store[key] || null
    }
}

const cache = new Cache()

module.exports = cache