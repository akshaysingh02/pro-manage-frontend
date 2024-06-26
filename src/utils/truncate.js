export const truncateData = (str, maxLength = 30) =>{
    if(str.length <= maxLength){
        return str
    }
    return str.slice(0,maxLength) + "...."
}