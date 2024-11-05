export function formatTime(Time){
    const hours=Math.floor(Time/3600)
    const minutes=Math.floor((Time%3600)/60)
    const seconds=Math.floor(Time%60)
    return {
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0")
    }

}

export function calculateTime(hours,minutes,seconds){
    const cTime = (parseInt(hours)*3600) + parseInt(seconds) + (parseInt(minutes)*60)
    return cTime
}