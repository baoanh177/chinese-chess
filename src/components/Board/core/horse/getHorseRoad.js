export function getHorseRoad(active, chesses, BOARD_SIZE_X, BOARD_SIZE_Y) {
    const {positionX, positionY, faction} = active
    let canMoveAndAttack = []

    // Tìm phạm vi có thể di chuyển
    const scope = {
        top: positionY - 2 >= 0 ? positionY - 2 : null,
        bot: positionY + 2 <= BOARD_SIZE_Y ? positionY + 2 : null,
        left: positionX - 2 >= 0 ? positionX - 2 : null,
        right: positionX + 2 <= BOARD_SIZE_X ? positionX + 2 : null
    }

    // Tìm vị trí có thể di chuyển
    const moveAxis = {
        yLeft: positionX - 1 >= 0 ? positionX - 1 : null,
        yRight: positionX + 1 <= BOARD_SIZE_X ? positionX + 1 : null,
        xBot: positionY + 1 <= BOARD_SIZE_Y ? positionY + 1 : null,
        xTop: positionY - 1 >= 0 ? positionY - 1 : null
    }

    // Kiểm tra trường hợp bị chặn
    chesses.forEach(chess => {
        if(chess.isAlive) {
            if(chess.positionX == positionX) {
                if(chess.positionY == positionY - 1) {
                    scope.top = null
                }
                if(chess.positionY == positionY + 1) {
                    scope.bot = null
                }
            }
            if(chess.positionY == positionY) {
                if(chess.positionX == positionX - 1) {
                    scope.left = null
                }
                if(chess.positionX == positionX + 1) {
                    scope.right = null
                }
            }
        }
    })

    // Kiểm tra hướng đi hợp lệ
    if(scope.top != null) {
        if(moveAxis.yLeft != null) {
            canMoveAndAttack.push({x: moveAxis.yLeft, y: scope.top})
        }
        if(moveAxis.yRight != null) {
            canMoveAndAttack.push({x: moveAxis.yRight, y: scope.top})
        }
    }
    if(scope.bot != null) {
        if(moveAxis.yLeft != null) {
            canMoveAndAttack.push({x: moveAxis.yLeft, y: scope.bot})
        }
        if(moveAxis.yRight != null) {
            canMoveAndAttack.push({x: moveAxis.yRight, y: scope.bot})
        }
    }
    if(scope.left != null) {
        if(moveAxis.xTop != null) {
            canMoveAndAttack.push({x: scope.left, y: moveAxis.xTop})
        }
        if(moveAxis.xBot != null) {
            canMoveAndAttack.push({x: scope.left, y: moveAxis.xBot})
        }
    }
    if(scope.right != null) {
        if(moveAxis.xTop != null) {
            canMoveAndAttack.push({x: scope.right, y: moveAxis.xTop})
        }
        if(moveAxis.xBot != null) {
            canMoveAndAttack.push({x: scope.right, y: moveAxis.xBot})
        }
    }

    canMoveAndAttack = canMoveAndAttack.filter(road => {
        let isEnemy = true
        for(const chess of chesses) {
            if(chess.isAlive) {
                if(chess.faction == faction) {
                    if(road.x == chess.positionX && road.y == chess.positionY) {
                        isEnemy = false
                    }
                }
            }
        }
        return isEnemy
    })

    return canMoveAndAttack
}