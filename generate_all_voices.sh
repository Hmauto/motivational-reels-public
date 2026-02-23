#!/bin/bash
# Generate voiceovers for all 10 videos using ElevenLabs

API_KEY="sk_df2b717c913fe510d5c2f8d9dadf19dcc01a12b5f282f1cf"
VOICE_ID="pNInz6obpgDQGcFmaJgB"  # Adam - deep male voice

# Video 1: Just Do It
declare -a V1_SCRIPTS=(
  "Yesterday you said tomorrow."
  "Stop making excuses."
  "Your dreams won't chase themselves."
  "Just do it. Right now."
  "Make it happen."
)

# Video 2: Five Second Rule
declare -a V2_SCRIPTS=(
  "Five. Four. Three. Two. One."
  "Your brain kills ideas in five seconds."
  "Count backward. Move immediately."
  "Don't think. Just launch."
  "Change your life in five seconds."
)

# Video 3: Impossible is Nothing
declare -a V3_SCRIPTS=(
  "Impossible is just a word."
  "They told Ali he couldn't win."
  "Champions aren't made in gyms."
  "Suffer now. Live as champion forever."
  "What's your impossible?"
)

# Video 4: Rise and Grind
declare -a V4_SCRIPTS=(
  "Four AM. The world sleeps."
  "Champions rise before the sun."
  "While they sleep, you work."
  "No excuses. Only results."
  "Be the hardest worker."
)

# Video 5: Stay Hungry
declare -a V5_SCRIPTS=(
  "Stay hungry. Stay foolish."
  "Your time is limited."
  "Don't waste it living someone else's life."
  "Have the courage to follow your heart."
  "Everything else is secondary."
)

# Video 6: Embrace the Suck
declare -a V6_SCRIPTS=(
  "Life is one big mind game."
  "Callous your mind."
  "When you think you're done, you're only at forty percent."
  "Embrace the suck."
  "Become uncommon amongst uncommon."
)

# Video 7: Discipline Equals Freedom
declare -a V7_SCRIPTS=(
  "Discipline equals freedom."
  "Wake up at four thirty."
  "The only easy day was yesterday."
  "Extreme ownership."
  "Good."
)

# Video 8: Awaken the Giant
declare -a V8_SCRIPTS=(
  "Awaken the giant within."
  "Raise your standards."
  "If you do what you've always done, you'll get what you've always gotten."
  "Take massive action."
  "Live with passion."
)

# Video 9: You Owe You
declare -a V9_SCRIPTS=(
  "When you want to succeed as bad as you want to breathe, then you'll be successful."
  "You have to be willing to do what others won't."
  "Pain is temporary. Pride is forever."
  "You owe you."
  "Be phenomenal or be forgotten."
)

# Video 10: It's Possible
declare -a V10_SCRIPTS=(
  "It's not over until I win."
  "Shoot for the moon."
  "Someone's opinion of you does not have to become your reality."
  "You have greatness within you."
  "It's possible!"
)

echo "Voice scripts prepared for all 10 videos"
