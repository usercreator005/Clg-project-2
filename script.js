const questions = {

easy:[

{
question:"Print numbers from 1 to 10",
solution:
`for(let i=1;i<=10;i++){
 console.log(i);
}`
},

{
question:"Find sum of two numbers",
solution:
`function sum(a,b){
 return a+b;
}

console.log(sum(5,3));`
},

{
question:"Check if number is even or odd",
solution:
`let n = 7;

if(n % 2 === 0){
 console.log("Even");
}else{
 console.log("Odd");
}`
},

{
question:"Find factorial of a number",
solution:
`let n = 5;
let fact = 1;

for(let i=1;i<=n;i++){
 fact *= i;
}

console.log(fact);`
},

{
question:"Reverse a string",
solution:
`let str = "hello";

let reversed = str.split("").reverse().join("");

console.log(reversed);`
},

{
question:"Find largest number in array",
solution:
`let arr = [4,8,2,10,5];

let max = arr[0];

for(let i=1;i<arr.length;i++){
 if(arr[i] > max){
  max = arr[i];
 }
}

console.log(max);`
},

{
question:"Count vowels in string",
solution:
`let str = "programming";
let count = 0;

for(let char of str){
 if("aeiou".includes(char)){
  count++;
 }
}

console.log(count);`
},

{
question:"Swap two numbers",
solution:
`let a = 5;
let b = 10;

let temp = a;
a = b;
b = temp;

console.log(a,b);`
},

{
question:"Find square of number",
solution:
`let n = 6;

console.log(n*n);`
},

{
question:"Check positive negative",
solution:
`let n = -3;

if(n>0){
 console.log("Positive");
}else{
 console.log("Negative");
}`
}

],


medium:[

{
question:"Check palindrome string",
solution:
`let str = "madam";

let reversed = str.split("").reverse().join("");

if(str === reversed){
 console.log("Palindrome");
}else{
 console.log("Not Palindrome");
}`
},

{
question:"Find second largest number in array",
solution:
`let arr = [10,5,8,20,15];

arr.sort((a,b)=>b-a);

console.log(arr[1]);`
},

{
question:"Remove duplicates from array",
solution:
`let arr = [1,2,2,3,4,4,5];

let unique = [...new Set(arr)];

console.log(unique);`
},

{
question:"Check prime number",
solution:
`let n = 7;
let prime = true;

for(let i=2;i<n;i++){
 if(n%i===0){
  prime=false;
 }
}

console.log(prime ? "Prime" : "Not Prime");`
},

{
question:"Fibonacci series",
solution:
`let n = 10;

let a = 0;
let b = 1;

for(let i=0;i<n;i++){
 console.log(a);
 let temp = a+b;
 a = b;
 b = temp;
}`
},

{
question:"Merge two arrays",
solution:
`let a = [1,2,3];
let b = [4,5,6];

let merged = a.concat(b);

console.log(merged);`
},

{
question:"Find missing number in array",
solution:
`let arr=[1,2,3,5];

let n=5;

let total=n*(n+1)/2;

let sum=arr.reduce((a,b)=>a+b,0);

console.log(total-sum);`
},

{
question:"Find frequency of elements",
solution:
`let arr=[1,2,2,3,3,3];

let freq={};

for(let num of arr){

freq[num]=(freq[num]||0)+1;

}

console.log(freq);`
}

],


hard:[

{
question:"Factorial using recursion",
solution:
`function factorial(n){

if(n===0){
 return 1;
}

return n * factorial(n-1);

}

console.log(factorial(5));`
},

{
question:"Binary search algorithm",
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
},

{
question:"Reverse linked list (conceptual)",
solution:
`function reverseList(head){

let prev=null;
let curr=head;

while(curr){

let next=curr.next;

curr.next=prev;

prev=curr;

curr=next;

}

return prev;

}`
},

{
question:"Longest substring without repeating characters",
solution:
`function longestSubstring(s){

let set=new Set();

let left=0;

let max=0;

for(let right=0;right<s.length;right++){

while(set.has(s[right])){

set.delete(s[left]);

left++;

}

set.add(s[right]);

max=Math.max(max,right-left+1);

}

return max;

}

console.log(longestSubstring("abcabcbb"));`
}

]

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

document.getElementById("solution").innerText=currentSolution

}
