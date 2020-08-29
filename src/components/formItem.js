import React, { useState, useEffect, useRef } from 'react';

export const FormItem = (props) => {
  const types = ['email', 'phone', 'link'];
  const [opened, setOpened] = useState(false);

  const ref = useRef(null);

  const closeSelect = (e) => {
    if (e.target.closest('.form__item') !== ref.current) {
      setOpened(false);
    }
  }

  useEffect(() => {
    window.addEventListener('click', closeSelect);

    return function cleanup() {
      window.removeEventListener('click', closeSelect);
    }
  }, []);

  const renderSelect = () => {
    return (
      <div ref={ref} className="form__item">
        <div className="form__select">
          <div 
            className="form__selectCurrent"
            onClick={(e) => {
              e.preventDefault();
              setOpened(!opened);
            }}
          >{props.data.type}</div>
          <div 
            style={{
              display: opened ? 'flex' : 'none'
            }} 
            className="form__selectDropdown"
          >
            {types.map((item,i) => {
              return (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    props.changeType(item, props.order);
                    setOpened(false);
                  }}
                  key={i}
                >{item}</div>
              )
            })}
          </div>
        </div>
        <input 
          value={props.data.value} 
          onChange={(e) => {
            e.preventDefault();
            props.changeValue(e.target.value, props.order);
          }}
          type="text"
        />
        {
          props.data.value.length > 0 ?
          <button
            onClick={(e) => {
              e.preventDefault();
              props.addItem(props.data.type, props.order);
            }}
            className="form__selectButton"
          >+</button>
          :
          null
        }
        <button
          disabled={ props.length < 2 ? true : false}
          onClick={(e) => {
            e.preventDefault();
            props.removeItem(props.order);
          }}
          className="form__selectButton"
        >-</button>
      </div>
    )
  }

  return (
    <div>
      {renderSelect()}
    </div>
  )
}
