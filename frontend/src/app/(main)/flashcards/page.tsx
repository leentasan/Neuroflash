// import Link from "next/link";
import SearchBar from "../../components/searchbar";
import ClassCard from "../../components/classcard";
import CreateClassCard from "../../components/createClassCard";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar/>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold"> Daftar Class </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ClassCard
         title="Cell"
         subject="Bio"
         flashcardCount={2}
          date="2023-10-01"
          progress={50} 
         />

        <ClassCard
         title="Cell"
         subject="Bio"
         flashcardCount={2}
          date="2023-10-01"
          progress={50} 
         />

         <CreateClassCard/>
      </div>
    </div>
  );
}