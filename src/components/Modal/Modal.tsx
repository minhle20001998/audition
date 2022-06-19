import React from 'react'
import ReactDom from 'react-dom';
import './Modal.css';

interface PropsType {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  score: number;
}

export default function Modal(props: PropsType) {

  if (!props.open) {
    return null;
  }

  return ReactDom.createPortal(
    <div className='modal-container'>
      <div className='modal'>
        <div className='last-score'>{props.score > 0 && `Last score: ${props.score}`}</div>
        <div>{props.children}</div>
        <div className='close-btn' onClick={props.onClose}>Chơi</div>
      </div>
    </div>
    , document.getElementById('portal')!
  )
}
