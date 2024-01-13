import { getCannonRoad } from "../core/cannon/getCannonRoad"
import { getChampionRoad } from "../core/champion/getChampionRoad"
import { getElephantRoad } from "../core/elephant/getElephantRoad"
import { getChessesOnTheRoad } from "../core/getChessesOnTheRoad"
import { getClosestChesses } from "../core/getClosestChesses"
import { getIndexInSortArr } from "../core/getIndexInSortArr"
import { getHorseRoad } from "../core/horse/getHorseRoad"
import { getOfficerRoad } from "../core/officer/getOfficerRoad"
import { getSoldierRoad } from "../core/soldier/getSoldierRoad"
import { 
    BOARD_SIZE_X, 
    BOARD_SIZE_Y, 
    ABOVE_BOUNDARY, 
    BELOW_BOUNDARY,
} from "../utils/constants"

const handleRoad = (active, chesses) => {
    const { id, positionX, positionY, faction, side } = active
    const roads = { canMove: [], canAttack: []}
    
    switch(active.role) {
        case 'cannon': {
            const onTheRoad = getChessesOnTheRoad(chesses, active)
            const indexInSortArr = getIndexInSortArr(onTheRoad, active)
            const closestChess = getClosestChesses(onTheRoad, indexInSortArr)
            const canMove = getCannonRoad(closestChess, active)
            roads.canMove = canMove

            // Tìm vị trí các quân cờ có thể tấn công ( Chưa chặt chẽ )
            if(onTheRoad.xRoad[indexInSortArr.y + 2] && onTheRoad.xRoad[indexInSortArr.y + 2].faction != faction) {
                roads.canAttack = [...roads.canAttack, { 
                    x: onTheRoad.xRoad[indexInSortArr.y + 2].positionX,
                    y: onTheRoad.xRoad[indexInSortArr.y + 2].positionY
                }]
            }
            if(onTheRoad.xRoad[indexInSortArr.y - 2] && onTheRoad.xRoad[indexInSortArr.y - 2].faction != faction) {
                roads.canAttack = [...roads.canAttack, { 
                    x: onTheRoad.xRoad[indexInSortArr.y - 2].positionX,
                    y: onTheRoad.xRoad[indexInSortArr.y - 2].positionY
                }]
            }
            if(onTheRoad.yRoad[indexInSortArr.x + 2] && onTheRoad.yRoad[indexInSortArr.x + 2].faction != faction) {
                roads.canAttack = [...roads.canAttack, { 
                    x: onTheRoad.yRoad[indexInSortArr.x + 2].positionX,
                    y: onTheRoad.yRoad[indexInSortArr.x + 2].positionY
                }]
            }
            if(onTheRoad.yRoad[indexInSortArr.x - 2] && onTheRoad.yRoad[indexInSortArr.x - 2].faction != faction) {
                roads.canAttack = [...roads.canAttack, { 
                    x: onTheRoad.yRoad[indexInSortArr.x - 2].positionX,
                    y: onTheRoad.yRoad[indexInSortArr.x - 2].positionY
                }]
            }

            return roads
        }
        case 'car': {
            const onTheRoad = getChessesOnTheRoad(chesses, active)
            const indexInSortArr = getIndexInSortArr(onTheRoad, active)
            const closestChess = getClosestChesses(onTheRoad, indexInSortArr)
            const canMove = getCannonRoad(closestChess, active)
            roads.canMove = canMove

            // Logic Tấn công
            Object.keys(closestChess).map(key => {
                if(closestChess[key].faction != faction) {
                    roads.canAttack = [...roads.canAttack, {
                        x: closestChess[key].positionX,
                        y: closestChess[key].positionY
                    }]
                }
            })

            return roads
        }
        case 'horse': {
            const canMoveAndAttack = getHorseRoad(active, chesses, BOARD_SIZE_X, BOARD_SIZE_Y)
            roads.canMove = canMoveAndAttack
            roads.canAttack = canMoveAndAttack
            console.log(roads)
            return roads
        }
        case 'elephant': {
            const {canMove, canAttack} = getElephantRoad(
                active, 
                chesses, 
                BOARD_SIZE_X, 
                BOARD_SIZE_Y, 
                ABOVE_BOUNDARY, 
                BELOW_BOUNDARY
            )
            roads.canMove = canMove
            roads.canAttack = canAttack
            return roads
        }
        case 'soldier': {
            const result = getSoldierRoad(
                active, 
                chesses, 
                BOARD_SIZE_X, 
                BOARD_SIZE_Y, 
                BELOW_BOUNDARY, 
                ABOVE_BOUNDARY
            )
            const roads = result
            return roads
        }
        case 'officer': {
            const { canMove, canAttack } = getOfficerRoad(active, chesses)
            roads.canMove = canMove
            roads.canAttack = canAttack

            return roads
        }
        case 'champion': {
            const { canMove, canAttack } = getChampionRoad(active, chesses)
            roads.canMove = canMove
            roads.canAttack = canAttack
            return roads
        }
        default: {
            console.warn(active)
            return roads
        }
    }   
}



export { handleRoad }