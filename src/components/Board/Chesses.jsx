import Chess from "./Chess"

function Chesses({ chesses, areaSize, active, onActive, canAttack, factionTurn, setActiveRoad, setFactionTurn }) {
    return <>
        {chesses.map((chess, index) => {
            const { positionX, positionY } = chess
            let isTarget
            canAttack.forEach(position => {
                if(position.x == positionX && position.y == positionY) {
                    isTarget = true
                }
            })
            return chess.isAlive && 
                <Chess 
                    key={index} 
                    areaSize={areaSize} 
                    active={active} 
                    factionTurn={factionTurn}
                    onActive={onActive} 
                    setActiveRoad={setActiveRoad}
                    setFactionTurn={setFactionTurn}
                    {...chess}
                    isTarget={isTarget}
                />
        })}
    </>
}

export default Chesses;