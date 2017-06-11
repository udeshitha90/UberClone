import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {JobService} from '../../services/job-service';
import {ReportService} from '../../services/report-service';

@Component({
  selector: 'page-job-history',
  templateUrl: 'job-history.html'
})
export class JobHistoryPage {

  // statistic
  public stats: any;
  public dv:any;
  //kk:{".GetBookingDetailAllResult":any}

  // list of records
  public records: any;

  constructor(public nav: NavController, public jobService: JobService, public reportService: ReportService) {
    // set report data
    this.stats = reportService.getAll();

    // set jobs
    this.records = jobService.getAll();
  }
  getData(){
    this.reportService.history().then((result) => {
           
            this.dv = result;
           // console.log("Histo :",this.dv.GetBookingDetailAllResult.BookingID);
        });
  }

  ionViewDidLoad(){
    this.getData();
  }

}
