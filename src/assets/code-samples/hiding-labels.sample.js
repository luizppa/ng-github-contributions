import { GithubBoardOptions, Themes } from 'ng-github-contributions';

//...
export class MyComponent {

    //...
    
    public options: GithubBoardOptions = {
        labels: {
            showMonth: false,
            showDay: false,
        },
    };

}
