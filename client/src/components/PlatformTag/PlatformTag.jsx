import React from 'react';

const PlatformTag = props => {
  const { platform: { name, id, _id}, type, onChange } = props;
  const inputNameAttr = type === "checkbox" ? _id : "platform"

  return (
    <>
      <div className="field">
        <input 
          id={_id} 
          type={type} 
          name={inputNameAttr}
          value={id} 
          onChange={onChange} />
        <label htmlFor={_id}>{name}</label>
      </div>
    </>
  );
};

export default PlatformTag;