export const getElephantRoad = (active, chesses, BOARD_SIZE_X, BOARD_SIZE_Y, ABOVE_BOUNDARY, BELOW_BOUNDARY) => {
    const {positionX, positionY, faction, side } = active
    // Tìm tọa độ có thể di chuyển
    const moveAxis = {
        topRight: {
            x: positionX + 2,
            y: positionY - 2
        },
        topLeft: {
            x: positionX - 2,
            y: positionY - 2
        },
        botRight: {
            x: positionX + 2,
            y: positionY + 2
        },
        botLeft: {
            x: positionX - 2,
            y: positionY + 2
        }
    }

    // Loại bỏ các điểm di chuyển quá biên giới
    Object.keys(moveAxis).forEach((key) => {
        const { x, y } = moveAxis[key]
        if (x < 0 || x > BOARD_SIZE_X) {
            moveAxis[key] = null
        }

        if (side == "below") {
            if (y < BELOW_BOUNDARY || y > BOARD_SIZE_Y) {
                moveAxis[key] = null
            }
        } else if (side == "above") {
            if (y > ABOVE_BOUNDARY || y < 0) {
                moveAxis[key] = null
            }
        }
    })

    const canAttack = []
    const isAlly = []

    // Loại bỏ những điểm di chuyển bị cản và tìm kiếm điểm có thể tấn công
    chesses.forEach((chess) => {
        if (chess.isAlive) {
            if (chess.positionY == positionY - 1) {
                if (chess.positionX == positionX - 1) {
                    moveAxis.topLeft = null
                }
                if (chess.positionX == positionX + 1) {
                    moveAxis.topRight = null
                }
            }
            if (chess.positionY == positionY + 1) {
                if (chess.positionX == positionX - 1) {
                    moveAxis.botLeft = null
                }
                if (chess.positionX == positionX + 1) {
                    moveAxis.botRight = null
                }
            }
            // tìm kiếm điểm có thể tấn công
            Object.keys(moveAxis).forEach((key) => {
                if (moveAxis[key] != null) {
                    if (
                        moveAxis[key].x == chess.positionX &&
                        moveAxis[key].y == chess.positionY
                    ) {
                        if (chess.faction != faction) {
                            canAttack.push({
                                x: chess.positionX,
                                y: chess.positionY
                            })
                        } else {
                            isAlly.push(key)
                        }
                    }
                }
            })
        }
    })

    // Hợp nhất vào object roads
    const canMove = []

    isAlly.forEach((key) => {
        moveAxis[key] = null
    })
    Object.keys(moveAxis).forEach((key) => {
        if (moveAxis[key] != null) {
            canMove.push({ x: moveAxis[key].x, y: moveAxis[key].y })
        }
    })

    return {canMove, canAttack}
}
