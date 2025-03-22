export interface Election {
  id: string;
  type: string;
  name: string;
  dates: {
    round: number;
    date: string;
    isDateFixed: boolean;
  }[];
  description: string;
  rounds: number;
  previousElection?: string;
  dateFixation?: string;
  modeScrutin: string;
  detailsScrutin?: string;
}

export const mockElections: Election[] = [
  {
    id: '1',
    type: 'Municipales',
    name: 'Élections municipales',
    dates: [
      { round: 1, date: '2026-03-15', isDateFixed: false }, // Using mid-March as approximate date
      { round: 2, date: '2026-03-22', isDateFixed: false }
    ],
    description: 'Élections des conseils municipaux',
    rounds: 2,
    previousElection: 'Mars et juin 2020',
    dateFixation: 'La date précise doit être communiquée aux électeurs au moins 3 mois à l\'avance.',
    modeScrutin: 'Scrutin proportionnel de liste avec prime majoritaire',
    detailsScrutin: 'Liste ayant obtenu la majorité absolue (1er tour) ou relative (2nd tour) obtient la moitié des sièges, reste réparti proportionnellement'
  },
  {
    id: '2',
    type: 'Présidentielle',
    name: 'Élection présidentielle',
    dates: [
      { round: 1, date: '2027-04-11', isDateFixed: false }, // Using mid-April as approximate date
      { round: 2, date: '2027-04-25', isDateFixed: false }
    ],
    description: 'Élection du Président de la République',
    rounds: 2,
    previousElection: 'Avril 2022',
    dateFixation: 'Sauf en cas de vacance de la présidence de la République ou d\'empêchement du Président de la République, les électeurs sont convoqués au moins 10 semaines avant la date du 1er tour de scrutin.',
    modeScrutin: 'Scrutin uninominal majoritaire à deux tours',
    detailsScrutin: 'Majorité absolue au 1er tour ou duel entre les deux premiers candidats au 2nd tour'
  },
  {
    id: '3',
    type: 'Départementales',
    name: 'Élections départementales (ou cantonales)',
    dates: [
      { round: 1, date: '2028-03-15', isDateFixed: false }, // Using mid-March as approximate date
      { round: 2, date: '2028-03-22', isDateFixed: false }
    ],
    description: 'Élections des conseillers départementaux',
    rounds: 2,
    previousElection: 'Juin 2021',
    dateFixation: 'La date précise doit être communiquée aux électeurs au moins 6 semaines à l\'avance.',
    modeScrutin: 'Scrutin binominal majoritaire à deux tours',
    detailsScrutin: 'Binômes paritaires homme-femme élus à la majorité absolue au 1er tour ou relative au 2nd tour'
  },
  {
    id: '4',
    type: 'Régionales',
    name: 'Élections régionales',
    dates: [
      { round: 1, date: '2028-03-15', isDateFixed: false }, // Using mid-March as approximate date
      { round: 2, date: '2028-03-22', isDateFixed: false }
    ],
    description: 'Élections des conseils régionaux',
    rounds: 2,
    previousElection: 'Juin 2021',
    dateFixation: 'La date précise doit être communiquée aux électeurs au moins 6 semaines à l\'avance.',
    modeScrutin: 'Scrutin proportionnel de liste à deux tours avec prime majoritaire',
    detailsScrutin: 'Liste arrivée en tête obtient un quart des sièges, reste réparti proportionnellement entre listes ayant obtenu plus de 5%'
  },
  {
    id: '5',
    type: 'Européennes',
    name: 'Élections européennes',
    dates: [
      { round: 1, date: '2029-06-15', isDateFixed: false } // Using June as per previous election
    ],
    description: 'Élection des députés européens français au Parlement européen',
    rounds: 1,
    previousElection: 'Juin 2024',
    dateFixation: 'La date précise doit être communiquée aux électeurs au moins 7 semaines à l\'avance.',
    modeScrutin: 'Scrutin proportionnel de liste à un tour',
    detailsScrutin: 'Répartition proportionnelle des sièges entre les listes ayant obtenu au moins 5% des suffrages'
  },
  {
    id: '6',
    type: 'Législatives',
    name: 'Élections législatives',
    dates: [
      { round: 1, date: '2029-06-15', isDateFixed: false }, // Using June as approximate date
      { round: 2, date: '2029-06-22', isDateFixed: false }
    ],
    description: 'Élection des députés à l\'Assemblée nationale',
    rounds: 2,
    previousElection: 'Juin et juillet 2024',
    dateFixation: 'Sauf cas de dissolution, les élections ont lieu :\n- Dans les 70 jours avant la fin du mandat de l\'Assemblée nationale précédemment élue\n- Et le 7e dimanche qui suit la publication du décret convoquant les électeurs.',
    modeScrutin: 'Scrutin uninominal majoritaire à deux tours',
    detailsScrutin: 'Majorité absolue au 1er tour ou qualifiés avec plus de 12,5% des inscrits au 2nd tour'
  }
];