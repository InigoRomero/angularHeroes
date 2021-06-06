import { Component, OnInit } from '@angular/core';

import { Villain } from '../Villain';
import { villainService } from '../villains.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.css']
})
export class VillainsComponent implements OnInit {

  selectedvillain?: Villain;

  villains: Villain[] = [];

  constructor(private villainService: villainService, private messageService: MessageService) { }

  ngOnInit() {
    this.getVillains();
  }

  getVillains(): void {
    this.villainService.getVillains()
        .subscribe(villains => this.villains = villains);
  }

  add(name: string, weapon: string, description: string, heroIdHeroe2: string): void {
    name = name.trim();
    weapon = weapon.trim();
    description = description.trim();
    let heroIdHeroe =  parseInt(heroIdHeroe2, 10);
    if (!name || !weapon || !heroIdHeroe || !description) { return; }
    this.villainService.addVillain({ name, weapon, description, heroIdHeroe } as Villain)
      .subscribe(villain => {
        this.villains.push(villain);
      });
  }

  delete(villain: Villain): void {
    this.villains = this.villains.filter(h => h !== villain);
    this.villainService.deleteVillain(villain.idVillain).subscribe();
  }

}
