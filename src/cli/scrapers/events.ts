import * as fs from 'fs';
import * as _ from 'lodash';
import * as path from 'path';
import { EventType } from '../../shared/constants/event-type';
import { Event } from '../../shared/entities/event';

let id = 1;
const events: Event[] = [];
Promise.all(
  _.range(1, 82).map(async (i: number) => {
    const paddedNum = _.padStart(i + '', 2, '0');

    await Promise.all(
      _.map([EventType.City, EventType.Road], async (type: EventType) => {
        try {
          if (type === EventType.Road && i > 69) {
            return;
          }
          const eventLetter = type === EventType.City ? 'c' : 'r';
          const eventName = type === EventType.City ? 'city' : 'road';

          const frontText: string = (await fs.promises.readFile(
            path.join(__dirname, `./ocr/${eventLetter}e-${paddedNum}-f.txt`),
            { encoding: `utf8` },
          )).replace(/(\r\n|\n|\r)/g, ' ');

          const [, flavorText, choiceA, choiceB] = frontText.match(/^(.*?)Option A[:;] (.*?)Option [BR8][:;](.*?)$/);

          const event: Event = {
            id: id++,
            type,
            number: i,
            text: flavorText.trim(),
            optionA: {
              choice: choiceA.trim(),
              outcomes: [
                {
                  text: (await fs.promises.readFile(
                    path.join(__dirname, `./ocr/${eventLetter}e-${paddedNum}-b-a.txt`),
                    {
                      encoding: `utf8`,
                    },
                  ))
                    .replace(/(\r\n|\n|\r)/g, ' ')
                    .trim(),
                  imageUrl: null,
                  loseCard: null,
                },
              ],
              imageUrl: `/assets/cards/events/base/${eventName}/${eventLetter}e-${paddedNum}-b-a.png`,
            },
            optionB: {
              choice: choiceB.trim(),
              outcomes: [
                {
                  text: (await fs.promises.readFile(
                    path.join(__dirname, `./ocr/${eventLetter}e-${paddedNum}-b-b.txt`),
                    {
                      encoding: `utf8`,
                    },
                  ))
                    .replace(/(\r\n|\n|\r)/g, ' ')
                    .trim(),
                  imageUrl: null,
                  loseCard: null,
                },
              ],
              imageUrl: `/assets/cards/events/base/${eventName}/${eventLetter}e-${paddedNum}-b-b.png`,
            },
            imageUrl: `/assets/cards/events/base/${eventName}/${eventLetter}e-${paddedNum}-f.png`,
            verified: false,
          };

          events.push(event);
        } catch (err) {
          console.error('Error on', type, paddedNum);
          // throw err;
        }
      }),
    );
  }),
)
  .then(() => {
    const str = `import { EventType } from '../shared/constants/event-type';\nimport { Event } from '../shared/entities/event';\n\nexport const events: Event[] = ${JSON.stringify(
      _.sortBy(events, event => event.type + _.padStart(event.number + '', 2, '0')),
      null,
      2,
    )}`
      .replace(/"type": "Road"/g, 'type: EventType.Road')
      .replace(/"type": "City"/g, 'type: EventType.City');
    fs.writeFileSync(path.join(__dirname, '../../data/events-raw.ts'), str, { encoding: 'utf8' });
  })
  .catch(err => {
    console.error(err);
    console.log(events);
  });

// max road: 81
// max road: 69
