import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="relative w-full max-w-d">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500"/>
            </div>
            <input
                type="text"
                placeholder="Search..."
                className="border bg-gray-100 text-gray-900 text-sm rounded-full block w-full pl-12 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            />
        </div>
    )
}