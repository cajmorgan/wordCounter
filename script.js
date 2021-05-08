// const text = "hej hej hej jag är är är är cool cool cool cool cool"
//Selectors
let text = '';
const genBtn = document.querySelector('.generate');
const settingsBtn = document.querySelector('.settings');
const saveBtn = document.querySelector('.save');
const settings = document.querySelector('.settingsPop');
genBtn.addEventListener('click', counter);

//Settings
let num = document.querySelector('.howMany').value;
settingsBtn.addEventListener('click', () => {
    settings.style.display = "block";
})
saveBtn.addEventListener('click', () => {
    num = document.querySelector('.howMany').value;
    settings.style.display = "none";
    console.log(num);
})

//Algorithm 
let array = undefined;
let countOfArray = [''];
let result = '';


function counter(value) {
    text = document.querySelector('#textarea').value.toLowerCase().replace(/\.|\,|\(|\)|[!@#$%^&*?=]/g,'').replace(/\s\s+|\r?\n|\r/g,' ');
    array = text.split(' ');
    array.forEach(function (currentWord, index) {
    countOfArray[index] = array.filter((v) => (v === currentWord.toLowerCase())).length; 
    })
    for(i = 0; i < array.length; i++) {
        array[i] = countOfArray[i] + ' ' + array[i];
    }
    compareArrays();
} 


function compareArrays() {

    for(i = 0; i < array.length; i++) {
    if(countOfArray[i] < num) {
        countOfArray.splice(i, 1); 
        array.splice(i, 1)
        --i;
        }
    } 
    deleteDuplicates();
}

function deleteDuplicates() {
    //Gör först en loop som testar ett ord i taget i array[i] och countOfArray[i]. 
    array = array.reduce(function(a,b){
        if (a.indexOf(b) < 0 ) a.push(b);
        return a;
      },[]);
      sortIt();
}

function sortIt() {
    let sortFunction = (a, b) =>  Number((b.match(/(\d+)/g)[0])) - (Number(a.match(/(\d+)/g)[0]));
    result = array.sort(sortFunction).join('\n\n');
    document.querySelector('#textarea').value = result;
}
 

//Change textcontent
// text.value = result;

       

