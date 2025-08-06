import { put, list } from '@vercel/blob';

export async function POST(request) {
  try {
    const { name, suggestion, timestamp } = await request.json();

    // Validate input
    if (!name || !suggestion || !timestamp) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the suggestion entry
    const suggestionEntry = `[${timestamp}] ${name}: ${suggestion}\n`;

    // Check if file exists
    let existingContent = '';
    try {
      const { blobs } = await list({
        prefix: 'suggestions/suggestions.txt',
      });

      if (blobs.length > 0) {
        const response = await fetch(blobs[0].url);
        existingContent = await response.text();
      }
    } catch (error) {
      // File doesn't exist yet, start with empty content
      existingContent = '';
    }

    // Append new suggestion to existing content
    const newContent = existingContent + suggestionEntry;

    // Save to blob storage
    const blob = await put('suggestions/suggestions.txt', newContent, {
      access: 'public',
      addRandomSuffix: false,
    });

    return Response.json({
      success: true,
      message: 'Suggestion saved successfully',
      url: blob.url
    });

  } catch (error) {
    console.error('Error saving suggestion:', error);
    return Response.json(
      { error: 'Failed to save suggestion' },
      { status: 500 }
    );
  }
}
