export default async function handler(req: any, res: any) {
  const { url } = req.query;

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");
    const text = await response.text();
    
    if (contentType) {
      res.setHeader("Content-Type", contentType);
    }
    
    // Set CORS headers to allow the frontend to call this function
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    res.status(200).send(text);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Failed to fetch from target URL" });
  }
}
