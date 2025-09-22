//Exercice 2:
let resolveAfter2Seconds = function () {
    console.log("starting slow promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000);
    });
};

let resolveAfter1Second = function () {
    console.log("starting fast promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("fast");
            console.log("fast promise is done");
        }, 1000);
    });
};

let sequentialStart = async function () {
    console.log('==SEQUENTIAL START==');
    const slow = await resolveAfter2Seconds();
    console.log(slow);
    const fast = await resolveAfter1Second();
    console.log(fast);
}

sequentialStart()
//output:==SEQUENTIAL START== then starting slow promise
// after 2 seconds slow promise is done then slow then starting fast promise
// after 1 second fast promise is done then fast
//Exercice 3:
let resolveAfter2Seconds = function () {
    console.log("starting slow promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000);
    });
};

let resolveAfter1Second = function () {
    console.log("starting fast promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("fast");
            console.log("fast promise is done");
        }, 1000);
    });
};

let concurrentStart = async function () {
    console.log('==CONCURRENT START with await==');
    const slow = resolveAfter2Seconds();
    const fast = resolveAfter1Second();
    console.log(await slow);
    console.log(await fast);
}

setTimeout(concurrentStart, 4000)
//output:
//==CONCURRENT START with await==
//starting slow promise
//starting fast promise
//fast promise is done
//slow promise is done
//slow
//fast
 //Exercice 4:
 const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums"
];

const getData = async function() {
  try {
    const promises = urls.map(async (url) => {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('HTTP error');
      return await resp.json();
    });

    const [users, posts, albums] = await Promise.all(promises);

    console.log('users', users);
    console.log('posts', posts);
    console.log('albums', albums);

  } catch (error) {
    console.log('ooooooops');
  }
}

getData();
