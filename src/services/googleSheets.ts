// TODO: Replace with your Google Apps Script Web App URL if not using .env
const HARDCODED_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw83Ajr1ETp85JH7Wr9HTyL97edyb1s4O2nTJEqaA7TQ27AENKe8exns-04xjWcWrfX/exec"; 

export const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || HARDCODED_SCRIPT_URL;

export const googleSheetsService = {
  async getData(sheetName: string) {
    if (!GOOGLE_SCRIPT_URL) {
      console.warn('Google Script URL not set. Please set VITE_GOOGLE_SCRIPT_URL in .env or HARDCODED_SCRIPT_URL in src/services/googleSheets.ts');
      return [];
    }
    try {
      console.log(`Fetching ${sheetName} from Google Sheets via proxy...`);
      // Use the local proxy to bypass CORS
      const proxyUrl = `/api/proxy?url=${encodeURIComponent(`${GOOGLE_SCRIPT_URL}?action=read&sheet=${sheetName}`)}`;
      const response = await fetch(proxyUrl);
      
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const json = await response.json();
        console.log(`Fetched ${json.data?.length || 0} rows for ${sheetName}`);
        return json.data;
      } else {
        const text = await response.text();
        // Check if the response is the Google Script error page
        if (text.includes("<!DOCTYPE html>") || text.includes("Google Apps Script")) {
           console.error(`Google Script Error for ${sheetName}. This usually means the script crashed. Check the Apps Script execution logs.`);
           // Try to extract the error message from the HTML if possible, though it's usually minified
           const errorMatch = text.match(/TypeError:.*\(line \d+, file "Code"\)/);
           if (errorMatch) {
             console.error("Script Error Detail:", errorMatch[0]);
           }
        } else {
           console.error(`Expected JSON but got ${contentType}:`, text.substring(0, 200));
        }
        return [];
      }
    } catch (error) {
      console.error(`Error fetching data for ${sheetName}:`, error);
      return [];
    }
  },

  async addRow(sheetName: string, data: any) {
    if (!GOOGLE_SCRIPT_URL) return;
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          action: 'create',
          sheet: sheetName,
          data: data
        })
      });
    } catch (error) {
      console.error('Error adding row:', error);
    }
  },

  async updateRow(sheetName: string, id: string, data: any) {
    if (!GOOGLE_SCRIPT_URL) return;
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          action: 'update',
          sheet: sheetName,
          id: id,
          data: data
        })
      });
    } catch (error) {
      console.error('Error updating row:', error);
    }
  },

  async deleteRow(sheetName: string, id: string) {
    if (!GOOGLE_SCRIPT_URL) return;
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          action: 'delete',
          sheet: sheetName,
          id: id
        })
      });
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  }
};
