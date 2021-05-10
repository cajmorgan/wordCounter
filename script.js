// const text = "hej hej hej jag är är är är cool cool cool cool cool"
//Selectors
let text = '';
let countWords = '';
let totalPages = document.querySelector('.pages');
let threshold = document.querySelector('.threshold');
let defaultThreshold = document.querySelector('.threshold').textContent;
const defaultPages = document.querySelector('.pages').textContent; 
const genBtn = document.querySelector('.generate');
const settingsBtn = document.querySelector('.settings');
const saveBtn = document.querySelector('.save');
const settings = document.querySelector('.settingsPop');
const loader = document.querySelector('.loaderDiv');
const totalWords = document.querySelector('.total');
const defaultWords = document.querySelector('.total').textContent;

genBtn.addEventListener('click', loadIt);

//Settings
let num = document.querySelector('.howMany').value;
threshold.textContent += " " + num;
settingsBtn.addEventListener('click', () => {
    settings.style.display = "block";
})
saveBtn.addEventListener('click', () => {
    num = document.querySelector('.howMany').value;
    if(num >= 1) {
    settings.style.display = "none";
    threshold.textContent = defaultThreshold;
    threshold.textContent += " " + num;
    console.log(num);
    }
    else {
        alert('NUMBERS LARGER THAN 1 ONLY!')
        console.log('error')
    }
})

//Algorithm 
let array = undefined;
let countOfArray = [''];
let result = '';

function loadIt() {
    
    loader.style.display = "block";
    setTimeout( () => {
        counter();
    }, 100)

}

function counter(value) {
    text = document.querySelector('#textarea').value.toLowerCase().replace(/\.|\,|\(|\)|[!@#$%^&*?=]/g,'').replace(/\s\s+|\r?\n|\r|\-/g,' ');
    if(text == "" || text == ' ' || text == '\n') {
        loader.style.display = "none";
        return alert('Put in your text!');
    }
    array = text.split(' ');

    //add counter
    totalWords.textContent = defaultWords;
    totalPages.textContent = defaultPages;
    countWords = array.length;
    totalPages.textContent += " " + (Math.round((countWords / 500) * 10) / 10);
    totalWords.textContent += " " + countWords; 
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
    loader.style.display = "none";
    document.querySelector('#textarea').scrollTop = 0;
}
 

//Change textcontent
// text.value = result;

       

