// Method 1
let sum_to_n_a = function (n) {
  // your code here
  let sum = 0;
  for (let i = 0; i < n + 1; i++) {
    sum += i;
  }
  console.log("Implementation 1: for loop:", sum);
};

// Method 2
let sum_to_n_b = function (n) {
  // your code here
  let array = [];
  for (let i = 0; i < n + 1; i++) {
    array[i] = i;
  }
  const sum = array.reduce((total, current) => total + current, 0);
  console.log("Implementation 2: reduce prototype:", sum);
};

// Method 3
let sum_to_n_c = function (n) {
  // your code here
  let array = [];
  let sum = 0;

  for (let i = 0; i < n + 1; i++) {
    array[i] = i;
  }
  array.forEach((e) => (sum += e));
  console.log("Implementation 3: forEach loop:", sum);
};

sum_to_n_a(5);
sum_to_n_b(5);
sum_to_n_c(5);
