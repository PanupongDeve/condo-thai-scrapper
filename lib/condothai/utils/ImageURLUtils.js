

class ImageURLUtils {
    detectRoomFigureURL(el=""){
        let result = el.split("(")[1];
        result = result.split(")")[0];
        return result;
    }
}

module.exports = {
    ImageURLUtils
}