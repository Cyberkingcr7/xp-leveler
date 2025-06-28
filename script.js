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

const data = JSON.parse(localStorage.getItem('userData')) || {
    username: 'suijin',
    role:'admin',
    xp: '75',
    level: 2,
    past: ['user: Call me suijin'],
}

img.src = `https://coderx-api.onrender.com/v1/canvas/coderx/profile?backgroundURL=https://i.ibb.co.com/2jMjYXK/IMG-20250103-WA0469.jpg&avatarURL=https://avatars.githubusercontent.com/u/159487561?v=4&rankName=${data.role}&rankId=0&requireExp=700&level=${data.level}&name=${data.username}&exp=18600`

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms))
}

async function getData(term) {
const prompts = `${data.past.join("\n\n")}\n\nNow, I'm saying: "${term}"\nIf I ask to be taught or quizzed, ask up to 10 questions with XP (max 100), wait for answers, give feedback; otherwise, respond normally and politely.`;

    const encodedPrompt = encodeURIComponent(prompts);
    const response = await fetch(`https://api.siputzx.my.id/api/ai/gemini?text=${encodedPrompt}&cookie=g.a000xgjZzrQfaZEtfrx6RTCW0Q2eNdm21jCoqu6_6gbIG_5BW1UqEWHMHU14F9OS04MFWXsY7gACgYKAYQSARESFQHGX2MidwdmCRTP1XVih97lZJXIcBoVAUF8yKrcN4up_gHiXrkm5wXkr5eG0076`);
    const datax = await response.json();

    p.style.color = 'white'

    const message = datax.data['response']
    let line = ''

    const words = message.split(" ")
    for (word of words){
        line += word + ' '
 p.textContent = line;
        
await sleep(100)
    }


    return datax.data['response'] ;
}

const textarea = el('#userInput')

textarea.addEventListener('input', () => {
    textarea.style.height = 'auto'; 
   
    textarea.style.height = `${textarea.scrollHeight}px`; 
});
  
btn.addEventListener('click', async function() {
    const info = textarea.value;
    const aiResponse = await getData(info);
    data.past.push(`User: ${info}\nAI: ${aiResponse}`);
    localStorage.setItem('userData', JSON.stringify(data));
    
textarea.value = ''
    console.log(data);
});


delbtn.addEventListener('click',() => {
p.textContent = 'Succesfully cleared history'
localStorage.clear(); 
console.log(data)
})