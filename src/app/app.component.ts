import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Themes } from './github-contributions/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Github Contributions';
  token = environment.token;

  boardOptions = {colorPalette: Themes.purple};
}
