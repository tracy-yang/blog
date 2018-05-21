module.exports.setResult = function(code,message='success',data,page){
    let content = {}
    if(Object.prototype.toString.call(data) === '[object Object]'){
        content = data;
    } else if(Object.prototype.toString.call(data) === '[object Array]'){
        content.list = data,
        content.pagination = page;
    }
    return {
        content,
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