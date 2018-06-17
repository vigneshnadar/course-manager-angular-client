export class SectionServiceClient {

  SECTION_URL = 'http://localhost:4000/api/course/COURSEID/section'


  enrollStudentInSection(sectionId){
      const url = 'http://localhost:4000/api/section/' + sectionId + '/enrollment';

    return fetch(url , {
      method: 'POST',
      credentials: 'include'
    });
  }

  findSectionsForCourse(courseId) {
   return fetch(this.SECTION_URL.replace('COURSEID', courseId))
     .then(response => response.json());
  }
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
