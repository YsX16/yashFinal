const { json } = require("express");

class ApiFeatures {
    constructor(query,queryStr){
        this.query = query
        this.queryStr = queryStr 
    }

    search() {
        if (this.queryStr.keyword) {
            const keywords = this.queryStr.keyword.split(" ").map(keyword => ({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } }
                ]
            }));
            
            this.query = this.query.find({ $and: keywords });
        }
    
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr}
        
    
        // removing some fields for categety
    
        const removeFields = ["keyword","page", "limit"]
    
        removeFields.forEach(key=>delete queryCopy[key])

        // Filter for Price and rating
        // console.log(queryCopy)

        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)

        this.query = this.query.find(JSON.parse(queryStr))
        
        // console.log(queryStr)
        
        return this;
    }

    pagination(resultPerPage){
        const currnetPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currnetPage - 1)

        this.query = this.query.limit(resultPerPage).skip(skip)

        return this;
    }
    
}


module.exports = ApiFeatures