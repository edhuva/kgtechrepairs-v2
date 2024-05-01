import { useEffect } from 'react'

//use Title hook
const useTitle = (title) => {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = title;

        return () => document.title = prevTitle;
    }, [title])
}

export default useTitle