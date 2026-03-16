const questions = {

easy:[
{
question:"Print numbers from 1 to 10",

solution:{
javascript:`for(let i=1;i<=10;i++){ console.log(i); }`,
python:`for i in range(1,11): print(i)`,
cpp:`for(int i=1;i<=10;i++){ cout<<i; }`,
java:`for(int i=1;i<=10;i++){ System.out.println(i); }`
}
},

{
question:"Find sum of two numbers",

solution:{
javascript:`function sum(a,b){ return a+b }`,
python:`def sum(a,b): return a+b`,
cpp:`int sum(int a,int b){ return a+b; }`,
java:`int sum(int a,int b){ return a+b; }`
}
}

],

medium:[

{
question:"Check palindrome string",

solution:{
javascript:`let s="madam";
let r=s.split("").reverse().join("");
console.log(s===r);`,

python:`s="madam"
print(s==s[::-1])`,

cpp:`string s="madam";
string r=s;
reverse(r.begin(),r.end());
cout<<(s==r);`,

java:`String s="madam";
String r=new StringBuilder(s).reverse().toString();
System.out.println(s.equals(r));`
}

}

],

hard:[

{
question:"Factorial using recursion",

solution:{
javascript:`function fact(n){
if(n==0)return 1;
return n*fact(n-1);
}`,

python:`def fact(n):
 if n==0:
  return 1
 return n*fact(n-1)`,

cpp:`int fact(int n){
if(n==0) return 1;
return n*fact(n-1);
}`,

java:`int fact(int n){
if(n==0) return 1;
return n*fact(n-1);
}`
}

}

]

}

let currentSolution="";

function getQuestion(){

const diff=document.getElementById("difficulty").value;

const list=questions[diff];

const q=list[Math.floor(Math.random()*list.length)];

document.getElementById("question").innerText=q.question;

currentSolution=q.solution;

document.getElementById("solution").style.display="none";

}

function showSolution(){

const lang=document.getElementById("language").value;

const box=document.getElementById("solution");

box.style.display="block";

box.innerText=currentSolution[lang];

}

function runCode(){

const code=document.getElementById("editor").value;

document.getElementById("output").innerText=
"Demo Mode Output\n\nYour code executed (simulation).";

}