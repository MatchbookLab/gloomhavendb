import { trimLines } from '../server/util/strings';
import { Event } from '../shared/entities/event';
import { EventType } from '../shared/constants/event-type';

export const events: Event[] = [
  {
    number: 1,
    type: EventType.Road,
    text: trimLines(`
      "Heading out a little late, aren't you?" The guard at the wall looks at you passively. You grunt in response and head through the opened gate.

      "Nobody's gonna go looking for your corpse if you don 't return!" the guard shouts at your back.

      You ended up embarking out on the road much later than you had hoped — events in town saw to that — but as dusk settles on the horizon you feel confident that you are up to any threat you might face.

      And then begins the howling of wolves — vicious, foul beasts — and. judging from their sounds, they seem to be getting closer.
    `),
    optionA: {
      choice: `Run from the howling to safety.`,
      outcomes: [
        {
          condition: null,
          text: trimLines(`
            You pick up and run as fast as you can through the underbrush and away from the ominous sounds. They seem to be receding as you stumble headlong into some sort of thicket filled with sticky spines.

            You pull yourself out, but not before your skin is pierced in numerous places and becomes inflamed. Best to avoid this plant in the future.
          `),
          effects: [{ text: `All start scenario with {POISON}.`, requirements: null }],
          returnToDeck: true,
          imageUrl: null,
        },
      ],
    },
    optionB: {
      choice: `Let the wolves come.`,
      outcomes: [
        {
          condition: null,
          text: trimLines(`
            Confident that the wolves pose no significant threat, you stand your ground and prepare for battle. The pack comes — ragged and hungry, slowly emerging from the dark — and surrounds your party.

            There are more of them than you expected, but not enough to take you down. You suffer a bite or two, but are able to fight them off.
          `),
          effects: [{ text: `All start scenario with 3 damage.`, requirements: null }],
          returnToDeck: true,
          imageUrl: null,
        },
      ],
    },
    imageUrl: null,
    verified: false,
  },
];
