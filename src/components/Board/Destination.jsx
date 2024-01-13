import { useDispatch } from "react-redux"
import style from "./Board.module.scss"
import { chessSlice } from "../../redux/slices/chessSlice"
const { move } = chessSlice.actions

function Destination({ x, y , active, areaSize, factionTurn, setActive, setActiveRoad, setFactionTurn }) {
    const dispatch = useDispatch()

    const handleMove = () => {
        dispatch(move({
            activeId: active.id,
            x, y
        }))
        setTimeout(() => {
            setActive(null)
        }, 110)
        setActiveRoad({ canMove: [], canAttack: [] })
        setFactionTurn(factionTurn == 'red' ? 'black' : 'red')
    }

    return <span 
        className={style.destination}
        style={{
            top: y * areaSize + 'px',
            left: x * areaSize + 'px'
        }}
        onClick={handleMove}
    ></span>
}

export default Destination;