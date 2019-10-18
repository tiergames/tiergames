import React from 'react';

const PlatformTag = props => {
  const { platform: { name, id, _id}, type, onChange, checked } = props;
  const inputNameAttr = type === "checkbox" ? _id : "platform"

  return (
    <>
      <div className="field field-platform-checkbox">
        <input 
          id={_id} 
          type={type} 
          name={inputNameAttr}
          value={id} 
          onChange={onChange} 
          checked={checked}
        />
        <label htmlFor={_id}>{name}</label>
      </div>
    </>
  );
};

export default PlatformTag;