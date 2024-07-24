export interface GetPokemon {
    count:    number;
    next:     string;
    previous: null;
    results:  ResultPokemon[];
}

export interface ResultPokemon {
    name: string;
    url:  string;
}