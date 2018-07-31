export  interface SoundboardMap{
  button: ButtonMap;
  soundPath: string;
}

interface ButtonMap{
  name:string ;
  color: string;
}

export const SounboardMock = [
  {
    button: {
      name: 'Kidkeo',
      color: '#3498db'

    },
    soundPath:'songs/SUPERSTARS.mp3'
  },
  {
    button: {
      name: 'Walker',
      color: '#450'

    },
    soundPath:'songs/alan.mp3'
  }
]
