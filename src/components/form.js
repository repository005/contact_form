import React, { useState } from 'react';
import { FormItem } from './formItem';
import './form.scss';

export const Form = () => {

  const [formData, setFormData] = useState([
    {
      type: 'email',
      value: 'test@test.com'
    },
    {
      type: 'email',
      value: 'test2@test.com'
    },
    {
      type: 'phone',
      value: '+79998887654'
    },
  ]);

  const changeType = (newType, order) => {
    let copyFormData = [...formData];
    copyFormData[order].type = newType;
    setFormData(copyFormData);
  }

  const changeValue = (newValue, order) => {
    let copyFormData = [...formData];
    copyFormData[order].value = newValue;
    setFormData(copyFormData);
  }

  const addItem = (type, order) => {
    console.log(type, order);
    let copyFormData = [...formData];
    copyFormData.splice(order+1, 0, {
      type: type,
      value: ''
    });
    setFormData(copyFormData);
  }

  const removeItem = (order) => {
    let copyFormData = [...formData];
    copyFormData.splice(order, 1);
    setFormData(copyFormData);
  }

  const getFormValues = () => {
    let newValue = {
      type: [],
      value: []
    };
    formData.forEach(item => {
      newValue.type.push(item.type);
      newValue.value.push(item.value);
    })

    return newValue;
  }

  const convertArrayToObject = () => {
    let formValue = getFormValues();
    let newValue = [];
    formValue.type.forEach((item, i) => {
      newValue.push({
        type: item,
        value: formValue.value[i]
      })
    });
    return JSON.stringify(newValue);
  }

  const renderInputs = () => {
    return formData.map((item, i) => {
      return (
        <div 
          style={{
            zIndex: formData.length - i,
            position: 'relative'
          }}
          className="form__selectWrapper"
          key={i}
        >
          <FormItem length={formData.length} data={item} changeType={changeType} changeValue={changeValue} addItem={addItem} removeItem={removeItem} order={i}/>
        </div>
      )
    })
  }
     
  return (
    <div className="form">
      <div className="form__container">
        {renderInputs()}
      </div>
      <div className="form__buttons">
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log(getFormValues());
          }}
        >getFormValues</button>
        <button
          onClick={(e) => {
            e.preventDefault()
            console.log(convertArrayToObject());
          }}
        >convertArrayToObject</button>
      </div>
    </div>
  )
}
