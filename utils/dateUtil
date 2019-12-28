'use strict';

/**
 * 时间格式化
 *
 * @param {number} time 需要格式化的值
 * */
export function timeFormat(time: number) {
    return time > 9 ? `${time}` : `0${time}`;
}

/**
 * 时间比对 -- 查看时间在不在开始时间和结束时间的区间
 *
 * @param {number} startHour 开始时间 - 小时
 * @param {number} startMinute 开始时间 - 分钟
 * @param {number} endHour 结束时间 - 小时
 * @param {number} endMinute 结束时间 - 分钟
 * @param {number} contrastHour 需要比较 - 小时
 * @param {number} contrastMinute 需要比较 - 分钟
 * */
export function compareDate(startHour: number,
                            startMinute: number,
                            endHour: number,
                            endMinute: number,
                            contrastHour: number,
                            contrastMinute: number): boolean {
    let date = new Date();
    let startTime = date.setHours(startHour, startMinute);
    let endTime = date.setHours(endHour, endMinute);
    let contrastTime = date.setHours(contrastHour, contrastMinute);

    if (startTime > endTime) {
        if (startTime <= contrastTime) {
            let onDayLastTime = date.setHours(23, 59, 59, 999);
            return startTime <= contrastTime && contrastTime <= onDayLastTime;
        } else {
            return startTime >= contrastTime && contrastTime <= endTime;
        }
    }

    return startTime <= contrastTime && contrastTime <= endTime;
}

/**
 * 获取当前小时 和 分钟
 * */
export function getCurrentTime(): Object {
    const date = new Date();
    let hours = date.getHours();
    if (hours >= 24) {
        hours = 0;
    }
    return {hour: hours, minute: date.getMinutes()};
}
