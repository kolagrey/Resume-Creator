import clientPromise from '@/lib/mongodb';

export async function initializeDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db('resumeBuilder');
    const collection = db.collection('resumes');

    // Create indexes
    await collection.createIndexes([
      // Optimize queries by email (unique per user)
      {
        key: { 'personalInfo.email': 1 },
        unique: true,
        name: 'email_unique'
      },
      // Optimize sorting by creation date
      {
        key: { createdAt: -1 },
        name: 'creation_date'
      },
      // Optimize sorting by update date
      {
        key: { updatedAt: -1 },
        name: 'update_date'
      },
      // Compound index for searching resumes
      {
        key: {
          'personalInfo.firstName': 1,
          'personalInfo.lastName': 1
        },
        name: 'name_search'
      },
      // Text search across multiple fields
      {
        key: {
          'personalInfo.firstName': 'text',
          'personalInfo.lastName': 'text',
          'experience.company': 'text',
          'experience.position': 'text',
          'skills.name': 'text'
        },
        name: 'resume_search'
      }
    ]);

    console.log('Database indexes created successfully');
  } catch (error) {
    console.error('Failed to create database indexes:', error);
    throw error;
  }
}