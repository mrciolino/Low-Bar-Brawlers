import React from 'react'
import dynamic from 'next/dynamic'
import { Skeleton } from "@/components/ui/skeleton"

export function World() {
    let Map = React.useMemo(() => dynamic(
        () => import('@/components/map'), // replace '@components/map' with your component's location
        {
            loading: () => <div className="w-full max-w-[75%] mx-auto py-4"> <Skeleton style={{ height: '67vh', width: '100%' }}/> </div>,
            ssr: false // This line is important. It's what prevents server-side render
        }
    ), [/* list variables which should trigger a re-render here */])
    return <Map />
}
