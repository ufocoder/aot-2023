type Letters = {
    A: [
      '█▀█ ',
      '█▀█ ',
      '▀ ▀ ',
    ],
    B: [
      '█▀▄ ',
      '█▀▄ ',
      '▀▀  '
    ],
    C: [
      '█▀▀ ',
      '█ ░░',
      '▀▀▀ '
    ],
    E: [
      '█▀▀ ',
      '█▀▀ ',
      '▀▀▀ '
    ],
    H: [
      '█ █ ',
      '█▀█ ',
      '▀ ▀ '
    ],
    I: [
      '█ ',
      '█ ',
      '▀ '
    ],
    M: [
      '█▄░▄█ ',
      '█ ▀ █ ',
      '▀ ░░▀ '
    ],
    N: [
      '█▄░█ ',
      '█ ▀█ ',
      '▀ ░▀ '
    ],
    P: [
      '█▀█ ',
      '█▀▀ ',
      '▀ ░░'
    ],
    R: [
      '█▀█ ',
      '██▀ ',
      '▀ ▀ '
    ],
    S: [
      '█▀▀ ',
      '▀▀█ ',
      '▀▀▀ '
    ],
    T: [
      '▀█▀ ',
      '░█ ░',
      '░▀ ░'
    ],
    Y: [
      '█ █ ',
      '▀█▀ ',
      '░▀ ░'
    ],
    W: [
      '█ ░░█ ',
      '█▄▀▄█ ',
      '▀ ░ ▀ '
    ],
    ' ': [
      '░',
      '░',
      '░'
    ],
    ':': [
      '#',
      '░',
      '#'
    ],
    '*': [
      '░',
      '#',
      '░'
    ],
};
  
type UppercaseLetters = {
    'a': 'A',
    'b': 'B',
    'c': 'C',
    'd': 'D',
    'e': 'E',
    'f': 'F',
    'g': 'G',
    'h': 'H',
    'i': 'I',
    'j': 'J',
    'k': 'K',
    'l': 'L',
    'm': 'M',
    'n': 'N',
    'o': 'O',
    'p': 'P',
    'q': 'Q',
    'r': 'R',
    's': 'S',
    't': 'T',
    'u': 'U',
    'v': 'V',
    'w': 'W',
    'x': 'X',
    'y': 'Y',
    'z': 'Z'
};
  
type Alphabet = keyof Letters

type UppercaseLetter<Char extends string>
    = Char extends keyof UppercaseLetters
        ? UppercaseLetters[Char]
        : Char

type RenderLetterLine<Letter extends Alphabet, LineNumber extends number>
    = Letters[Letter][LineNumber]

type RenderLettersLine<S extends string, LineNumber extends number>
    = S extends `${infer Head}${infer Tail}`
    ? UppercaseLetter<Head> extends Alphabet
        ? `${RenderLetterLine<UppercaseLetter<Head>, LineNumber>}${RenderLettersLine<Tail, LineNumber>}`
        : ''
    : ''

type RenderLettersLines<S extends string> 
    = [RenderLettersLine<S, 0>, RenderLettersLine<S, 1>, RenderLettersLine<S, 2>]

export type ToAsciiArt<S extends string>
    = S extends `${infer T}\n${infer U}` 
    ? [...RenderLettersLines<T>, ...ToAsciiArt<U>]
    : RenderLettersLines<S>