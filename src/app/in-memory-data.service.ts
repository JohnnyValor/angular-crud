import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 1, name: 'Vacuum', timeToComplete: '30 minutes', description: 'Vacuum all floors', tools: 'Vacuum, outlet' },
      { id: 2, name: 'Laundry', timeToComplete: 'Eternity', description: 'Wash, dry, fold clothes', tools: 'Washer, dryer' },
      { id: 3, name: 'Mop floors', timeToComplete: '20 minutes', description: 'Mop all hard floors', tools: 'Mop, bucket'},
      { id: 4, name: 'Dishes', timeToComplete: '15 minutes', description: 'Unload, load dishwasher', tools: 'Dishwasher, detergent'},
      { id: 5, name: 'Dust', timeToComplete: '10 minutes', description: 'Dust surfaces, ceilings', tools: 'Duster'},
    ];
    return {tasks};
  }

  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 0;
  }
}