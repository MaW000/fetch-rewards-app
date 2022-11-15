import React from 'react'
import { Dropdown } from 'flowbite-react';
function DropDownButton(obj) {
    const {addOcc, occupation} = obj
    return (
        <>
        <Dropdown
        label={occupation}
        dismissOnClick={true}
        >
        <div >
            {obj.data && obj.data.map((occ) => {
                return (
                    <button type="button" key={occ} onClick={() => addOcc(occ)}>
                    <Dropdown.Item >
                        {occ}
                    </Dropdown.Item>
                    </button>
                )
            })}
        </div>
        </Dropdown>
        </>
    )
}

export default DropDownButton