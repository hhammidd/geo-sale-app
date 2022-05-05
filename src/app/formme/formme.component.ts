import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'app-formme',
  templateUrl: './formme.component.html',
  styleUrls: ['./formme.component.css']
})
export class FormmeComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  citiesForm !: FormGroup

  ngOnInit(): void {
    this.citiesForm = this.formBuilder.group({
      no : ['', Validators.required],
      geoName: ['', Validators.required],
    })
  }

  members: {title: string, subtitle: string, content: string, url: string}[] = [
    {title: 'Electric field', subtitle: 'Subtitle', content: 'Explore Electric vehicle', url: 'assets/images/electric-vehicle.png'},
    {title: 'House info', subtitle: 'Subtitle', content: 'Explore house app', url: 'assets/images/electric-vehicle.png'},
    {title: 'Game', subtitle: 'Subtitle', content: 'Game app', url: 'assets/images/electric-vehicle.png'},
  ];
}
