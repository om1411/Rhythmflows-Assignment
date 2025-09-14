import { Component } from '@angular/core';
import { StudentCrudComponent } from './student-crud/student-crud.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    StudentCrudComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'frontend';
}