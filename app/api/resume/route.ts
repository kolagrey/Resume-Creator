import { NextResponse } from 'next/server';
import { resumeSchema } from '@/lib/validations/resume';
import { createResume, getResume, updateResume, deleteResume } from '@/lib/db/resume';
import { ZodError } from 'zod';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request body against schema
    const validatedData = resumeSchema.parse(body);
    
    // Create resume in database
    const resume = await createResume(validatedData);
    
    return NextResponse.json({
      message: 'Resume created successfully',
      data: resume,
    }, { status: 201 });
    
  } catch (error) {
    console.error('API Error:', error);
    
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: 'Validation error',
        details: error.errors,
      }, { status: 400 });
    }
    
    return NextResponse.json({
      error: 'Internal server error',
    }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        error: 'Resume ID is required',
      }, { status: 400 });
    }
    
    const resume = await getResume(id);
    
    return NextResponse.json({
      data: resume,
    });
    
  } catch (error) {
    console.error('API Error:', error);
    
    if (error instanceof Error && error.message === 'Resume not found') {
      return NextResponse.json({
        error: 'Resume not found',
      }, { status: 404 });
    }
    
    return NextResponse.json({
      error: 'Internal server error',
    }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        error: 'Resume ID is required',
      }, { status: 400 });
    }
    
    const body = await req.json();
    
    // Validate request body against schema
    const validatedData = resumeSchema.partial().parse(body);
    
    const resume = await updateResume(id, validatedData);
    
    return NextResponse.json({
      message: 'Resume updated successfully',
      data: resume,
    });
    
  } catch (error) {
    console.error('API Error:', error);
    
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: 'Validation error',
        details: error.errors,
      }, { status: 400 });
    }
    
    if (error instanceof Error && error.message === 'Resume not found') {
      return NextResponse.json({
        error: 'Resume not found',
      }, { status: 404 });
    }
    
    return NextResponse.json({
      error: 'Internal server error',
    }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        error: 'Resume ID is required',
      }, { status: 400 });
    }
    
    await deleteResume(id);
    
    return NextResponse.json({
      message: 'Resume deleted successfully',
    });
    
  } catch (error) {
    console.error('API Error:', error);
    
    if (error instanceof Error && error.message === 'Resume not found') {
      return NextResponse.json({
        error: 'Resume not found',
      }, { status: 404 });
    }
    
    return NextResponse.json({
      error: 'Internal server error',
    }, { status: 500 });
  }
}