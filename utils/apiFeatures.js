class APIFeatures{
    constructor(query,queryStr){
        this.query =query
        this.queryStr = queryStr
    }

    filter(){
        const queryObj = Object.assign({},this.queryStr)

        const excludeFields = ['page', 'sort' , 'limit', 'fields']

        excludeFields.forEach((el) => delete queryObj[el])

        let queryStr = JSON.stringify(queryObj)

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(match) => `$${match}`)

        this.query = this.query.find(JSON.parse(queryStr))

        return this
    }

    sort(){
        if(this.queryStr.sort){
            
            const sortBy = this.queryStr.sort.split(',').join(' ')

            this.query = this.query.sort(sortBy)
        }

        return this
    }

    
}