import React from 'react';

const GenreTag = props => {
  const { genre: { name, id, _id}, type, onChange, checked } = props;
  const inputNameAttr = type === "checkbox" ? _id : "genre"

  return (
    <>
      <div className="field">
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

export default GenreTag;