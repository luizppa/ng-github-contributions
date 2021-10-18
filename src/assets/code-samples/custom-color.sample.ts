import { GithubBoardOptions, Themes } from 'ng-github-contributions';

//...
export class MyComponent {

    //...
    
    public options: GithubBoardOptions = {
        colorPalette: {
            none: '#EBEDF0',
            low: '#E1846A',
            medium: '#DC4C25',
            high: '#A83B1D',
            higher: '#5C2010',
        },
    };

}
