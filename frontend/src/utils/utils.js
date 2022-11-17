
export const getColorFromMongoId = (mongoId) => {
    let color = Math.floor((Math.abs(Math.sin(parseInt(mongoId.valueOf(), 16)) * 16777215)));
    color = color.toString(16);
    // pad any colors shorter than 6 characters with leading 0s
    while(color.length < 6) {
        color = '0' + color;
    }
    return color;
}

export const mongoDateToString = (mongoDate) => {
    // 2022-11-17T14:36:30.561Z
    const [date, fulltime] = mongoDate.split(/T/);
    const time = fulltime.split(":");
    return `${date}, ${[time[0], time[1]].join(':') + 'UTC'}`
}