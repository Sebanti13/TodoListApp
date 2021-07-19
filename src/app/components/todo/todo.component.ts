import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/shared/todo.service';
import ITodo from './todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  allTodoItems: ITodo[];
  completedList: ITodo[];
  pendingList: ITodo[];
  errorMsg: string;
  itemData: string;
  filteredItems: ITodo[];
  searchTerm: string = '';
  private counter: number = 0
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getItems()
      .subscribe({
        next: data => {
          this.allTodoItems = data || [];
          this.filteredItems = this.allTodoItems;          
          this.counter = this.filteredItems.length + 1;
          this.computeCompleteAndPendingList();
        },
        error: err => console.error('errorrrrr : ', err)
      })
  }
  computeCompleteAndPendingList(){
    this.completedList = this.filteredItems.filter(ele => ele.complete)
    this.pendingList = this.filteredItems.filter(ele => !ele.complete)
  }
  getAll() {
    this.todoService.getItems()
      .subscribe({
        next: data => {
          this.allTodoItems = data || [];
          this.filter();
          this.computeCompleteAndPendingList();
        },
        error: err => console.error('Error fetching data : ', err)
      })
  }
  addItem() {
    const entry: ITodo = {
      id: this.counter++,
      todoContent: this.itemData,
      complete: false
    }
    this.todoService.addItem(entry)
      .subscribe({
        next: () => { this.getAll() }
      })
  }
  updateItem(item: ITodo, state: boolean) {
    item.complete = !state;
    this.todoService.updateItem(item)
      .subscribe({
        next: () => { this.getAll() }
      })
  }
  deleteItem(item: ITodo) {
    this.todoService.deleteItem(item)
      .subscribe({
        next: () => { this.getAll() }
      })
  }
  hasMatch(term, regex) {
    return term && regex.test(term)
  }
  filter() {
    const regex = new RegExp(this.searchTerm, 'i');
    this.filteredItems = this.allTodoItems.filter(({ todoContent }) => {
      return this.hasMatch(todoContent, regex)
    });
    this.computeCompleteAndPendingList();
  }
}
