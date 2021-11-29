import React from "react";
export const ImageDecorator = ()=>{
    return(
        <img
        src='./burgerBack.png'
        alt='decorator'
        style={{
            position: 'absolute',
            bottom: '0',
            right: '-10px',
            zIndex: 4
        }}
        />
    )
}