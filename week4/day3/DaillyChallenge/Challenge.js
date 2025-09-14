
// Exercise: Video Class
class Video {
    constructor(title, uploader, time) {
        this.title = title;
        this.uploader = uploader;
        this.time = time; // duration in seconds
    }
    watch() {
        console.log(`${this.uploader} watched all ${this.time} seconds of ${this.title}!`);
    }
}
const video1 = new Video("JavaScript Tutorial", "Elie", 300);
video1.watch(); 
// Output: "Elie watched all 300 seconds of JavaScript Tutorial!"
const video2 = new Video("CSS Flexbox Guide", "Sara", 180);
video2.watch(); 
// Output: "Sara watched all 180 seconds of CSS Flexbox Guide!"
// Bonus:
const videoData = [
    { title: "React Basics", uploader: "John", time: 240 },
    { title: "Node.js Intro", uploader: "Mary", time: 360 },
    { title: "HTML Semantics", uploader: "Mike", time: 120 },
    { title: "Python Functions", uploader: "Anna", time: 300 },
    { title: "JavaScript Arrays", uploader: "David", time: 200 }
];

const videos = videoData.map(data => new Video(data.title, data.uploader, data.time));

videos.forEach(video => video.watch());
// Output:
// John watched all 240 seconds of React Basics!
// Mary watched all 360 seconds of Node.js Intro!
// Mike watched all 120 seconds of HTML Semantics!
// Anna watched all 300 seconds of Python Functions!
// David watched all 200 seconds of JavaScript Arrays!
