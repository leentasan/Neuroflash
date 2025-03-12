import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/test");
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to connect to FastAPI" });
  }
}
