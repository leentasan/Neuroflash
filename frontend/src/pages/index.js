import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/test")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Next.js + FastAPI</h1>
      <p>{data ? data.data : "Loading..."}</p>
    </div>
  );
}
