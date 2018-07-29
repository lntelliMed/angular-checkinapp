import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  data: any;
  checkInResponse:any;

  constructor(private route:Router, private router:ActivatedRoute, private service:DataService) { }

  ngOnInit() {
    const id = Number.parseInt(this.router.snapshot.paramMap.get('id'));
    this.service.getReservation(id).subscribe(res => {
      this.data = res;
    });
  }

  checkin(noOfBags) {
    const checkInRequest:any = new Object();
    checkInRequest.id = this.data.id;
    checkInRequest.checkedIn = true;
    checkInRequest.numberOfBags = noOfBags;

    this.service.checkin(checkInRequest).subscribe(res => {
      this.checkInResponse = res;
    });
    this.route.navigate(['/confirm']);
  }

}
