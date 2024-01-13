export function getClosestChesses(onTheRoad, indexInSortArr) {
    // Tìm các quân cờ gần nhất theo trục x, y
    const closestChesses = {}
    if(indexInSortArr.y != 0) {
        closestChesses.prevChessY = onTheRoad.xRoad[indexInSortArr.y - 1]
    }
    if(indexInSortArr.y != onTheRoad.xRoad.length - 1) {
        closestChesses.nextChessY = onTheRoad.xRoad[indexInSortArr.y + 1]
    }
    if(indexInSortArr.x != 0) {
        closestChesses.prevChessX = onTheRoad.yRoad[indexInSortArr.x - 1]
    }
    if(indexInSortArr.x != onTheRoad.yRoad.length - 1) {
        closestChesses.nextChessX = onTheRoad.yRoad[indexInSortArr.x + 1]
    }

    return closestChesses
}