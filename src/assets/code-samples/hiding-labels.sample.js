import { GithubBoardOptions } from '@luizppa/ng-github-contributions';

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
