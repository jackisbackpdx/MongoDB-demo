const mongoose = require('mongoose');

// Give a path to connect to the database, should be able to change dynamically based on production environment
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB...', err));


// The document schema sets the structure that the document abides by, along with the given types for the values
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

// Gives name of item and the schema that it must meet
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Jackson',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    // once it gets to the database, save the object as a document, asynchronously
    const result = await course.save();
    console.log(result);
}


async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;
    // Comparison Operators                             Logical Operators
    // eq (equal)                                           or
    // ne (not eqaul)                                       and
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)
    const courses = await Course

        .find({ author: 'Jackson', isPublished: true })     // .find() conditions to return document if met
        // .find({ price: { $gte: 10, $lte: 20 } })         will find documents that have prices that are greater than 10 or less than 20
        // .find({ price: { $in: [10, 15, 20] } })          will documents that have prices that are contained in the array
        // .find({ author: /^Mosh/ig })                     will filter authors that have the given regex
        // .or([{ author: 'Jackson' }, { isPublished: true }])
        .skip((pageNumber - 1) * pageSize)                                             // .limit() limit of how many documents to return
        .limit(pageSize)
        .sort({ name: 1 })                                  // .sort() 1 for acending and -1 for decending
        // .select({ name: 1, tags: 1 });                   // .select() keys to include in return
        .count();                                           // counts the documents
    console.log(courses);
}
getCourses();