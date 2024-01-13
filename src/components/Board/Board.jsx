import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { handleRoad } from "./helpers/handleRoad"
import { getDestinationX, getDestinationY } from "./helpers/handleDestination"
import style from "./Board.module.scss"
import Chesses from "./Chesses"
import Destination from "./Destination"

const areaSize = 60

function Board() {
    const initTurn = JSON.parse(localStorage.getItem('factionTurn')) || 'red'
    const [factionTurn, setFactionTurn] = useState(initTurn)
    const [active, setActive] = useState(null)
    const [activeRoad, setActiveRoad] = useState({canMove: [], canAttack: []}) // Chưa chặt chẽ
    const chesses = useSelector(state => state.chess)


    useEffect(() => {
        localStorage.setItem('chesses', JSON.stringify(chesses))
        localStorage.setItem('factionTurn', JSON.stringify(factionTurn))
    }, [chesses])

    useEffect(() => {
        if(active) {
            const activeRoad = handleRoad(active, chesses)
            setActiveRoad(activeRoad)
        }else {
            setActiveRoad({canMove: [], canAttack: []})
        }
    }, [active])

    return (
        <div className={style.board}>
            <div className={style.turnLine}>
                <div 
                    className={`${style.topLine} ${factionTurn == 'black' ? style.active : ''}`} 
                    style={{background: 'black'}}>
                </div>
                <div 
                    className={`${style.botLine} ${factionTurn == 'red' ? style.active : ''}`} 
                    style={{background: 'darkred'}}>
                </div>
            </div>
            <div className={style.destinations}>
                {[...Array(90).keys()].map(n => {
                    let canMove
                    const x = getDestinationX(n)
                    const y = getDestinationY(n)

                    activeRoad.canMove.forEach(road => {
                        if(x == road?.x && y == road?.y) {
                            canMove = true
                        }
                    })
                    if(canMove) {
                        return (
                            <Destination 
                                key={n} x={x}y={y} 
                                active={active} 
                                factionTurn={factionTurn}
                                setActive={setActive} 
                                setActiveRoad={setActiveRoad}
                                setFactionTurn={setFactionTurn}
                                areaSize={areaSize}
                            />
                        )
                    }
                })}
            </div>
            <svg width={areaSize * 8} height={areaSize * 9}>
                <g>
                    <g>
                        <g>
                            <line x1={areaSize * 3} y1={0} x2={areaSize * 5} y2={areaSize * 2} stroke="darkgoldenrod" strokeWidth={2}/>
                            <line x1={areaSize * 5} y1={0} x2={areaSize * 3} y2={areaSize * 2} stroke="darkgoldenrod" strokeWidth={2}/>
                        </g>
                        {[...Array(8).keys()].map(num => 
                            <line key={num} x1={areaSize * num} y1={0} x2={areaSize * num} y2={areaSize * 9} stroke="darkgoldenrod" strokeWidth={2} />
                        )}
                    </g>
                    <rect width={areaSize * 8} height={areaSize} x={0} y={areaSize * 4} fill="goldenrod" stroke="darkgoldenrod" strokeWidth={2}/>
                    <g>
                        <g>
                            <line x1={areaSize * 3} y1={areaSize * 7} x2={areaSize * 5} y2={areaSize * 9} stroke="darkgoldenrod" strokeWidth={2}/>
                            <line x1={areaSize * 5} y1={areaSize * 7} x2={areaSize * 3} y2={areaSize * 9} stroke="darkgoldenrod" strokeWidth={2}/>
                        </g>
                        {[...Array(10).keys()].map(num => 
                            <line key={num} x1={0} y1={areaSize * num} x2={areaSize * 8} y2={areaSize * num} stroke="darkgoldenrod" strokeWidth={2} />
                        )}
                    </g>
                </g>

                <g>
                </g>
            </svg>
            <Chesses 
                areaSize={areaSize} 
                chesses={chesses} 
                active={active} 
                canAttack={activeRoad.canAttack} 
                factionTurn={factionTurn}
                onActive={setActive}
                setActiveRoad={setActiveRoad}
                setFactionTurn={setFactionTurn}
            />
        </div>
    )
}

export default Board
