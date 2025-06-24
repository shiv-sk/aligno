import Constants from "@/constents/constants";
import Link from "next/link";
import { CiFilter } from "react-icons/ci";

export default function MyTasks(){
    return(
        <div className="bg-base-200 min-h-screen">
            <div className="flex flex-col pt-8 items-center">
                <div className="w-full max-w-xl md:max-w-4xl mb-6 flex flex-row justify-between gap-3">
                    <input
                    type="text" 
                    name="search"
                    id="search" 
                    placeholder="Search by name or description" 
                    className="input md:w-full w-xs shadow-xl h-12"
                    />
                    <div className="relative w-full max-w-[200px]">
                        <CiFilter className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-xl text-gray-500"/>
                        <select className="select shadow-xl pl-9 w-full h-12">
                            <option disabled={true}>Pick a Priority</option>
                            <option value={Constants.Low}>Low</option>
                            <option value={Constants.Medium}>Medium</option>
                            <option value={Constants.High}>High</option>
                        </select>
                    </div>
                </div>
                <h1 className="text-xl font-bold py-4 px-2.5">Assigned Tasks</h1>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2.5">
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Task-Title!</h2>
                            <p>Task-Description!</p>
                            <div className="card-actions justify-end">
                            <Link href={'/aboutissue/1234'}>
                                <button className="btn btn-primary">More</button>
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}