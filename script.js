function el(selector) {
    const element = /** @type {HTMLElement} */(document.querySelector(selector));
    if (!element) throw new Error(`Element ${selector} not found`);
    return element;
  } 

const btn = el('#btn')
const userInput = el('#userInput')
const p = el('.pa');
const img = el('.img')
const pre = el('.pr')
const delbtn = el('#delbtn')

var data = JSON.parse(localStorage.getItem('userData')) || {
    username: 'suijin',
    role:'admin',
    xp: 0,
    level: 0,
    past: ['user: Call me suijin'],
}

img.src = `https://coderx-api.onrender.com/v1/canvas/coderx/profile?backgroundURL=https://i.ibb.co.com/2jMjYXK/IMG-20250103-WA0469.jpg&avatarURL=https://avatars.githubusercontent.com/u/159487561?v=4&rankName=${data.role}&rankId=0&requireExp=700&level=1&name=${data.username}&exp=${data.xp}`

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms))
}

async function getData(term) {
const prompts = `${data.past.join("\n\n")} If I ask to learn or be quizzed, start a quiz of up to 10 questions (max 100 XP). Only give XP when a quiz is active. Say XP earned (0 if wrong) after each answer, never state XP per question, and give total XP + feedback at the end. Do not award XP or respond with XP values unless it's part of a quiz. Otherwise, respond normally.`;


    const encodedPrompt = encodeURIComponent(prompts);
    const response = await fetch(`https://api.siputzx.my.id/api/ai/gpt3?prompt=${encodedPrompt}&content=${term}`);
    const datax = await response.json();

    p.style.color = 'white'

    const message = datax.data
    let line = ''

    const words = message.split(" ")
    for (word of words){
        line += word + ' '
 p.textContent = line;
        
await sleep(100)
    }


    return datax.data ;
}

const textarea = el('#userInput')

textarea.addEventListener('input', () => {
    textarea.style.height = 'auto'; 
   
    textarea.style.height = `${textarea.scrollHeight}px`; 
});

delbtn.addEventListener('click',() => {
p.textContent = 'Succesfully cleared history'
localStorage.clear(); 
console.log(data)
})

btn.addEventListener('click', async function() {
    const info = textarea.value;
    const aiResponse = await getData(info);
    data.past.push(`User: ${info}\nAI: ${aiResponse}`);
    console.log(aiResponse)
    number = aiResponse.match(/\d+/)[0];
    data.xp += Number(number)
    localStorage.setItem('userData', JSON.stringify(data));
    img.src = `https://coderx-api.onrender.com/v1/canvas/coderx/profile?backgroundURL=https://i.ibb.co.com/2jMjYXK/IMG-20250103-WA0469.jpg&avatarURL=https://avatars.githubusercontent.com/u/159487561?v=4&rankName=${data.role}&rankId=0&requireExp=700&level=1&name=${data.username}&exp=${data.xp}`;
    console.log(data);
});
textarea.value = ''
