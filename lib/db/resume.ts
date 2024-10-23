import clientPromise from '@/lib/mongodb';
import { Resume } from '@/lib/types/resume';
import { ObjectId } from 'mongodb';

export async function createResume(resume: Resume) {
  try {
    const client = await clientPromise;
    const collection = client.db('resumeBuilder').collection('resumes');
    
    // Check for existing resume with same email
    const existing = await collection.findOne({
      'personalInfo.email': resume.personalInfo.email
    });
    
    if (existing) {
      throw new Error('A resume with this email already exists');
    }
    
    const result = await collection.insertOne({
      ...resume,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return { id: result.insertedId.toString(), ...resume };
  } catch (error) {
    console.error('Database Error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to create resume');
  }
}

export async function getResume(id: string) {
  try {
    const client = await clientPromise;
    const collection = client.db('resumeBuilder').collection('resumes');
    
    const resume = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!resume) {
      throw new Error('Resume not found');
    }
    
    return resume;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch resume');
  }
}

export async function updateResume(id: string, resume: Partial<Resume>) {
  try {
    const client = await clientPromise;
    const collection = client.db('resumeBuilder').collection('resumes');
    
    // If email is being updated, check for duplicates
    if (resume.personalInfo?.email) {
      const existing = await collection.findOne({
        _id: { $ne: new ObjectId(id) },
        'personalInfo.email': resume.personalInfo.email
      });
      
      if (existing) {
        throw new Error('A resume with this email already exists');
      }
    }
    
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...resume,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );
    
    if (!result) {
      throw new Error('Resume not found');
    }
    
    return result;
  } catch (error) {
    console.error('Database Error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to update resume');
  }
}

export async function deleteResume(id: string) {
  try {
    const client = await clientPromise;
    const collection = client.db('resumeBuilder').collection('resumes');
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      throw new Error('Resume not found');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete resume');
  }
}

export async function searchResumes(query: string) {
  try {
    const client = await clientPromise;
    const collection = client.db('resumeBuilder').collection('resumes');
    
    const resumes = await collection
      .find({
        $text: { $search: query }
      })
      .sort({ score: { $meta: 'textScore' } })
      .limit(10)
      .toArray();
    
    return resumes;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to search resumes');
  }
}