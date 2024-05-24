import { memo, useState } from "react";
import './index.css'
const ICON = memo(() => {
    const [isHover, setIsHover] = useState(false)
    return (
        <>
            <div
                className={["icon", isHover && 'hover'].join(' ')}
                onMouseEnter={() => {
                    console.log('enter...')
                    setIsHover(true)
                    window.electronAPI.setBounds({ width: 400, height: 500, originX: 400, originY: 500, })
                }}
         
            >
                图标
            </div>
            <div 
               onMouseLeave={() => {
                console.log('leave...')
                setIsHover(false)
                window.electronAPI.setBounds({ width: 85, height: 85, originX: 85, originY: 85, })
            }}
            className={['box', isHover && 'showbox'].join(' ')}>hover弹窗</div>
        </>

    )
})

export default ICON