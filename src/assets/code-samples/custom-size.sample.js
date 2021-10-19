import { GithubBoardOptions } from 'ng-github-contributions';

//...
export class MyComponent {

    //...
    
    public options: GithubBoardOptions = {
        cellSize: 13,
        labels: {
            size: 12,
        },
    };

}
