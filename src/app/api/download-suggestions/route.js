import { list } from '@vercel/blob';

export async function GET(request) {
  try {
    // Get passcode from URL search params
    const url = new URL(request.url);
    const passcode = url.searchParams.get('passcode');

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
      // Return empty file if no suggestions
      const emptyContent = '# No suggestions yet\n';
      return new Response(emptyContent, {
        headers: {
          'Content-Type': 'text/plain',
          'Content-Disposition': `attachment; filename="suggestions-${new Date().toISOString().split('T')[0]}.txt"`,
        },
      });
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

// Also support POST for backward compatibility
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
      const emptyContent = '# No suggestions yet\n';
      return new Response(emptyContent, {
        headers: {
          'Content-Type': 'text/plain',
          'Content-Disposition': `attachment; filename="suggestions-${new Date().toISOString().split('T')[0]}.txt"`,
        },
      });
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
