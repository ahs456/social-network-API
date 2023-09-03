const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { findRandomThought, findRandomUser } = require('./data')


connection.on('error', (err) => err);

connection.once('open', async () => {
        let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        console.log('Users')
        await User.deleteMany({})
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        console.log('Thoughts')
        await Thought.deleteMany({})
    }
    let users = []

    for (let i = 0; i < 5; i++) {
        const username = findRandomUser(i)
        const email = `${username}@email.com`

        users.push({
            username,
            email,
        });
    }

    await User.collection.insertMany(users)
    
    for (let i = 0; i < 5; i++) {
        const user = findRandomUser(i)

        const newThought = await Thought.insertMany({
            thoughtText: findRandomThought(i),
            userId: user.id,
            username: user,
        })

        await User.findOneAndUpdate(
            { username: user },
            { $addToSet: {thoughts: newThought} },
            { new:true }
        )
    }

    console.info('Seeding complete! 🌱');
    process.exit(0);
})