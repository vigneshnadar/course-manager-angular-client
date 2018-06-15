export class SectionServiceClient {

  SECTION_URL = 'http://localhost:4000/api/course/COURSEID/section'

  createSection(courseId, name, seats) {
    const section = { courseId, name, seats};

    return fetch(this.SECTION_URL.replace('COURSEID', courseId) , {
      method: 'POST',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type' : 'application/json'
      }
    });
  }
}
