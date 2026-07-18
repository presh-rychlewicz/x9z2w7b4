export interface GlossaryItem {
  word: string;
  partOfSpeech: string;
  definition: string;
  example: string;
}

export interface Story {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  synopsis: string;
  paragraphs: string[];
  glossary: GlossaryItem[];
  wordCount: number;
  readingTimeMin: number;
}

export const stories: Story[] = [
  {
    id: 'tortoise-hare',
    title: 'The Tortoise and the Hare',
    difficulty: 'Beginner',
    synopsis: 'A fast hare and a slow tortoise decide to have a race. A classic story about patience and hard work.',
    wordCount: 160,
    readingTimeMin: 1,
    paragraphs: [
      'Once upon a time, there was a Hare who loved to boast about how fast he could run. "I am the fastest animal in the forest," he would tell anyone who listened. The other animals were tired of his bragging.',
      'One day, the slow-moving Tortoise looked up and said, "I challenge you to a race." The Hare laughed loudly. "You? A race against me? This will be too easy!" he sneered.',
      'The next morning, the race started. The Hare sprinted ahead and was soon far out of sight. Feeling confident, he looked back and decided to take a nap under a large oak tree. "That slowpoke will take hours to get here," the Hare thought as he fell asleep.',
      'Meanwhile, the Tortoise walked slowly but steadily. He did not stop, nor did he look back. He kept his eyes on the finish line.',
      'When the Hare finally woke up, he ran as fast as he could to the finish. But to his surprise, the Tortoise had already crossed the line. The slow and steady Tortoise had won the race!'
    ],
    glossary: [
      {
        word: 'boast',
        partOfSpeech: 'verb',
        definition: 'To talk with excessive pride about oneself or one\'s achievements.',
        example: 'He liked to boast about how many goals he scored.'
      },
      {
        word: 'bragging',
        partOfSpeech: 'noun / verb',
        definition: 'Saying how good you are at something in an annoying way.',
        example: 'Stop bragging about your high grades.'
      },
      {
        word: 'challenge',
        partOfSpeech: 'verb',
        definition: 'To invite someone to compete in a game or fight.',
        example: 'I want to challenge you to a game of chess.'
      },
      {
        word: 'sprint',
        partOfSpeech: 'verb',
        definition: 'To run at full speed over a short distance.',
        example: 'The athlete had to sprint to catch up to the leader.'
      },
      {
        word: 'steadily',
        partOfSpeech: 'adverb',
        definition: 'In a regular, consistent, and even way.',
        example: 'She walked steadily up the steep hill.'
      }
    ]
  },
  {
    id: 'boy-cried-wolf',
    title: 'The Boy Who Cried Wolf',
    difficulty: 'Intermediate',
    synopsis: 'A bored young shepherd boy plays a series of tricks on his villagers. A story about the cost of lying.',
    wordCount: 220,
    readingTimeMin: 2,
    paragraphs: [
      'Once, there was a young shepherd boy who watched over a flock of sheep near a dark forest. The job was very quiet, and the boy often grew bored. To entertain himself, he decided to play a trick on the nearby villagers.',
      'He ran toward the village screaming, "Wolf! Wolf! A wolf is chasing the sheep!" The villagers dropped their tools and rushed up the hill to help him. When they arrived, there was no wolf. The boy laughed at them, and the villagers went back angry.',
      'A few days later, the boy played the same trick. "Wolf! Wolf!" he cried. Again, the villagers ran to save the sheep, only to find the boy laughing. The village elders scolded him: "Do not cry wolf when there is no wolf!"',
      'One evening, a real wolf did come out of the forest. The terrified boy ran to the village, screaming louder than ever, "Please help! A real wolf is here! Wolf! Wolf!"',
      'But this time, the villagers thought he was tricking them again. They ignored his cries. No one came to help, and the wolf carried away many of the boy\'s sheep. The boy learned a bitter lesson: nobody believes a liar, even when they tell the truth.'
    ],
    glossary: [
      {
        word: 'shepherd',
        partOfSpeech: 'noun',
        definition: 'A person whose job is to take care of sheep.',
        example: 'The shepherd guided the sheep back into the pen.'
      },
      {
        word: 'flock',
        partOfSpeech: 'noun',
        definition: 'A group of birds, sheep, or goats.',
        example: 'A large flock of sheep grazed in the green valley.'
      },
      {
        word: 'entertain',
        partOfSpeech: 'verb',
        definition: 'To provide amusement or enjoyment to someone.',
        example: 'The clown did tricks to entertain the children.'
      },
      {
        word: 'scolded',
        partOfSpeech: 'verb',
        definition: 'Angrily pointed out someone\'s mistakes or bad behavior.',
        example: 'The teacher scolded the students for talking during the exam.'
      },
      {
        word: 'ignored',
        partOfSpeech: 'verb',
        definition: 'Refused to take notice of or pay attention to someone or something.',
        example: 'He ignored the warning signs and drove into the flooded road.'
      }
    ]
  },
  {
    id: 'lion-mouse',
    title: 'The Lion and the Mouse',
    difficulty: 'Beginner',
    synopsis: 'A tiny mouse promises to help a mighty lion in exchange for his life. An inspiring tale of kindness.',
    wordCount: 180,
    readingTimeMin: 1,
    paragraphs: [
      'A mighty Lion lay sleeping in the jungle. A small Mouse accidentally ran across the Lion\'s nose, waking him up. Angry at being disturbed, the Lion placed his huge paw over the Mouse to crush him.',
      '"Please, King of the Jungle, spare my life!" cried the Mouse. "If you let me go, I promise I will help you one day." The Lion laughed at the idea of a tiny mouse helping him, but he felt generous and let the Mouse go.',
      'Some weeks later, the Lion was captured by hunters. They tied him to a tree with thick ropes while they went to search for a wagon.',
      'Hearing the Lion\'s angry roars, the Mouse ran to the spot. "Do not worry, my friend," said the Mouse. "I will free you." The Mouse began to gnaw at the thick ropes with his sharp teeth.',
      'Soon, the ropes snapped, and the Lion was free. "You laughed when I promised to help," said the Mouse. "Now you see that even a tiny mouse can help a great lion." Kindness is never wasted.'
    ],
    glossary: [
      {
        word: 'mighty',
        partOfSpeech: 'adjective',
        definition: 'Possessing great power, strength, or size.',
        example: 'A mighty wind blew the roof off the small house.'
      },
      {
        word: 'disturbed',
        partOfSpeech: 'verb',
        definition: 'Interrupted someone\'s quiet, rest, or attention.',
        example: 'The loud music disturbed my study session.'
      },
      {
        word: 'spare',
        partOfSpeech: 'verb',
        definition: 'To save someone from being hurt, killed, or punished.',
        example: 'He begged the judge to spare him from going to prison.'
      },
      {
        word: 'generous',
        partOfSpeech: 'adjective',
        definition: 'Willing to give money, help, or kindness freely.',
        example: 'The generous woman donated food to the poor.'
      },
      {
        word: 'gnaw',
        partOfSpeech: 'verb',
        definition: 'To bite or chew on something repeatedly.',
        example: 'The puppy likes to gnaw on its chew toy.'
      }
    ]
  }
];
