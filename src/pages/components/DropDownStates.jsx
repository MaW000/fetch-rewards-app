import React, { useState } from 'react'
import { Dropdown } from 'flowbite-react';
function DropDownStates(obj) {
    if(obj.data) {
        const {data, state, addState} = obj
        
        const states = data.map((obj) => {
            return obj.name
        })

        return (
            <>
            <Dropdown
            label={state}
            dismissOnClick={true}
            >
                {states.map && states.map((occ) => {
                    return (
                        <button type="button" key={occ} onClick={() => addState(occ)}>
                        <Dropdown.Item >
                            {occ}
                        </Dropdown.Item>
                        </button>
                    )
                })}
            
            </Dropdown>
            </>
        )
    }
}

export default DropDownStates