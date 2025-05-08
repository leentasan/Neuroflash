import { BookOpen } from "lucide-react";

type ClassCardProps = {
    title: string;
    subject: string;
    flashcardCount: number;
    date: string;
    progress: number;
};

export default function ClassCard({ title, subject, flashcardCount, date, progress}: ClassCardProps) {
    return (
    <div className="bg-gray-100 p-6 rounded-lg">
        <div className="flex flex-col h-full">
            <div className="flex justify-center mb-4">
                <div className="bg-white p-4 rounded-md">
                    <BookOpen className="w-10 h-10 text-gray-800"/>
                </div>
                
            </div>

            <h3 className="text-lg font-bold text-center mb-1"> {title}   </h3>
            <p className="text-gray-700 mb-4 text-center">  {subject} </p>

            <div className="mt-auto">
                <p className='text-sm font-medium'> {flashcardCount} Flashcards</p>
                <p className="text-sm text-gray-600 mb-4"> {date} </p>

                <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                        <div
                            
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-800 rounded-full"
                            style={{ width: `${progress}%` }}>

                        </div>
                    </div>
                </div>

                <div className="text-right">
                    <span className="font-bold"> {progress}%</span>
                </div>
            </div>
        </div>
    </div>
    );
}