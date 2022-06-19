import React, { useEffect, useRef } from 'react'

const speed = 3;

export default function Above(props: any) {
  const scoreRef = useRef<HTMLParagraphElement>(null);
  const oldScore = useRef(props.score);

  useEffect(() => {
    if (!scoreRef.current) {
      return;
    }
    incEltNbr();
    oldScore.current = props.score;
  }, [props.score])

  const incNbrRec = (i: any, endNbr: any, elt: any) => {
    console.log('alooo')
    if (i <= endNbr) {
      elt.innerHTML = i;
      setTimeout(function () {//Delay a bit before calling the function again.
        incNbrRec(i + 1, endNbr, elt);
      }, speed);
    }
  }

  const incEltNbr = () => {
    let elt = scoreRef.current;
    let endNbr = props.score;
    incNbrRec(oldScore.current, endNbr, elt);
  }

  return (
    <>
      <div className='performance'>{props.performance}</div>
      <p className='score' ref={scoreRef}></p>
    </>
  )
}
