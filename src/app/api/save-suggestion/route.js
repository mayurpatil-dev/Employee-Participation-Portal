export async function POST(req) {
  try {
    const { name, suggestion } = await req.json();

    // Validate input
    if (!name || !suggestion) {
      return new Response(JSON.stringify({ error: 'Name and suggestion are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Log the attempt
    console.log('Attempting to save suggestion:', { name, suggestion });

    // Updated Google Apps Script URL - replace with your actual URL
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw80OJ1krxweCnSb47dlbsvguXDUO-zYgCf8bb5j6fiFWYIq0dIl_jZ6iXzFiyZmI7j/exec";
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: name.trim(), 
        suggestion: suggestion.trim(),
        timestamp: new Date().toISOString()
      }),
    });

    const result = await response.text();
    console.log('Google Script Response:', result);

    if (!response.ok) {
      throw new Error(`Google Script Error: ${result}`);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Suggestion saved successfully!',
      result: result 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error saving suggestion:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to save suggestion',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
