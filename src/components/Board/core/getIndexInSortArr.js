export function getIndexInSortArr(onTheRoad, { positionX, positionY}) {
    const indexInSortArr = {}
    onTheRoad.xRoad.forEach((chess, index) => {
        if(chess.positionX == positionX && chess.positionY == positionY) {
            indexInSortArr.y = index
        }
    })
    onTheRoad.yRoad.forEach((chess, index) => {
        if(chess.positionY == positionY && chess.positionX == positionX) {
            indexInSortArr.x = index
        }
    })

    return indexInSortArr
}
