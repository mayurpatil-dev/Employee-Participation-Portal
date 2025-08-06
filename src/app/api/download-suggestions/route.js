import { list } from '@vercel/blob';

export async function POST(request) {
  try {
    const { passcode } = await request.json();

    // Validate passcode
    if (passcode !== '1001') {
      return Response.json(
        { error: 'Invalid passcode' },
        { status: 401 }
      );
    }

    // Get the suggestions file
    const { blobs } = await list({
      prefix: 'suggestions/suggestions.txt',
    });

    if (blobs.length === 0) {
      return Response.json(
        { error: 'No suggestions found' },
        { status: 404 }
      );
    }

    // Fetch the file content
    const response = await fetch(blobs[0].url);
    const fileContent = await response.text();

    // Return the file as a downloadable response
    return new Response(fileContent, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="suggestions-${new Date().toISOString().split('T')[0]}.txt"`,
      },
    });

  } catch (error) {
    console.error('Error downloading suggestions:', error);
    return Response.json(
      { error: 'Failed to download suggestions' },
      { status: 500 }
    );
  }
}
