import fs from 'fs';
import path from 'path';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { headline } = JSON.parse(event.body);
    if (!headline) return { statusCode: 400, body: 'Missing headline' };

    const filePath = path.join(process.cwd(), 'news.json');
    const newsData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    newsData.unshift(headline); // add to top
    fs.writeFileSync(filePath, JSON.stringify(newsData, null, 2));

    return { statusCode: 200, body: 'Headline added' };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: 'Server error' };
  }
}
