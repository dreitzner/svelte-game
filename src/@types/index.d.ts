declare interface IQuestion {
    asked: boolean;
    text: string;
}

declare interface IName {
    name: string;
    points: number;
}

declare interface ISetup {
    headline: string;
    subHeadline: string;
    addButton: string;
    startButton: string;
    players: string;
}
declare interface IGame {
    headline: string;
    button: string;
}
declare interface IWinner {
    winner: string;
    again: string;
}

declare interface ITranslation {
    questions: IQuestion[];
    setup?: ISetup;
    game?: IGame;
    winner?: IWinner;
}
