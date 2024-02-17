import React, { useEffect } from 'react'

export default function Info() {
    useEffect(() => {
        window.localStorage.setItem("visited", true);
    }, [])
    return (
        <div>Info</div>
    )
}
