const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercise', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('Connected to database'))
    .catch(err => console.log('Error: ', err));

const courseSchema = new mongoose.Schema({
    tags: [String],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        // .find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } })
        .find({ isPublished: true })
        .or([
            { price: { $gte: 15 } },
            { name: /.*by.*/i }
        ])
        .sort({ price: 1 })
        .select({ name: 1, author: 1, price: 1, tags: 1 });
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}


async function updateCourse(id) {
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jackson Kelley',
            isPublished: true,
            price: 10000
        }
    }, { new: true });
    console.log(course);
}  

async function removeCourse(id) {
    // const result = await Course.deleteMany({  });
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}
removeCourse('5eacdbe29c8cf057674ea400');
