const normalizedSkills = {
  "Javascript": "Javascript",
  "Ruby" : "Ruby",
  "Java" : "Java",
  "Software" : "Software",
  "Angular" : "Angular",
  "React" : "React", 
  "Vue" : "Vue",
  "Node" : "Node",
  "CSS" : "CSS",
  "HTML" : "HTML",
  "Bootstrap" : "Bootstrap",
  "MySQL" : "MySQL",
  "MongoDB" : "MongoDB",
  "Firebase" : "Firebase",
  "Sass" : "Sass",
  "Python" : "Python",
  "Django" : "Django",
  "Rail": "Ruby on Rails",
  "Flask" : "Flask",
};

const parseJobSkills = skills => {
  let processedSkills = skills.toLowerCase();
  let skillsArray = [];
  _.forEach(normalizedSkills, (value, key) => {
    let processedKey = key.toLowerCase();
    if (processedSkills.indexOf(processedKey) !== -1) {
      skillsArray.push(value);
    }
  })
  return skillsArray.join(", ");
}
