import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path = "" } = req.query;
  const apiUrl = `${process.env.API_URL}/${path}`;

  const headers = {
    "Content-Type": req.headers["content-type"] || "",
  };

  try {
    const apiRes = await fetch(apiUrl, {
      method: req.method,
      headers,
      body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
    });

    const data = await apiRes.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(apiRes.status).json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
