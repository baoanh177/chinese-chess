export const getSoldierRoad = (active, chesses, BOARD_SIZE_X, BOARD_SIZE_Y, BELOW_BOUNDARY, ABOVE_BOUNDARY) => {
    const { positionX, positionY, faction } = active
    const roads = { canMove: [], canAttack: []}
    const canMove = []

    if (active.side == "below") {
        if (positionY > 0) {
            canMove.push({ x: positionX, y: positionY - 1 })
        }
        if (positionY < BELOW_BOUNDARY) {
            if (positionX - 1 >= 0) {
                canMove.push({ x: positionX - 1, y: positionY })
            }
            if (positionX + 1 <= BOARD_SIZE_X) {
                canMove.push({ x: positionX + 1, y: positionY })
            }
        }
    } else if (active.side == "above") {
        if (positionY < BOARD_SIZE_Y) {
            canMove.push({ x: positionX, y: positionY + 1 })
        }
        if (positionY > ABOVE_BOUNDARY) {
            if (positionX - 1 >= 0) {
                canMove.push({ x: positionX - 1, y: positionY })
            }
            if (positionX + 1 <= BOARD_SIZE_X) {
                canMove.push({ x: positionX + 1, y: positionY })
            }
        }
    }

    for (const axis of canMove) {
        let isEnemy = false
        let isAlly = false
        chesses.forEach((chess) => {
            if (chess.isAlive) {
                if (
                    axis.x == chess.positionX &&
                    axis.y == chess.positionY
                ) {
                    if (chess.faction != faction) {
                        isEnemy = true
                    } else {
                        isAlly = true
                    }
                }
            }
        })
        if (!isEnemy && !isAlly) {
            roads.canMove.push(axis)
        }
        if (isEnemy) {
            roads.canAttack.push(axis)
        }
    }

    return roads
}
