import { Component, OnInit } from '@angular/core';
import { ITodoStatus, TodoCardComponent } from '../../shared/components/todo-card/todo-card.component';
import { TodoService } from '../../core/services/todo.service';
import { ITodo } from '../../core/models/todo.model';
import { SlidePanelComponent } from '../../shared/ui/slide-panel/slide-panel.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoCardComponent, SlidePanelComponent, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  todos: ITodo[] = [];
  isSlidePanelOpen: boolean = false;
  todoStatus = ITodoStatus;
  todoID: number | null = null;
  filterByStatus: string = ''

  constructor(private todoService: TodoService, private formBuilder: FormBuilder) {
    this.todoForm = formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('OPEN', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.getAllTodos()
  }

  getAllTodos(): void {
    this.todoService.getAllTodo(this.filterByStatus).subscribe({
      next: (response) => {
        if (response) {
          this.todos = response.data
        }
      }
    });
  }

  onCloseSlidePanel(): void {
    this.isSlidePanelOpen = false
  }

  openSlidePanel(): void {
    this.isSlidePanelOpen = true
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      if (this.todoID) {
        this.todoService.updateTodo(this.todoID, this.todoForm.value).subscribe({
          next: (response) => {
            this.getAllTodos()
            this.onCloseSlidePanel()
          }
        })
      } else {
        this.todoService.addTodo(this.todoForm.value).subscribe({
          next: (response) => {
            this.getAllTodos()
            this.onCloseSlidePanel()
          }
        })
      }
    } else {
      this.todoForm.markAllAsTouched();
    }
  }

  onLoadTodoForm(item: ITodo): void {
    this.todoID = item.id!!;
    this.todoForm.patchValue({
      title: item.title,
      description: item.description,
      status: item.status,
    })
    this.openSlidePanel()
  }

  onFilterByStatus(status: string): void {
    this.filterByStatus = status;
    this.getAllTodos()
  }
}
