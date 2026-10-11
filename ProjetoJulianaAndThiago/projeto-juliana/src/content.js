export const content = {
  name: "Juliana",
  tagline: "Alegre, sorridente e gentil.",
  traits: {
    joy: "Uma garota muito legal, gente boa, alegre e sorridente.",
    kindness: "Gentil com as pessoas.",
    strength: "Fortinha e com postura durona às vezes.",
    delicacy: "Por trás da postura durona, existe um lado carinhoso, manhoso e que ama abraços.",
    studies: "Faz curso de Análises Clínicas."
  },
  constellation: {
    title: "Nossa história em constelação",
    intro: "Toque em uma estrela para descobrir um traço. Sempre dá para voltar.",
    overviewTitle: "Escolha uma estrela",
    overviewText: "A constelação vai mostrando pequenos detalhes da Juliana conforme você toca.",
    stars: [
      { id: "joy", title: "Alegria", text: "Uma garota muito legal, gente boa, alegre e sorridente.", x: 25, y: 28 },
      { id: "kindness", title: "Gentileza", text: "Gentil com as pessoas.", x: 75, y: 28 },
      { id: "strength", title: "Postura durona", text: "Fortinha e com postura durona às vezes.", x: 58, y: 72 },
      { id: "delicacy", title: "Lado carinhoso", text: "Por trás da postura durona, existe um lado carinhoso, manhoso e que ama abraços.", x: 28, y: 70 }
    ],
    connections: [
      { from: "joy", to: "kindness" },
      { from: "strength", to: "delicacy" },
      { from: "kindness", to: "delicacy" }
    ]
  },
  music: {
    title: "Don't Dream It's Over",
    artist: "Crowded House",
    link: ""
  },
  personalMessage: ""
};
