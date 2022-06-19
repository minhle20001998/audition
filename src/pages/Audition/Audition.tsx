/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { ARROW_CODE, DIFFICULTY, RANDOM_KEY, STATUS } from '../../utils/const'
import MoveButtons from '../../components/MoveButtons/MoveButtons'
import Timer from '../../components/Timer/Timer'
import Modal from '../../components/Modal/Modal';
import song from '../../assets/mp3.mp3';
import './Audition.css'
import Above from '../../components/Above/Above';

export default function Audition() {
    const [move, setMove] = useState<any[]>([]);
    const [gameStart, setGameStart] = useState(false);
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [canSpace, setCanSpace] = useState(true);
    const [inTurn, setInTurn] = useState(1); // 1: after 0: immediate
    const [difficulty, setDifficulty] = useState(DIFFICULTY.EASY);
    const [performance, setPerformance] = useState('');
    const [openModal, setOpenModal] = useState(true);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (!gameStart) {
            return;
        }
        generateMoves(difficulty);
        let timer = setInterval(checkSongTime, 1000);
        audioRef!.current!.volume = 0.2;
        audioRef!.current!.onended = () => {
            setGameStart(false);
            setOpenModal(true);
        }
        return () => {
            clearInterval(timer);
        }
    }, [gameStart])

    useEffect(() => {
        document.addEventListener('keyup', handleKeyDown);
        return () => {
            document.removeEventListener('keyup', handleKeyDown);
        }
    }, [index, move, inTurn])

    const checkSongTime = () => {
        if (!audioRef.current) {
            return;
        }
        const timePassedPercentage = (Math.ceil(audioRef.current.currentTime) / Math.ceil(audioRef.current.duration)) * 100;
        if (timePassedPercentage < 30) {
            setDifficulty(DIFFICULTY.EASY);
        }
        if (timePassedPercentage >= 30 && timePassedPercentage <= 60) {
            setDifficulty(DIFFICULTY.MEDIUM);
        } else if (timePassedPercentage > 60) {
            setDifficulty(DIFFICULTY.HARD);
        }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (inTurn % 2 !== 0) {
            return;
        }
        if (e.code in ARROW_CODE) {
            setIndex((prev) => { return prev + 1 })
            checkMoveOk(ARROW_CODE[e.code])
        }
    }

    const generateMoves = (difficulty: string) => {
        let numsOfMoves = 0;
        let movesArray = [];
        switch (difficulty) {
            case DIFFICULTY.HARD:
                numsOfMoves = 8;
                break;
            case DIFFICULTY.MEDIUM:
                numsOfMoves = 6;
                break;
            case DIFFICULTY.EASY:
                numsOfMoves = 4;
                break;
            default:
                break;
        }

        for (let i = 0; i < numsOfMoves; i++) {
            movesArray.push(generateMoveObj())
        }

        setMove(movesArray);
    }

    const generateMoveObj = () => {
        const { move, reverse, code } = getRandomDirection();
        return {
            key: move,
            status: STATUS.PENDING,
            reverse: reverse,
            code: code
        }
    }

    const getRandomDirection = () => {
        const randomMoves = Math.floor(Math.random() * DIFFICULTY['4K']);
        const randomReverse = Math.floor(Math.random() * 11) > 8 ? true : false;
        return { move: RANDOM_KEY[randomMoves], reverse: randomReverse, code: randomMoves };
    }

    const checkMoveOk = (key: string) => {
        const updated = move.map((element, i) => {
            if (i === index && element.reverse) {
                const trueMove = element.code % 2 === 0 ? element.code + 1 : element.code - 1;
                if (key === RANDOM_KEY[trueMove]) {
                    return { status: STATUS.OK, key: RANDOM_KEY[trueMove], reverse: false, code: trueMove }
                } else {
                    setPerformance('Bad');
                    return { status: STATUS.FAIL, key: RANDOM_KEY[trueMove], reverse: false, code: trueMove }
                }
            } else if (i === index && !element.reverse) {
                if (key === element.key) {
                    return { ...element, status: STATUS.OK }
                }
                else {
                    setPerformance('Bad');
                    return { ...element, status: STATUS.FAIL }
                }
            }
            else {
                return element
            }
        })
        setMove(updated);
    }

    const renderNewTurn = () => {
        setInTurn((prev) => (prev + 1) % 2);
        setIndex(0);
        setCanSpace(true);
        if (inTurn % 2 !== 0) {
            return;
        }
        generateMoves(difficulty);
    }

    const onCloseModal = () => {
        setGameStart(true);
        setOpenModal(false);
    }

    if (!gameStart) {
        return <Modal
            open={openModal}
            onClose={onCloseModal}
            score={score}
        >
            <div></div>
        </Modal>
    }

    return (
        <div className='game-container'>
            <audio controls autoPlay ref={audioRef} hidden>
                <source src={song} type="audio/mp3" />
            </audio>
            <div className='above'>
                <Above score={score} performance={performance} />
            </div>
            <div className='below'>
                <Timer
                    setScore={setScore}
                    canSpace={canSpace}
                    move={move}
                    renderNewTurn={renderNewTurn}
                    setCanSpace={setCanSpace}
                    difficulty={difficulty}
                    setPerformance={setPerformance}
                    inTurn={inTurn}
                />
                {inTurn % 2 === 0 && <MoveButtons moves={move} />}
            </div>
        </div>
    )
}
