//Jessica Lee 
//Student ID: 101445909
// COMP3123 Full Stack Development I - Lab 2
//ES6 Practice Exercises



//Exercise 1
// Rewrite the code block provided using ES6 syntax, ie. const, let, arrow function, template literals
//and for..of

const gretter = (myArray, counter) => {

    const greetText = 'Hello';

    for (let index = 0; index < myArray.length; index++) {

        console.log(`${greetText} ${myArray[index]}`);

    }
};

gretter(['Randy Savage', 'Ric Flair', 'Hulk Hogan'], 3);


//Exercise 2
// Using destructuring assignment syntax and the spread operator,
// write a function will capitalize the first letter of a string

const capitalize = ([firstLetter, ...rest]) => `${firstLetter.toUpperCase()}${rest.join('')}`;

console.log(capitalize('fooBar')); // FooBar
console.log(capitalize('nodeJs')); // NodeJs
