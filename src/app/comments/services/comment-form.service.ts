import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class CommentFormService {

  constructor(private fb: FormBuilder) { }
  createCommentForm(): FormGroup {
    return this.fb.group({
      commentText: ['', []]
    })
  }
  isFormValid(form: FormGroup): boolean {
    return form.valid;
  }

  updateComment(user: string): void {

  }
  getCommentText(form: FormGroup): string {
    return form.get('commentText')?.value;
  }

  resetForm(form: FormGroup): void {
    form.reset();
  }
}
