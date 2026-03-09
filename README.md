1️⃣. Difference between var, let, and const
=>var was used in old JavaScript. It is function-scoped, can be reassigned, and can also be 
redeclared with the same name. However, in modern JavaScript we use var very rarely.

=>let is block-scoped and can be reassigned, but it cannot be redeclared in the same scope.
 We use let when we need to change the value later.

=>const is also block-scoped, but it cannot be reassigned. Once a value is assigned to const,
 it cannot be changed. Therefore, we usually use const most of the time.

2️⃣. What is the spread operator (...)?
=>The spread operator is used to expand an array or object. It allows us to copy existing data and 
add new data without modifying the original data.

3️⃣. What is the difference between map(), filter(), and forEach()?
=>map() returns a new array and allows us to modify each item in the array.

=>filter() works based on a condition. It filters the elements and returns
 a new array containing only the items that match the condition.

=>forEach() is used to loop through an array, but it does not return a new array.

4️⃣. What is an arrow function?
=>Arrow functions allow us to write cleaner, shorter, and more readable code compared to regular functions.

5️⃣. What are template literals?
=>Template literals are a modern way to write strings in JavaScript. They allow us to insert variables and expressions 
easily and also support multi-line strings.
