type SantaListProtector<T> =
    T extends Function 
        ? T 
        : T extends object 
            ? { readonly [P in keyof T]: SantaListProtector<T[P]> } 
            : T
