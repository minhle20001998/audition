/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useLayoutEffect, useEffect, useState } from 'react'
import { DIFFICULTY_BONUS_RATE } from '../../utils/const';
import './Timer.css'

const RATE_OF_SPEED = 0.07;

export default function Timer(props: any) {
    const cursorRef = useRef<HTMLDivElement>(null);
    const spaceRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const [cursorSpeed, setCursorSpeed] = useState((window.innerWidth * RATE_OF_SPEED) / 100);

    useLayoutEffect(() => {
        let timer = setInterval(moveCursor, 5);
        return () => {
            clearInterval(timer);
        };
    }, [props.difficulty, cursorSpeed, props.inTurn])

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [cursorSpeed])

    useEffect(() => {
        document.addEventListener('keypress', handleSpaceHit);
        return () => {
            document.removeEventListener('keypress', handleSpaceHit);
        }
    }, [props.canSpace, props.move])

    const handleResize = () => {
        const { innerWidth: width } = window;
        const cursorSpeed = (width * RATE_OF_SPEED) / 100;
        setCursorSpeed(cursorSpeed <= 0.5 ? 0.5 : cursorSpeed);
    }

    const handleSpaceHit = (e: KeyboardEvent) => {
        if (props.inTurn % 2 !== 0) {
            return;
        }
        if (e.code !== 'Space') {
            return;
        }
        if (!cursorRef.current || !spaceRef.current || !barRef.current) {
            return;
        }
        const cursorPosX = cursorRef.current.getBoundingClientRect().x + (cursorRef.current.clientWidth / 2);
        const spacePosStart = spaceRef.current.getBoundingClientRect().x;
        const spacePosEnd = spaceRef.current.getBoundingClientRect().x + spaceRef.current.clientWidth;
        const isFail = props.move.some((el: any) => el.status !== 'ok');
        if (cursorPosX >= spacePosStart && cursorPosX <= spacePosEnd && props.canSpace === true && !isFail) {
            caculateScore(cursorPosX, spacePosStart, spacePosEnd)
            if (!cursorRef.current.classList.contains('hit')) {
                cursorRef.current.classList.add('hit');
            }
        } else {
            props.setPerformance('Bad')
            if (!cursorRef.current.classList.contains('miss')) {
                cursorRef.current.classList.add('miss');
            }
        }
        props.setCanSpace(false);
    }

    const caculateScore = (cursorPosX: number, spacePosStart: number, spacePosEnd: number) => {
        const status = Math.floor((cursorPosX - spacePosStart) / (spacePosEnd - spacePosStart) * 100);
        if (status < 45) {
            props.setPerformance('Great')
            props.setScore((prev: number) => { return prev + (50 * DIFFICULTY_BONUS_RATE[props.difficulty]) })
        } else if (status >= 45 && status <= 55) {
            props.setPerformance((prev: string) => {
                if (!prev.includes('Perfect')) {
                    return 'Perfect';
                }
                const numsOfPerfect = prev.split(' ')[1];
                if (numsOfPerfect)
                    return `Perfect x${+(numsOfPerfect.replace(/\D/g, '')) + 1}`
                else
                    return 'Perfect x2'
            })
            props.setScore((prev: number) => { return prev + (100 * DIFFICULTY_BONUS_RATE[props.difficulty]) })
        } else if (status > 55) {
            props.setPerformance('Cool')
            props.setScore((prev: number) => { return prev + (20 * DIFFICULTY_BONUS_RATE[props.difficulty]) })
        }
    }

    const moveCursor = () => {
        if (!cursorRef.current || !spaceRef.current || !barRef.current) {
            return;
        }
        if (barRef.current.clientWidth < cursorRef.current.offsetLeft + (cursorRef.current.clientWidth / 2)) {
            newIteration();
            return;
        }
        cursorRef.current.style.left = cursorRef.current.offsetLeft + cursorSpeed + 'px';
    }

    const newIteration = () => {
        if (!cursorRef.current || !spaceRef.current || !barRef.current) {
            return;
        }
        props.renderNewTurn();
        cursorRef.current.classList.remove('hit');
        cursorRef.current.classList.remove('miss');
        cursorRef.current.style.left = '0px';
    }

    return (
        <div className='time-bar' ref={barRef}>
            <div className='time-space' ref={spaceRef}></div>
            <div className='time-cursor' ref={cursorRef}></div>
        </div>
    )
}
