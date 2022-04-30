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

}
