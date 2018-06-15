import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SectionServiceClient} from '../services/section.service.client';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private sectionService: SectionServiceClient) {

    this.route.params.subscribe(params => this.loadSections(params['courseId']));
  }

  courseId = '';
  sectionName = '';
  seats = '';
  loadSections(courseId) {
    this.courseId = courseId;
  }
  createSection(sectionName, seats) {
    this.sectionService.createSection(this.courseId, sectionName, seats);
      // .then()
  }

  ngOnInit() {
  }

}
