import moment from 'moment';

export function getTimeAgoString(dateOfCreationPost) {
    let postDate = Date.parse(dateOfCreationPost);
    let dateNow = Date.now();
    let duration = moment.duration(dateNow - postDate);

    let resultString = "";

    let [years, months, days, hours, minutes, seconds] =
        [duration.years(), duration.months(), duration.days(), duration.hours(), duration.minutes(), duration.seconds()];

    if (years > 0)
        resultString = `${years} г.`;
    else if (months > 0)
        resultString = `${months} мес.`;
    else if (days > 0)
        resultString = `${days} д.`;
    else if (hours > 0)
        resultString = `${hours} ч.`;
    else if (minutes > 0)
        resultString = `${minutes} мин.`;
    else if (seconds > 0)
        resultString = `${seconds} сек.`;
    else
        return "Только что";

    return resultString + " назад";
}

export function getReleaseYear(date) {
    return date !== null ? (new Date(Date.parse(date))).getFullYear() : null;
}

export function getHumanRuntime(minutes) {
    if (minutes === null)
        return null;

    let resultString = "";

    if (minutes > 60)
        resultString += `${Math.floor(minutes / 60)} ч `;

    let onlyMinutes = minutes % 60;

    if (onlyMinutes > 0)
        resultString += `${onlyMinutes} мин`;

    return resultString;
}
