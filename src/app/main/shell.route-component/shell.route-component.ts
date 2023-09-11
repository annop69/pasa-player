import { Component } from '@angular/core';
import { Subscription } from "rxjs";
import { NavigationEnd, Router, Params, Scroll } from '@angular/router';
import { SessionLoggerService } from 'src/app/providers/session-logger-service';
@Component({
  selector: 'app-shell.route-component',
  templateUrl: './shell.route-component.html',
  styleUrls: ['./shell.route-component.scss']
})
export class ShellRouteComponent {
  id: string = '';
  employeeInfo: any;
  dataRouteEvents!: Subscription;
  paramRouteEvents!: Subscription;
  currentLinkIndex: number;
  eventsRouteEvents!: Subscription;
  links: any[];

  constructor(private router: Router,
              private sl: SessionLoggerService){

    this.employeeInfo = this.sl.currentUser 

    this.links = [{
      index: 0,
      link: '/',
      name: 'Value Creator'
    },
    {
      index: 1,
      link: '/people-developer',
      name: 'People Developer'
    },
    {
      index: 2,
      link: '/business-operator',
      name: 'Business Operator'
    },
    {
      index: 3,
      link: '/performance-factor',
      name: 'Other Performance Factor'
    },
    {
      index: 4,
      link: '/strength-accomplishment',
      name: 'Strength/Accomplishment'
    },
    {
      index: 5,
      link: '/comment-feedback',
      name: 'Comments/Feedback'
    }];

    this.eventsRouteEvents = this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        let stringData = event.url.substring(1).split('/');
        if(stringData[0] == ''){
          this.currentLinkIndex = 0;
        }
        else{
          for(let x = 0; x < this.links.length; x++){
            if(stringData[0] == this.links[x].link.substring(1)){
              this.currentLinkIndex = this.links[x].index;
              break;
            }
          }
        }
      }
      else if(event instanceof Scroll){
        let stringData = event.routerEvent.url.substring(1).split('/');
        if(stringData[0] == ''){
          this.currentLinkIndex = 0;
        }
        else{
          for(let x = 0; x < this.links.length; x++){
            if(stringData[0] == this.links[x].link.substring(1)){
              this.currentLinkIndex = this.links[x].index;
              break;
            }
          }
        }
      }
    })
  }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    location.reload();
  }

  onClickLink(data: any){
    for(let x = 0; x < this.links.length; x++){
      if(this.links[x].index == data.index){
        this.router.navigate([`/${this.links[x].link}`])
        break;
      }
    }
  }

  ngDestroy(): void{
    if (typeof this.paramRouteEvents !== 'undefined')
      this.paramRouteEvents.unsubscribe();

    if (typeof this.dataRouteEvents !== 'undefined')
      this.dataRouteEvents.unsubscribe();       

    this.eventsRouteEvents.unsubscribe();     
  }
}
