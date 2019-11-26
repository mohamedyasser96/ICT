import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  modal = false;
  clrModalOpen = 'false'
  currentBu = ''
  content = ''
  businessUnits = {}

  ngOnInit() {
    this.getBUs()
  }


  async getBUs() {
    await this.http.get('assets/dummy.json', { responseType: 'json' })
      .subscribe(res => {
        this.businessUnits = res
      })
  }

  openModal(name) {
    this.currentBu = name
    this.content = this.businessUnits[name]
    this.modal = true
  }

  closeModal() {
    this.modal = false
  }

}
