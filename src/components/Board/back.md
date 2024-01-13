<div className={style.area}>
                {[...Array(32).keys()].map(item =>
                    <div key={item} data-area={item} className={style.box}>
                        {(item == 3 || item == 12) && <svg height={60} width={60}>
                            <line x1={0} y1={0} x2={60} y2={60} stroke="darkgoldenrod" strokeWidth={2} />
                        </svg> }

                        {(item == 4 || item == 11) && <svg height={60} width={60}>
                            <line x1={60} y1={0} x2={0} y2={60} stroke="darkgoldenrod" strokeWidth={2} />
                        </svg> }
                    </div>
                )}
            </div>
            <div className={style.boundary}>
                <span>中國</span>
                <span>象棋</span>
            </div>
            <div className={style.area}>
                {[...Array(32).keys()].map(item => <div key={item} data-area={item} className={style.box}>
                    {(item == 19 || item == 28) && <svg height={60} width={60}>
                        <line x1={0} y1={0} x2={60} y2={60} stroke="darkgoldenrod" strokeWidth={2} />
                    </svg> }

                    {(item == 20 || item == 27) && <svg height={60} width={60}>
                        <line x1={60} y1={0} x2={0} y2={60} stroke="darkgoldenrod" strokeWidth={2} />
                    </svg> }
                </div>)}
            </div>


            .area {
        display: grid;
        grid-template-columns: repeat(8, 60px);
        .box {
            height: 60px;
            border: 0.5px solid darkgoldenrod;
        }
    }
    .boundary {
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 34px;
        color: darkgoldenrod;
        height: 60px;
        border: 0.5px solid darkgoldenrod;
    }
