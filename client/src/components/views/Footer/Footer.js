import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p> <Icon type="smile" /> 즐거운 kuntube <Icon type="smile" /></p>
        </div>
    )
}

export default Footer
