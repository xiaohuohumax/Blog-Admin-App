// 通用辅助工具类

export default {
    pFunction: function (probably, callback) {// 概率调用函数 0-100% callback
        this.randomNumber(0, 100) < probably ? callback() : "";
    },
    randomNumber: function (start, end) {// 获取范围内随机整数
        return Math.floor(Math.random() * (end - start + 1)) + start;
    },
    randomColor: function (opacity = 0.5) {// 获取随机颜色
        return `rgba(${this.randomNumber(0, 255)},${this.randomNumber(0, 255)},${this.randomNumber(0, 255)},${opacity})`;
    },
    stringToCode: function (str) {// 字母转ASCII码(忽略大小写,键盘码)
        return (str.toUpperCase()).charCodeAt();
    },
    codeToString: function (num) {// ASCII码转字母
        return String.fromCharCode(num);
    },
    byDegGetXY(deg) {// 单位圆度数坐标
        return [Math.cos(deg * Math.PI / 180).toFixed(3), Math.sin(deg * Math.PI / 180).toFixed(3)];
    },
    // 获取时间戳
    getTimeStamp() {
        return Date.parse(new Date());
    },
    // 时间戳转时间
    getTimeByStamp(timeStamp) {
        if (timeStamp != null) {
            var date = new Date(timeStamp + 8 * 3600 * 1000);
            return date.toJSON().substring(0, 19).replace('T', ' ');
        }
        return '0000-00-00 00:00.00';
    },
    // RGB to Hex 
    colorRGBtoHEX(rgb) {
        return rgb.replace(/\s*[rR][gG][bB]\((\d+),(\d+),(\d+)\).*/ig, (str, $1, $2, $3) => {
            let r = parseInt($1);
            let g = parseInt($2);
            let b = parseInt($3);
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).substr(1).toUpperCase();
        })
    },
    // HSV to RGB
    colorHSVtoRGB(h, s, v) {
        var h_i = parseInt(h * 6);
        var f = h * 6 - h_i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);
        var r, g, b;
        switch (h_i) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
            default:
                r = 1;
                g = 1;
                b = 1;
        }
        return `RGB(${parseInt(r * 255)},${parseInt(g * 255)},${parseInt(b * 255)})`;
    },
    // HSV 列表
    colorHSVList({ start = 0, end = 240, S = 1, V = 1, sum = 10 }) {
        let res = [];
        let lMr = start < end; // 起始是否大于结束

        let setp = (Math.abs(start - end) / (sum - 1)) * (lMr ? 1 : -1); // 步进值

        for (let x = 0; x < sum; x++) {
            let rgb = this.colorHSVtoRGB((start + setp * x) / 360, S, V);
            res.push(rgb);
        }
        return res;
    }
}