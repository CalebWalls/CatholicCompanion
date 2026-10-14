export type MysterySet = 'Joyful' | 'Sorrowful' | 'Glorious' | 'Luminous';
export const mysteries: Record<MysterySet, string[]> = {
  Joyful: [
    'The Annunciation',
    'The Visitation',
    'The Nativity',
    'The Presentation',
    'The Finding of Jesus in the Temple',
  ],
  Sorrowful: [
    'The Agony in the Garden',
    'The Scourging at the Pillar',
    'The Crowning with Thorns',
    'The Carrying of the Cross',
    'The Crucifixion',
  ],
  Glorious: [
    'The Resurrection',
    'The Ascension',
    'The Descent of the Holy Spirit',
    'The Assumption',
    'The Coronation of Mary',
  ],
  Luminous: [
    'The Baptism of Jesus',
    'The Wedding at Cana',
    'The Proclamation of the Kingdom',
    'The Transfiguration',
    'The Institution of the Eucharist',
  ],
};

export function suggestedMysteries(day: number): MysterySet {
  return (
    [
      'Glorious',
      'Joyful',
      'Sorrowful',
      'Glorious',
      'Luminous',
      'Sorrowful',
      'Joyful',
    ] as MysterySet[]
  )[day];
}

export interface RosaryStep {
  title: string;
  text: string;
  mystery?: string;
  bead?: number;
}

const ourFather =
  'Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.';
const hailMary =
  'Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.';
const gloryBe =
  'Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.';

export function rosarySteps(set: MysterySet): RosaryStep[] {
  const steps: RosaryStep[] = [
    {
      title: 'The Sign of the Cross',
      text: 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
    },
    {
      title: 'The Apostles’ Creed',
      text: 'I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.',
    },
    { title: 'Our Father', text: ourFather },
  ];
  for (let bead = 1; bead <= 3; bead++) {
    steps.push({ title: 'Hail Mary · ' + bead + ' of 3', text: hailMary });
  }
  steps.push({ title: 'Glory Be', text: gloryBe });
  for (const mystery of mysteries[set]) {
    steps.push({
      title: 'Announce the mystery · Our Father',
      text: ourFather,
      mystery,
    });
    for (let bead = 1; bead <= 10; bead++) {
      steps.push({
        title: 'Hail Mary · ' + bead + ' of 10',
        text: hailMary,
        mystery,
        bead,
      });
    }
    steps.push({ title: 'Glory Be', text: gloryBe, mystery });
    steps.push({
      title: 'Fatima Prayer · optional',
      text: 'O my Jesus, forgive us our sins, save us from the fires of hell; lead all souls to heaven, especially those in most need of thy mercy.',
      mystery,
    });
  }
  steps.push(
    {
      title: 'Hail, Holy Queen',
      text: 'Hail, holy Queen, Mother of mercy, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.',
    },
    {
      title: 'Concluding prayer',
      text: 'Pray for us, O holy Mother of God. That we may be made worthy of the promises of Christ. O God, whose only begotten Son, by his life, death, and resurrection, has purchased for us the rewards of eternal life, grant, we beseech thee, that while meditating on these mysteries of the most holy Rosary, we may imitate what they contain and obtain what they promise, through the same Christ our Lord. Amen.',
    },
    {
      title: 'The Sign of the Cross',
      text: 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
    },
  );
  return steps;
}
