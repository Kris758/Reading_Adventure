/**
 * Reading Adventure - Question Bank
 * Organized by difficulty tier (1-5) and question type.
 * Each question: { type, passage, prompt, options, answer, keySentence?, hint? }
 */

export const QUESTION_BANK = {
  // ── Tier 1: Beginner ──────────────────────────────────────
  1: [
    {
      type: 'word',
      passage: 'The word is: **CAT**',
      prompt: 'Which picture word matches "CAT"?',
      options: ['Dog', 'Cat', 'Bird', 'Fish'],
      answer: 'Cat',
      hint: 'It rhymes with "hat" and says meow!',
    },
    {
      type: 'word',
      passage: 'The word is: **SUN**',
      prompt: 'What does SUN mean?',
      options: ['A star that gives us light', 'A type of food', 'A color', 'A toy'],
      answer: 'A star that gives us light',
      hint: 'You see it in the sky during the day.',
    },
    {
      type: 'word',
      passage: 'Spell the word you hear: **DOG**',
      prompt: 'Which spelling is correct for the animal that barks?',
      options: ['DGO', 'DOG', 'ODG', 'GOD'],
      answer: 'DOG',
      hint: 'D comes first, then O, then G.',
    },
    {
      type: 'sentence',
      passage: 'The cat slept under the tree.',
      prompt: 'Where did the cat sleep?',
      options: ['On the roof', 'Under the tree', 'In the house', 'By the river'],
      answer: 'Under the tree',
      keySentence: 'The cat slept under the tree.',
      hint: 'Look for where the cat is in the sentence.',
    },
    {
      type: 'sentence',
      passage: 'Sam has a red ball. He plays in the park every day.',
      prompt: 'What color is Sam\'s ball?',
      options: ['Blue', 'Green', 'Red', 'Yellow'],
      answer: 'Red',
      keySentence: 'Sam has a red ball.',
    },
    {
      type: 'sentence',
      passage: 'My dog likes to run. He runs very fast in the yard.',
      prompt: 'What does the dog like to do?',
      options: ['Sleep', 'Eat', 'Run', 'Swim'],
      answer: 'Run',
      keySentence: 'My dog likes to run.',
    },
    {
      type: 'sentence',
      passage: 'It is raining today. Lily wears her yellow rain boots.',
      prompt: 'What is Lily wearing?',
      options: ['A hat', 'Yellow rain boots', 'A coat', 'Sandals'],
      answer: 'Yellow rain boots',
      keySentence: 'Lily wears her yellow rain boots.',
    },
    {
      type: 'word',
      passage: 'Match the word: **BIG**',
      prompt: 'Which word is the opposite of "small"?',
      options: ['Tiny', 'Big', 'Short', 'Thin'],
      answer: 'Big',
      hint: 'Think of something large, like an elephant.',
    },
    {
      type: 'passage',
      passage: 'Tom has a pet fish named Bubbles. Bubbles lives in a blue bowl on Tom\'s desk. Tom feeds Bubbles every morning before school.',
      prompt: 'What is the fish\'s name?',
      options: ['Tom', 'Bubbles', 'Blue', 'Fishy'],
      answer: 'Bubbles',
      keySentence: 'Tom has a pet fish named Bubbles.',
    },
    {
      type: 'passage',
      passage: 'Anna loves to read books. She goes to the library on Saturdays. Her favorite books are about animals.',
      prompt: 'When does Anna go to the library?',
      options: ['Mondays', 'Saturdays', 'Every day', 'Never'],
      answer: 'Saturdays',
      keySentence: 'She goes to the library on Saturdays.',
    },
  ],

  // ── Tier 2: Developing ────────────────────────────────────
  2: [
    {
      type: 'word',
      passage: 'The word is: **WHISPER**',
      prompt: 'What does "whisper" mean?',
      options: ['To talk very loudly', 'To talk very quietly', 'To sing', 'To shout'],
      answer: 'To talk very quietly',
      hint: 'Libraries are a place where people do this.',
    },
    {
      type: 'sentence',
      passage: 'The brave knight rode his horse through the dark forest at midnight.',
      prompt: 'When did the knight ride through the forest?',
      options: ['At noon', 'At midnight', 'In the morning', 'At sunset'],
      answer: 'At midnight',
      keySentence: 'The brave knight rode his horse through the dark forest at midnight.',
    },
    {
      type: 'passage',
      passage: 'Mia planted seeds in her garden in the spring. By summer, bright sunflowers grew taller than Mia! She picked one and gave it to her grandmother.',
      prompt: 'What grew in Mia\'s garden?',
      options: ['Tomatoes', 'Sunflowers', 'Carrots', 'Roses'],
      answer: 'Sunflowers',
      keySentence: 'By summer, bright sunflowers grew taller than Mia!',
    },
    {
      type: 'passage',
      passage: 'Jake\'s team won the soccer game 3 to 1. Jake scored two goals. His teammates cheered and lifted him on their shoulders.',
      prompt: 'How many goals did Jake score?',
      options: ['One', 'Two', 'Three', 'None'],
      answer: 'Two',
      keySentence: 'Jake scored two goals.',
    },
    {
      type: 'context',
      passage: 'The puppy was so **frisky** that it jumped on everyone and wagged its tail nonstop.',
      prompt: 'What does "frisky" most likely mean?',
      options: ['Sleepy and tired', 'Playful and energetic', 'Scared and quiet', 'Hungry and sad'],
      answer: 'Playful and energetic',
      hint: 'Look at what the puppy is doing — jumping and wagging its tail.',
      keySentence: 'The puppy was so frisky that it jumped on everyone and wagged its tail nonstop.',
    },
    {
      type: 'context',
      passage: 'The old bridge was **rickety**. Every step made it creak and shake.',
      prompt: 'What does "rickety" mean?',
      options: ['Strong and new', 'Shaky and unstable', 'Beautiful and tall', 'Wide and flat'],
      answer: 'Shaky and unstable',
      hint: 'The bridge creaks and shakes when you walk on it.',
    },
    {
      type: 'detective',
      passage: 'Emma forgot her lunch at home. Her friend Sofia shared half of her sandwich and an apple. Emma thanked Sofia with a big hug.',
      prompt: 'Find the evidence: Who helped Emma?',
      options: ['Emma\'s mom', 'Sofia', 'The teacher', 'Nobody'],
      answer: 'Sofia',
      keySentence: 'Her friend Sofia shared half of her sandwich and an apple.',
    },
    {
      type: 'inference',
      passage: 'Dark clouds filled the sky. People opened umbrellas and ran for cover. Thunder rumbled in the distance.',
      prompt: 'What is most likely about to happen?',
      options: ['A sunny day', 'It will rain', 'It will snow', 'A rainbow will appear'],
      answer: 'It will rain',
      hint: 'Dark clouds and umbrellas are clues about the weather.',
    },
    {
      type: 'passage',
      passage: 'The museum was quiet except for the soft footsteps of visitors. Paintings hung on every wall. A guide whispered facts about each artwork.',
      prompt: 'Why did the guide whisper?',
      options: ['She was tired', 'Museums are quiet places', 'She was angry', 'Nobody was listening'],
      answer: 'Museums are quiet places',
      keySentence: 'The museum was quiet except for the soft footsteps of visitors.',
    },
    {
      type: 'word',
      passage: 'The word is: **GIGANTIC**',
      prompt: 'Which word means the same as "gigantic"?',
      options: ['Tiny', 'Huge', 'Fast', 'Old'],
      answer: 'Huge',
      hint: 'Think of something very, very big.',
    },
  ],

  // ── Tier 3: Intermediate ──────────────────────────────────
  3: [
    {
      type: 'passage',
      passage: 'Captain Reed studied the old map carefully. An X marked a spot near Skeleton Island. His crew prepared the ship for a long voyage across rough seas.',
      prompt: 'What did the X on the map represent?',
      options: ['The ship\'s home port', 'A treasure location', 'A dangerous storm', 'The captain\'s name'],
      answer: 'A treasure location',
      keySentence: 'An X marked a spot near Skeleton Island.',
      hint: 'Pirate maps often use X to mark something special.',
    },
    {
      type: 'context',
      passage: 'The explorer had to **navigate** through the thick jungle using only a compass and the stars.',
      prompt: 'What does "navigate" mean in this sentence?',
      options: ['To find the way', 'To sleep outside', 'To cut down trees', 'To write a journal'],
      answer: 'To find the way',
      keySentence: 'The explorer had to navigate through the thick jungle using only a compass and the stars.',
    },
    {
      type: 'detective',
      passage: 'Scientists at the space station noticed a strange signal from Mars. They worked through the night analyzing the data. By morning, they confirmed it came from an ancient probe.',
      prompt: 'What evidence shows the signal was not from aliens?',
      options: ['They worked at night', 'It came from an ancient probe', 'It was from Mars', 'Scientists noticed it'],
      answer: 'It came from an ancient probe',
      keySentence: 'By morning, they confirmed it came from an ancient probe.',
    },
    {
      type: 'inference',
      passage: 'Lena packed her swimsuit, sunscreen, and beach towel. She could hardly sleep the night before the trip.',
      prompt: 'Where is Lena most likely going?',
      options: ['The mountains', 'The beach', 'The library', 'The grocery store'],
      answer: 'The beach',
      hint: 'Swimsuit, sunscreen, and beach towel are big clues!',
    },
    {
      type: 'passage',
      passage: 'In the castle archives, Princess Elena discovered a diary from 1487. The faded ink told stories of royal feasts, secret passages, and a dragon that once guarded the tower.',
      prompt: 'When was the diary written?',
      options: ['Last year', 'In 1487', 'In the future', 'Yesterday'],
      answer: 'In 1487',
      keySentence: 'Princess Elena discovered a diary from 1487.',
    },
    {
      type: 'inference',
      passage: 'Marcus stared at his test paper. His shoulders slumped and he sighed deeply. His friend patted his back and said, "You\'ll do better next time."',
      prompt: 'How did Marcus probably feel about his test?',
      options: ['Very happy', 'Disappointed', 'Excited', 'Confused but pleased'],
      answer: 'Disappointed',
      hint: 'Slumped shoulders and a sigh usually mean someone feels down.',
    },
    {
      type: 'context',
      passage: 'The knight\'s armor was **dented** after the fierce battle, but he stood tall and proud.',
      prompt: 'What does "dented" mean?',
      options: ['Shiny and new', 'Bent or damaged', 'Very heavy', 'Made of gold'],
      answer: 'Bent or damaged',
      keySentence: 'The knight\'s armor was dented after the fierce battle.',
    },
    {
      type: 'detective',
      passage: 'The time machine whirred to life. Dr. Chen set the dial to 1776. She wanted to witness the signing of an important document that changed history forever.',
      prompt: 'Why did Dr. Chen choose the year 1776?',
      options: ['It was her birthday', 'An important document was signed then', 'The machine only goes to 1776', 'She likes that number'],
      answer: 'An important document was signed then',
      keySentence: 'She wanted to witness the signing of an important document that changed history forever.',
    },
    {
      type: 'passage',
      passage: 'The forest library\'s oldest book was bound in green leather. Its pages smelled of moss and rain. Legend said reading it aloud would make flowers bloom.',
      prompt: 'What was special about the oldest book?',
      options: ['It was written yesterday', 'Legend said reading it made flowers bloom', 'It had no pages', 'It was made of stone'],
      answer: 'Legend said reading it made flowers bloom',
      keySentence: 'Legend said reading it aloud would make flowers bloom.',
    },
    {
      type: 'word',
      passage: 'The word is: **ANCIENT**',
      prompt: 'Which sentence uses "ancient" correctly?',
      options: ['The ancient phone was brand new.', 'The ancient ruins were thousands of years old.', 'She ancient ran fast.', 'I ancient like pizza.'],
      answer: 'The ancient ruins were thousands of years old.',
      hint: 'Ancient means very, very old.',
    },
  ],

  // ── Tier 4: Advanced ──────────────────────────────────────
  4: [
    {
      type: 'inference',
      passage: 'Although the team practiced every day, they lost the championship game. Coach Martinez gathered them and said, "Your effort matters more than one score." The players nodded, knowing they had grown stronger together.',
      prompt: 'What is the main message of this passage?',
      options: ['Winning is everything', 'Effort and growth matter more than one result', 'Practice is a waste of time', 'Coaches are always angry'],
      answer: 'Effort and growth matter more than one result',
      keySentence: 'Your effort matters more than one score.',
    },
    {
      type: 'detective',
      passage: 'The detective noticed muddy footprints leading from the window to the desk. The safe was open, but nothing valuable was missing. A note on the desk read: "Thanks for the clue — I left the real treasure behind."',
      prompt: 'What evidence suggests the thief was not after money?',
      options: ['The window was open', 'Nothing valuable was missing', 'There were footprints', 'There was a note'],
      answer: 'Nothing valuable was missing',
      keySentence: 'The safe was open, but nothing valuable was missing.',
    },
    {
      type: 'context',
      passage: 'The ambassador spoke with **diplomacy**, choosing her words carefully so neither country felt offended.',
      prompt: 'What does "diplomacy" mean here?',
      options: ['Speaking carelessly', 'Handling situations tactfully and carefully', 'Speaking very loudly', 'Refusing to talk'],
      answer: 'Handling situations tactfully and carefully',
      keySentence: 'The ambassador spoke with diplomacy, choosing her words carefully so neither country felt offended.',
    },
    {
      type: 'passage',
      passage: 'Aboard the space station, Commander Vega watched Earth spin below. She had been in orbit for six months. Today, a supply ship would arrive with letters from home and fresh fruit — a rare treat.',
      prompt: 'Why would fresh fruit be a "rare treat"?',
      options: ['Fruit is illegal in space', 'Supply ships don\'t bring food', 'Fresh food is hard to get on a long space mission', 'Commander Vega dislikes fruit'],
      answer: 'Fresh food is hard to get on a long space mission',
      hint: 'She\'s been in space for six months — think about what\'s hard to get up there.',
    },
    {
      type: 'inference',
      passage: 'Every evening, Mr. Torres sat on his porch and read to the neighborhood children. When he moved away, the children started their own reading club in his honor.',
      prompt: 'What can you infer about Mr. Torres?',
      options: ['He disliked children', 'He inspired others to love reading', 'He only read scary stories', 'He never finished a book'],
      answer: 'He inspired others to love reading',
      keySentence: 'When he moved away, the children started their own reading club in his honor.',
    },
    {
      type: 'detective',
      passage: 'The castle archivist found three documents about the same battle. Document A was written by a knight. Document B was written fifty years later by a historian. Document C was a letter from a farmer who witnessed the battle.',
      prompt: 'Which document might give the most firsthand account?',
      options: ['Document A — written by a knight who fought', 'Document B — written fifty years later', 'Document C — written by a farmer who witnessed it', 'All are equally firsthand'],
      answer: 'Document C — written by a farmer who witnessed it',
      hint: 'A firsthand account comes from someone who was actually there.',
      keySentence: 'Document C was a letter from a farmer who witnessed the battle.',
    },
    {
      type: 'context',
      passage: 'The inventor\'s **ingenious** device could purify water using only sunlight and sand.',
      prompt: 'What does "ingenious" mean?',
      options: ['Broken and useless', 'Clever and creative', 'Old and outdated', 'Dangerous and scary'],
      answer: 'Clever and creative',
      hint: 'The device does something amazing with simple materials.',
    },
    {
      type: 'passage',
      passage: 'Dr. Wells activated the time machine and landed in a bustling medieval market. She carefully observed how people traded goods without modern money, using bartering instead.',
      prompt: 'What is "bartering"?',
      options: ['Using credit cards', 'Trading goods without money', 'Shopping online', 'Saving coins in a bank'],
      answer: 'Trading goods without money',
      keySentence: 'She carefully observed how people traded goods without modern money, using bartering instead.',
    },
    {
      type: 'inference',
      passage: 'The pirate captain returned to port with an empty treasure chest but a full crew laughing and singing. The villagers wondered what adventure they had survived.',
      prompt: 'Why might the crew be happy despite an empty chest?',
      options: ['They lost on purpose', 'They value the adventure and friendship over treasure', 'They forgot the treasure', 'The chest was never important'],
      answer: 'They value the adventure and friendship over treasure',
      hint: 'They\'re laughing and singing — something good happened even without treasure.',
    },
    {
      type: 'word',
      passage: 'Read carefully: **The expedition was arduous, but the team persevered through storms and steep cliffs.**',
      prompt: 'What does "arduous" mean?',
      options: ['Easy and fun', 'Difficult and tiring', 'Short and simple', 'Boring but safe'],
      answer: 'Difficult and tiring',
      keySentence: 'The expedition was arduous, but the team persevered through storms and steep cliffs.',
    },
  ],

  // ── Tier 5: Expert ────────────────────────────────────────
  5: [
    {
      type: 'inference',
      passage: 'The young author\'s first novel received mixed reviews. Some critics called it "raw and honest," while others said it "lacked polish." She placed the review clippings on her wall beside a note that read: "Keep writing."',
      prompt: 'What attitude does the author show toward criticism?',
      options: ['She gives up writing', 'She uses criticism as motivation to continue', 'She ignores all feedback', 'She only reads positive reviews'],
      answer: 'She uses criticism as motivation to continue',
      keySentence: 'She placed the review clippings on her wall beside a note that read: "Keep writing."',
    },
    {
      type: 'detective',
      passage: 'Three students claimed they finished the group project alone. Student A\'s report used vocabulary far above their usual level. Student B\'s section matched a website word-for-word. Student C\'s section had handwritten notes and crossed-out drafts attached.',
      prompt: 'Which evidence best supports that Student C did their own work?',
      options: ['They claimed to finish alone', 'Handwritten notes and crossed-out drafts show a writing process', 'Their name is on the project', 'They spoke first in class'],
      answer: 'Handwritten notes and crossed-out drafts show a writing process',
      keySentence: 'Student C\'s section had handwritten notes and crossed-out drafts attached.',
    },
    {
      type: 'context',
      passage: 'The mayor\'s **equivocal** response left reporters unsure whether the park project would proceed.',
      prompt: 'What does "equivocal" mean?',
      options: ['Clear and direct', 'Unclear or ambiguous', 'Angry and loud', 'Happy and excited'],
      answer: 'Unclear or ambiguous',
      keySentence: 'The mayor\'s equivocal response left reporters unsure whether the park project would proceed.',
    },
    {
      type: 'passage',
      passage: 'In the Forest Library\'s deepest chamber, books did not contain stories — they grew them. Readers planted words like seeds, and over weeks, narratives wound through the branches like vines, changing with each new reader\'s imagination.',
      prompt: 'What is the main idea of this passage?',
      options: ['Books should stay on shelves', 'Reading is a living, creative experience that grows with the reader', 'Forests are dangerous', 'Libraries don\'t need librarians'],
      answer: 'Reading is a living, creative experience that grows with the reader',
      keySentence: 'Readers planted words like seeds, and over weeks, narratives wound through the branches like vines, changing with each new reader\'s imagination.',
    },
    {
      type: 'inference',
      passage: 'Commander Reyes chose to share the last oxygen canister with the rookie astronaut during the emergency, even though regulations suggested otherwise. Later, mission control commended her decision, citing that leadership is measured in moments of sacrifice.',
      prompt: 'What trait does Commander Reyes demonstrate?',
      options: ['Selfishness', 'Selflessness and leadership', 'Fear of rules', 'Indifference to others'],
      answer: 'Selflessness and leadership',
      keySentence: 'Commander Reyes chose to share the last oxygen canister with the rookie astronaut during the emergency.',
    },
    {
      type: 'detective',
      passage: 'Historians debated the cause of the castle\'s fall. Chronicle 1 blamed a siege. Chronicle 2 described earthquakes. Archaeological evidence showed fire damage on the outer walls but no siege weapons. A letter from the archivist mentioned "the ground shaking for three days."',
      prompt: 'Based on the evidence, what most likely caused the castle\'s fall?',
      options: ['A military siege', 'An earthquake followed by fire', 'A dragon attack', 'Abandonment without damage'],
      answer: 'An earthquake followed by fire',
      hint: 'Combine the earthquake letter with the fire damage evidence.',
      keySentence: 'Archaeological evidence showed fire damage on the outer walls but no siege weapons. A letter from the archivist mentioned "the ground shaking for three days."',
    },
    {
      type: 'context',
      passage: 'The scientist remained **skeptical** until the experiment was repeated three times with the same results.',
      prompt: 'What does "skeptical" mean?',
      options: ['Immediately believing everything', 'Doubting until there is strong proof', 'Excited and joyful', 'Confused and lost'],
      answer: 'Doubting until there is strong proof',
      keySentence: 'The scientist remained skeptical until the experiment was repeated three times with the same results.',
    },
    {
      type: 'inference',
      passage: 'When the time machine returned, Dr. Chen was older by minutes but wiser by centuries. She no longer rushed her lectures. Instead, she paused, letting each word settle like sediment in clear water.',
      prompt: 'How has time travel changed Dr. Chen?',
      options: ['She speaks faster now', 'She became more thoughtful and deliberate', 'She stopped teaching', 'She forgot everything she learned'],
      answer: 'She became more thoughtful and deliberate',
      keySentence: 'She no longer rushed her lectures. Instead, she paused, letting each word settle like sediment in clear water.',
    },
    {
      type: 'passage',
      passage: 'The pirate crew voted to donate their recovered gold to rebuild the village destroyed by the storm. The captain, surprised, smiled and said, "The greatest treasure is the story we choose to write together."',
      prompt: 'What theme does this passage express?',
      options: ['Greed is good', 'Community and kindness can be more valuable than gold', 'Pirates never share', 'Storms are good luck'],
      answer: 'Community and kindness can be more valuable than gold',
      keySentence: 'The greatest treasure is the story we choose to write together.',
    },
    {
      type: 'detective',
      passage: 'The reading competition had three finalists. Candidate A mispronounced three words but answered every comprehension question correctly. Candidate B read fluently but missed inference questions. Candidate C read slowly but explained every answer with text evidence.',
      prompt: 'Who best demonstrates true reading mastery?',
      options: ['Candidate A — perfect comprehension', 'Candidate B — fluent reading', 'Candidate C — slow but uses text evidence', 'Fluency alone is enough'],
      answer: 'Candidate C — slow but uses text evidence',
      hint: 'Reading mastery includes understanding AND supporting answers with evidence.',
      keySentence: 'Candidate C read slowly but explained every answer with text evidence.',
    },
  ],
};

/**
 * Pick questions for a level based on difficulty tier and count.
 * Shuffles and avoids immediate repeats using usedIds set.
 */
export function selectQuestions(tier, count, usedIds = new Set()) {
  const pool = QUESTION_BANK[tier] || QUESTION_BANK[1];
  const available = pool.filter((_, i) => !usedIds.has(`${tier}-${i}`));

  // If we've used all questions at this tier, reset and pull from adjacent tiers
  let source = available.length >= count ? available : [...pool];
  if (source.length < count) {
    const adjTier = tier > 1 ? QUESTION_BANK[tier - 1] : QUESTION_BANK[tier + 1];
    if (adjTier) source = [...source, ...adjTier];
  }

  const shuffled = [...source].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  // Track used question indices
  selected.forEach((q) => {
    const idx = pool.indexOf(q);
    if (idx >= 0) usedIds.add(`${tier}-${idx}`);
  });

  return { questions: selected, usedIds };
}

/**
 * Determine question count for a level (5-10 based on difficulty).
 */
export function getQuestionCount(difficultyTier, levelNum) {
  const base = 5 + Math.min(2, Math.floor(levelNum / 3));
  const tierBonus = Math.min(3, difficultyTier - 1);
  return Math.min(10, base + tierBonus);
}
