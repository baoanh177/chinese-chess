import {
    LEFT_CHAMPION_AREA,
    RIGHT_CHAMPION_AREA,
    BELOW_BOT_CHAMPION_AREA,
    BELOW_TOP_CHAMPION_AREA,
    ABOVE_TOP_CHAMPION_AREA,
    ABOVE_BOT_CHAMPION_AREA
} from "../../utils/constants"

export const getChampionRoad = (active, chesses) => {
    const { positionX, positionY, faction, side } = active
    const canMove = []
    const canAttack = []

    const scope = [
        { x: positionX - 1, y: positionY },
        { x: positionX + 1, y: positionY },
        { x: positionX, y: positionY + 1 },
        { x: positionX, y: positionY - 1 },
    ]

    scope.forEach(position => {
        if(position.x < LEFT_CHAMPION_AREA || position.x > RIGHT_CHAMPION_AREA) {
            return
        }
        if(side == 'below') {
            if(position.y > BELOW_BOT_CHAMPION_AREA || position.y < BELOW_TOP_CHAMPION_AREA) {
                return
            }
        }else if(side == 'above') {
            if(position.y > ABOVE_BOT_CHAMPION_AREA || position.y < ABOVE_TOP_CHAMPION_AREA) {
                return
            }
        }
        canMove.push(position)
    })

    chesses.forEach(chess => {
        if(chess.isAlive) {
            canMove.forEach((position, index) => {
                if(position.x == chess.positionX && position.y == chess.positionY) {
                    if(chess.faction != faction) {
                        canAttack.push(position)
                    }
                    canMove.splice(index, 1)
                }
            })
        }
    })

    console.log({ canMove, canAttack })

    return { canMove, canAttack }
} 