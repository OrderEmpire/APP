let ExpToLevelUp = 10;
let currentExp = 0;
let level = 0;
let FatiguePoint = 0;
let statPoints = [0, 0, 0, 0, 0, 0];
let AvailablePoints = 0;

const getUserName = (username) => {
    username = prompt("Welcome Hunter, What's your gy- err I mean name, your name? (Please don't skip)"); 
    if (username != null) {
        let nameId = document.getElementById('UserName');
        if (nameId.textContent.includes('Unknown')) {
            nameId.textContent = nameId.textContent.replace('Unknown', `${username}`);
        };
    }
}

getUserName();

const QuestComplete = () => {
    const [TaskOne, TaskTwo, TaskThree, TaskFour] = document.querySelectorAll("#MainTask p");
    const [RepsOne, RepsTwo, RepsThree, RepsFour] = document.querySelectorAll("#RepsTask p");
    const [Cb1, Cb2, Cb3, Cb4] = document.querySelectorAll('.checkbox-column input[type="checkbox"]');
    const checkboxes = [Cb1, Cb2, Cb3, Cb4];
    const tasks = [TaskOne, TaskTwo, TaskThree, TaskFour];
    const reps = [RepsOne, RepsTwo, RepsThree, RepsFour];

    const repsValue = (i) => {
        const repsData = ['100', '100', '100', '10', '1'];
        return repsData[i];
    }

    checkboxes.forEach((cb, i) => {
        cb.removeEventListener('change', cb.listener);

        cb.listener = () => {
            const task = tasks[i];
            const rep = reps[i];
           
            if (cb.checked) {
                task.style.color = rep.style.color = 'gray';
                task.style.textDecoration = rep.style.textDecoration = 'line-through';
                currentExp += 4;

                if (rep.textContent.includes('[0/')) {
                    rep.textContent = rep.textContent.replace('[0/', `[${repsValue(i)}/`);
                }

            } else {
                task.style.color = rep.style.color = 'white';
                task.style.textDecoration = rep.style.textDecoration = 'none';
                rep.textContent = rep.textContent.replace(`[${repsValue(i)}/`, '[0/');
                if (currentExp == 0) {
                    currentExp = 0;
                } else {
                    currentExp -= 4;
                }
            }
            LevelSystem();
        };
        cb.addEventListener('change', cb.listener);
    });
};


const LevelSystem = () => {
    while (currentExp >= ExpToLevelUp) {
        currentExp -= ExpToLevelUp;  
        level++;
        AvailablePoints = level * 2;
        ExpToLevelUp += 10;  
    }

    
    const progressBarWidth = (currentExp / ExpToLevelUp) * 100;
    document.getElementById('innerExpBar').style.width = progressBarWidth + "%";
    document.getElementById('LevelNew').textContent = level;
    document.getElementById('AvailablePoints').textContent = AvailablePoints;
    document.getElementById('ExpInfo').textContent = `${currentExp} / ${ExpToLevelUp} EXP`;
    titleSystem();
};

const titleSystem = () => {
    const title = ['E-Rank Hunter', 'D-Rank Hunter', 'C-Rank Hunter', 'B-Rank Hunter', 'A-Rank Hunter', 'S-Rank Hunter', 'Nightfang Hunter', 'Apex Predator', 'Mythic Huntsman', 'G.O.D'];
    const getTitleId = document.getElementById('titleId');
    const titleIndex = Math.floor(level / 10);
   
    if (titleIndex < title.length) {
        getTitleId.textContent = title[titleIndex];
    } else {
        getTitleId.textContent = title[title.length - 1];  
    }
};

const addSkillPoint = (I) => {
    if (AvailablePoints > 0) {
        statPoints[I]++;    
        AvailablePoints--;
        ChangeSkillPoint();
    } else {
        alert("More points is required. Go work for it.");
    };
};

const ChangeSkillPoint = () => {
    const statPointUI = document.querySelectorAll("#StatNum p");
    statPoints.forEach((arr, i) => {
        statPointUI[i].textContent = arr;
    });

    const availablePointUI = document.getElementById("AvailablePoints");
    availablePointUI.textContent = AvailablePoints;
};
