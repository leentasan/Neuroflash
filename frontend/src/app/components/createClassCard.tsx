import { Plus } from "lucide-react";

export default function CreateClassCard() {
    return (
        <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
            <div className="text-center">
                <div className="flex justify-center mb-2">
                    <Plus className="w-8 h-8 text-gray-800"/>
                </div>
                <p> Create New Class </p>
            </div>
        </div>
    )
}