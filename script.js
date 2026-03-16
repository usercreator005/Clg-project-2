const questions={

easy:[],
medium:[],
hard:[]

}

/* EASY QUESTIONS */

for(let i=1;i<=50;i++){

questions.easy.push({

question:`Easy ${i}: Print numbers from 1 to 10`,

solution:
`for(let i=1;i<=10;i++){
 console.log(i);
}`

})

questions.easy.push({

question:`Easy ${i}: Find square of a number`,

solution:
`let n=5;

console.log(n*n);`

})

}

/* MEDIUM QUESTIONS */

for(let i=1;i<=40;i++){

questions.medium.push({

question:`Medium ${i}: Reverse a string`,

solution:
`let str="hello";

let reversed=str.split("").reverse().join("");

console.log(reversed);`

})

questions.medium.push({

question:`Medium ${i}: Check palindrome string`,

solution:
`let str="madam";

let rev=str.split("").reverse().join("");

if(str===rev){

 console.log("Palindrome");

}else{

 console.log("Not Palindrome");

}`

})

}

/* HARD QUESTIONS */

for(let i=1;i<=30;i++){

questions.hard.push({

question:`Hard ${i}: Factorial using recursion`,

solution:
`function factorial(n){

if(n===0){

 return 1;

}

return n*factorial(n-1);

}

console.log(factorial(5));`

})

questions.hard.push({

question:`Hard ${i}: Binary Search Algorithm`,

solution:
`function binarySearch(arr,target){

let left=0;
let right=arr.length-1;

while(left<=right){

let mid=Math.floor((left+right)/2);

if(arr[mid]===target){

 return mid;

}

if(arr[mid]<target){

 left=mid+1;

}else{

 right=mid-1;

}

}

return -1;

}

console.log(binarySearch([1,2,3,4,5],4));`

})

}

let currentSolution=""

function getQuestion(){

const diff=document.getElementById("difficulty").value

const list=questions[diff]

const q=list[Math.floor(Math.random()*list.length)]

document.getElementById("question").innerText=q.question

currentSolution=q.solution

document.getElementById("solution").innerText=""

}

function showSolution(){

if(currentSolution===""){

document.getElementById("solution").innerText="⚠️ Please generate a question first."

return

}

document.getElementById("solution").innerText=currentSolution

 }
