import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  modal = false;
  video = true
  clrModalOpen = 'false'
  currentBu = ''
  content: any
  businessUnits = {}
  inactivityTimeout:any;

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
    this.resetInactivityTimeout()
  }

  closeModal() {
    this.modal = false
    this.resetInactivityTimeout()
  }

  closeVideo(){
    this.video = false

    this.resetInactivityTimeout()
    
  }

  resetInactivityTimeout(){

    if(this.inactivityTimeout)
      clearTimeout(this.inactivityTimeout)

    this.inactivityTimeout = setTimeout(()=>{
      this.video = true
    }, 120000)
  }

}
