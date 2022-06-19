import React from 'react'
import { RANDOM_KEY } from '../../utils/const'
import './MoveButtons.css'
export default function MoveButtons(props: any) {

    const mappingKey = (move: string) => {
        switch (move) {
            case RANDOM_KEY[0]:
                return '↑'
            case RANDOM_KEY[1]:
                return '↓'
            case RANDOM_KEY[2]:
                return '←'
            case RANDOM_KEY[3]:
                return '→'
            case RANDOM_KEY[4]:
                return '↖'
            case RANDOM_KEY[5]:
                return '↗'
            case RANDOM_KEY[6]:
                return '↙'
            case RANDOM_KEY[7]:
                return '↘'
            default: break
        }
    }

    return (
        <div className='moveBtns'>
            {props.moves && props.moves.map((m: { status: string, key: string, reverse: boolean }, index: number) => {
                return <div
                    key={index}
                    className={`btn ${m.reverse ? 'reverse' : ''} ${m.status} `}
                >
                    {mappingKey(m.key)}
                </div>
            })}
        </div>
    )
}
