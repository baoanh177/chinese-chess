export const getCannonRoad = (closestChess, { positionX, positionY }) => {
    const canMove = []
    const { prevChessX, nextChessX, prevChessY, nextChessY } =
        closestChess
    let xFrom = -1
    let xTo = 9
    let yFrom = -1
    let yTo = 10
    if (prevChessX) {
        xFrom = prevChessX.positionX
    }
    if (nextChessX) {
        xTo = nextChessX.positionX
    }
    if (prevChessY) {
        yFrom = prevChessY.positionY
    }
    if (nextChessY) {
        yTo = nextChessY.positionY
    }

    for (let i = xFrom + 1; i < xTo; i++) {
        if (i != positionX) {
            canMove.push({
                x: i,
                y: positionY
            })
        }
    }
    for (let i = yFrom + 1; i < yTo; i++) {
        if (i != positionY) {
            canMove.push({
                x: positionX,
                y: i
            })
        }
    }

    return canMove
}
