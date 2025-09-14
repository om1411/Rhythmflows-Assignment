import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-crud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './student-crud.component.html',
  styleUrls: ['./student-crud.component.css']
})
export class StudentCrudComponent implements OnInit {

  studentForm: FormGroup;
  students: Student[] = [];
  selectedStudent: Student | null = null;
  isEditMode = false;

  cities = ['Mumbai', 'Pune', 'Delhi', 'Bangalore', 'Chennai'];

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.studentForm = this.fb.group({
      id: [null],
      student_name: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      birth_date: ['', Validators.required],
      is_active: [true]
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.apiService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      return;
    }
    const formData = this.studentForm.value;
    if (this.isEditMode) {
      this.apiService.updateStudent(formData).subscribe(() => {
        this.loadStudents();
        this.resetForm();
      });
    } else {
      this.apiService.addStudent(formData).subscribe(() => {
        this.loadStudents();
        this.resetForm();
      });
    }
  }

  onView(student: Student): void {
    this.selectedStudent = student;
    this.isEditMode = false;
  }

  onEdit(student: Student): void {
    this.isEditMode = true;
    this.selectedStudent = null;
    this.studentForm.setValue({
      id: student.id,
      student_name: student.student_name,
      city: student.city,
      address: student.address,
      birth_date: student.birth_date,
      is_active: student.is_active
    });
  }

  onDelete(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this student?')) {
      this.apiService.deleteStudent(id).subscribe(() => {
        this.loadStudents();
        if (this.selectedStudent?.id === id) {
          this.selectedStudent = null;
        }
      });
    }
  }

  resetForm(): void {
    this.studentForm.reset({ is_active: true });
    this.isEditMode = false;
    this.selectedStudent = null;
  }

  onCancel(): void {
    this.resetForm();
  }
}