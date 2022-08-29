import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  // adds new task to html list
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.taskService.addTask({ name } as Task).subscribe(task => {
      this.tasks.push(task);
    });
  }

  // delete task from html list
  delete(task: Task): void {
    this.tasks = this.tasks.filter(h => h !== task);
    this.taskService.deleteTask(task.id).subscribe();
  }

}