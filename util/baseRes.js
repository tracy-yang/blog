module.exports.setResult = function(code,message='success',data,page){
    return {
        content:{
            list:data,
            pagination:page
        },
        errorMsg:message,
        status:code
    }
}

module.exports.pagination = function(page,row,total,sortName,sortOrder){
    return {
        page,
        rows:row,
        total,
        sortName,
        sortOrder
    }

}