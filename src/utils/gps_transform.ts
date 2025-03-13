const PI = 3.1415926535897932384626;
const a = 6378245.0;  // 长半轴
const ee = 0.00669342162296594323; // 扁率

function transformlat(lng:number, lat:number) {
    let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret;
}

function transformlng(lng:number, lat:number) {
    let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret;
}

function wgs84togcj02(lng:number, lat:number) {
    if (out_of_china(lng, lat)) {
        return [lng, lat];
    } else {
        let dlat = transformlat(lng - 105.0, lat - 35.0);
        let dlng = transformlng(lng - 105.0, lat - 35.0);
        let radlat = lat / 180.0 * PI;
        let magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        let sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        let mglat = lat + dlat;
        let mglng = lng + dlng;
        return [mglng, mglat];
    }
}

function out_of_china(lng:number, lat:number) {
    // 判断是否在中国范围外
    return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271;
}

// 示例
let wgs84_coords = [116.397428, 39.90923]; // GPS坐标
let gcj02_coords = wgs84togcj02(wgs84_coords[0], wgs84_coords[1]);
console.log(`高德地图坐标为: 经度 ${gcj02_coords[0]}, 纬度 ${gcj02_coords[1]}`);