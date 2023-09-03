const randomData = {
    users: [
      "Lilly",
      "Jonus",
      "Samantha",
      "Billy",
      "Tom"
    ],
    thoughts: [
      "Day in the life",
      "What is everyone doing today?",
      "I'm hungry",
      "Silly billy",
      "I'm sleepy"
    ],
  };
  
  const findRandomUser = (i) => {
    return randomData.users[i];
  };
  
  const findRandomThought = (i) => {
    return randomData.thoughts[i];
  };
  
  module.exports = { findRandomThought, findRandomUser };
  