function compareTime(timeString1, timeString2){
    let dateTime1 = new Date(timeString1); //we make js object
    let dateTime2 = new Date(timeString2);
    return dateTime1.getTime() > dateTime2.getTime();
}
module.exports = {
    compareTime
}