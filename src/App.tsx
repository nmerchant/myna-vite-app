import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { data as sampleData } from './data';

const baseImgUrl = 'https://cdn.myna.co/';

function App() {
    const [shoeData, setData] = useState<any[]>();
    const [searchString, setSearchString] = useState('');
    const [filteredData, setFilteredData] = useState<any[]>();

    useEffect(() => {
        const getData = async () => {
            const data = sampleData.data?.assets?.edges
            setData(data);
            setFilteredData(data);
        }

        getData();
    }, [])

    useEffect(() => {
        setFilteredData(shoeData?.filter(s => {
            return s.node?.name?.indexOf(searchString) !== -1;
        }))
    }, [searchString]);

    return (
        <main className="flex min-h-screen w-full items-start justify-between p-24 gap-4">
            <div className='w-[220px] mt-[52px]'>
                <input onChange={e => { setSearchString(e?.currentTarget?.value) }} placeholder='Search items...' className='border border-[#2B3641] rounded-full bg-[#15212D] p-3'></input>
            </div>
            <div className='flex flex-col flex-grow items-start gap-4'>
                <div className='text-3xl font-bold'>Found {shoeData?.length} results {searchString && `for: "${searchString}"`}</div>
                <div className='flex flex-wrap gap-4 text-left'>
                    {filteredData?.map((edge: any) => {
                        const node = edge.node;
                        return (
                            <div key={filteredData.indexOf(edge)} className='w-[280px] flex flex-col gap-4 border border-[#2B3641] rounded-lg bg-[#15212D] p-8'>
                                <div className={`bg-cover bg-center bg-[url('https://cdn.myna.co/DO6365-001/DO6365-001_JPG-5_5d595be6-c5b3-4a5f-ad82-bad0487e4f29.jpg')] h-[180px] w-full`} />
                                <div className='font-bold'>{node?.name}</div>
                                <div>
                                    <div className='text-[#949CA4] text-sm'>Price</div>
                                    <div className='font-bold'>${(node?.retailPrice/100).toFixed(2)}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}

export default App
