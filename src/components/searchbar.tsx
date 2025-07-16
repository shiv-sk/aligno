import { CiSearch } from "react-icons/ci";

export default function SearchBar(){
    return(
        <div className="relative w-full">
            <CiSearch className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-xl text-gray-500"/>
            <input 
            type="text" 
            name="search"
            id="search"
            placeholder="Search by name or description"
            className="input md:w-full w-xs pl-9 shadow-xl h-12"/>
        </div>
    )
}