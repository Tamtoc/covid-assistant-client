import React from 'react';

const getStyle = (props)=>{
    let baseClass = "alert ";
    if(props.message.error)
        baseClass = baseClass + "alert-danger";
    else
        baseClass = baseClass + "alert-primary";
    return baseClass + " text-center";
}

export const Message = (props) => {
    return (
        <div className={getStyle(props)} role="alert">
            { props.message.errors[0].msg }
        </div>
    )
}
