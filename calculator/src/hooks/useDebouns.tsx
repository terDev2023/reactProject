import { useEffect, useRef } from 'react'

const useDebouns = ( val: string ) => {
    const timeRef = useRef<NodeJS.Timeout | null>(null)
     
    useEffect(() => {
      timeRef.current = setTimeout(() => {
      console.log('action is Complited')
      }, 1500)
      return () => {
        if (timeRef.current) clearTimeout(timeRef.current)
      }
    }, [val])
}

export default useDebouns