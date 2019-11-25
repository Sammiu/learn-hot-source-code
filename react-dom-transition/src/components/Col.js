import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

export default function Col(props) {

  const containerRef = React.createRef();
  const [isLeave, setIsLeave] = useState(false);
  const [classVal, setClassVal] = useState('item__wrap_leave item__wrap-animate-leave animate-item');

  function removeClickHandle() {
    setIsLeave(true);
    setClassVal('item__wrap_leave item__wrap-animate-leave');
  }

  function onHiddenEnd(props) {
    props.onRemove && props.onRemove(props.index);
    setClassVal('');
    setIsLeave(false)
  }

  useEffect(() => {
    setClassVal('item__wrap_enter item__wrap-animate-enter')
  }, [setClassVal]);

  return (
      <div ref={containerRef} className={`animate-item__wrap ${classVal}`}
           onAnimationEnd={() => isLeave ? onHiddenEnd(props) : setClassVal('')}>
        <span onClick={removeClickHandle}>
        <svg t="1569575557861" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="3224" width="22" height="22">
          <path
              d="M482.656 316.672c0-17.6 14.4-32 32-32l0 0c17.6 0 32 14.4 32 32l0 485.344c0 17.6-14.4 32-32 32l0 0c-17.6 0-32-14.4-32-32L482.656 316.672zM332 316.672c0-17.6 14.4-32 32-32l0 0c17.6 0 32 14.4 32 32l0 485.344c0 17.6-14.4 32-32 32l0 0c-17.6 0-32-14.4-32-32L332 316.672zM633.344 316.672c0-17.6 14.4-32 32-32l0 0c17.6 0 32 14.4 32 32l0 485.344c0 17.6-14.4 32-32 32l0 0c-17.6 0-32-14.4-32-32L633.344 316.672zM898.656 159.328l-125.952 0-46.016 0 0-40.224c0-31.328-28.096-55.776-64-55.776l-296 0c-35.904 0-64 24.512-64 55.776l0 40.224-46.016 0-131.328 0c-17.664 0-32 14.304-32 32s14.336 32 32 32l67.328 0 0 674.912c0 34.432 28.704 62.432 64 62.432l516 0c35.296 0 64-28 64-62.432l0-674.912 61.984 0c17.664 0 32-14.304 32-32S916.32 159.328 898.656 159.328zM366.656 127.328l296 0 0 32-296 0L366.656 127.328zM739.008 896.768c0 0-414.016 1.376-449.024 1.376s-33.312-36.128-33.312-36.128 0-570.976 0-608 31.328-30.688 31.328-30.688l78.688 0 296 0 72.32 0c0 0 37.728-2.272 37.728 30.688s0.512 579.968 0.512 610.976S739.008 896.768 739.008 896.768z"
              p-id="3225" fill="#ffffff"></path>
        </svg>
        </span>
      </div>
  )
}


Col.propTypes = {
  onAdd: PropTypes.func,
  onRemove: PropTypes.func
};
