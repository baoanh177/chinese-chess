import { useDispatch } from "react-redux";
import images from "../../assets/images/images";
import { chessSlice } from "../../redux/slices/chessSlice";
const { remove, move } = chessSlice.actions

function Chess({ 
    id, 
    areaSize, 
    faction, 
    role, 
    positionX, 
    positionY, 
    side, 
    active, 
    onActive, 
    isTarget,
    factionTurn,
    setActiveRoad, 
    setFactionTurn
}) {
    const dispatch = useDispatch()

    const handleActive = () => {
        if(factionTurn == faction) {
            onActive(active?.id == id ? null : { id, positionX, positionY, role, faction, side})
        }else if(active) {
            if(isTarget) {
                handleAttack()
            }
        }
    }

    const handleAttack = () => {
        dispatch(move({
            activeId: active.id,
            x: positionX,
            y: positionY
        }))
        setTimeout(() => {
            dispatch(remove(id))
            onActive(null)
        }, 110)
        setActiveRoad({ canMove: [], canAttack: [] })
        setFactionTurn(factionTurn == 'red' ? 'black' : 'red')
    }

    return <>
        <div 
            className={isTarget ? "chess isTarget" : "chess"} 
            style={{
                left: areaSize * positionX + 'px',
                top: areaSize * positionY + 'px',
                zIndex: active?.id == id ? 10 : undefined,
                boxShadow: active?.id == id ? '0 0 10px 0 lightseagreen' : undefined
            }}
            onClick={handleActive}
        >
            <img src={images[faction][role]} alt="" />
        </div>
    </>
}

export default Chess;