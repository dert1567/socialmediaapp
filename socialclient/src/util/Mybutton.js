import { IconButton, Tooltip } from '@material-ui/core'
import React from 'react'




export default ({ children, onClick, btnClassName, tipClassName, tip }) => (
    <Tooltip title={tip} className={tipClassName} placement="top">
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>

)



