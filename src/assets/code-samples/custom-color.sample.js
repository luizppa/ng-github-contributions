import { GithubBoardOptions, Themes } from '@luizppa/ng-github-contributions';

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

        // Or alternatively:
        // colorPalette: Themes.orange,
    };

}