import { TestBed } from '@angular/core/testing';

import { CommentFormService } from '../services/comment-form.servicem.service';

describe('CommentFormService', () => {
  let service: CommentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
