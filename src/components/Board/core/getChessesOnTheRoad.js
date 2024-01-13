import arraySort from "array-sort"

export function getChessesOnTheRoad(chesses, {positionX, positionY}) {
    const onTheRoad = {xRoad: [], yRoad: []}
    // Tìm những quân cờ nằm trên đường đi
    chesses.forEach(chess => {
        if(chess.isAlive) {
            if(chess.positionX == positionX) {
                onTheRoad.xRoad.push(chess)
            }
            if(chess.positionY == positionY) {
                onTheRoad.yRoad.push(chess)
            }
        }
    })

    // Sắp xếp lại theo thứ tự tăng dần
    arraySort(onTheRoad.xRoad, 'positionY');
    arraySort(onTheRoad.yRoad, 'positionX');
    return onTheRoad
}
