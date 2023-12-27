import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { data as sampleData } from './data';

const baseImgUrl = 'https://cdn.myna.co/';

type TShoeData = {
    node: {
        __typename: string;
        id: string;
        name: string;
        sku: string;
        retailPrice: number;
        images: {
            assetImageOrderIndex: number;
            imageURL: string;
            id: string;
        }[];
    };
    cursor: string;
}

function App() {
    const [shoeData, setData] = useState<TShoeData[]>();
    const [searchString, setSearchString] = useState('');
    const [filteredData, setFilteredData] = useState<TShoeData[]>();
    const [highToLowChecked, setHighToLowChecked] = useState(false);
    const [lowToHighChecked, setLowToHighChecked] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const data = sampleData.data?.assets?.edges;
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

    const dataToRender = searchString ? filteredData : shoeData;

    if (highToLowChecked) {
        dataToRender?.sort((a, b) => b.node.retailPrice - a.node.retailPrice);
    } else if (lowToHighChecked) {
        dataToRender?.sort((a, b) => a.node.retailPrice - b.node.retailPrice);
    }
    

    return (
        <main className="flex min-h-screen w-full items-start justify-between p-24 gap-4">
            <div className='w-[300px] mt-[52px] flex flex-col gap-4 text-left'>
                <input className='w-full border border-[#2B3641] rounded-full bg-[#15212D] p-3'
                    onChange={e => { setSearchString(e?.currentTarget?.value) }} 
                    placeholder='Search items...' />
                <div className='w-full flex flex-col gap-2'>
                    <div className='font-bold'>Sort by Price</div>
                    <div>
                        <div><input onChange={() => {
                            setHighToLowChecked(!highToLowChecked);
                            setLowToHighChecked(false);
                        }} checked={highToLowChecked} className='mr-2 mb-2' type="checkbox" /> High to Low</div>
                        <div><input onChange={() => {
                            setLowToHighChecked(!lowToHighChecked);
                            setHighToLowChecked(false);
                        }} checked={lowToHighChecked} className='mr-2' type="checkbox" /> Low to High</div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-[960px] items-start gap-4'>
                <div className='text-3xl font-bold'>Found {shoeData?.length} results {searchString && `for: "${searchString}"`}</div>
                <div className='flex flex-wrap gap-4 text-left'>
                    {dataToRender?.map((edge: any) => {
                        const node = edge.node;
                        return (
                            <div key={dataToRender.indexOf(edge)} className='w-[280px] flex flex-col gap-4 border border-[#2B3641] rounded-lg bg-[#15212D] p-8'>
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
