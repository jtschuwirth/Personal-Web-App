import { useState, useEffect, useRef } from "react";

export const useSocket = (endpoint:string|null) => {
    const [socket, setSocket] = useState<WebSocket>()
    const runs = useRef(0)

    useEffect(() => {
        if (!runs.current && endpoint) {
            const newSocket = new WebSocket(endpoint)
            setSocket(newSocket)
            runs.current=1
        }
    }, [endpoint, runs])

    return socket

}