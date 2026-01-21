import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    // Log environment variables status (without revealing values)
    console.log('[Pilot Request API] Environment variables status:', {
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      PILOT_TO_EMAIL: !!process.env.PILOT_TO_EMAIL,
    });

    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.company || !body.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if required environment variables are configured
    if (!process.env.RESEND_API_KEY) {
      console.error('[Pilot Request API] CRITICAL: Missing RESEND_API_KEY environment variable');
      return NextResponse.json(
        { error: 'Email service not configured. Please contact support.' },
        { status: 500 }
      );
    }

    if (!process.env.PILOT_TO_EMAIL) {
      console.error('[Pilot Request API] CRITICAL: Missing PILOT_TO_EMAIL environment variable');
      return NextResponse.json(
        { error: 'Email service not configured. Please contact support.' },
        { status: 500 }
      );
    }

    const pilotToEmail = process.env.PILOT_TO_EMAIL;

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'ModlyAI <onboarding@resend.dev>',
      to: pilotToEmail,
      subject: 'New ModlyAI Pilot Request',
      html: `
        <h2>New Pilot Request</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Company:</strong> ${body.company}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('[Pilot Request API] Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    console.log('[Pilot Request API] Email sent successfully to:', pilotToEmail, 'ID:', data?.id);

    return NextResponse.json({
      success: true,
      message: 'Your request has been sent successfully!',
    });

  } catch (error) {
    console.error('[Pilot Request API] Error processing pilot request:', error);
    
    // Return a friendly error message without exposing implementation details
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
