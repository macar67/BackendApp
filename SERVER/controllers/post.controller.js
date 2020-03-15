const { Post } = require('../models/post.model');


module.exports.addPost = async(req, res) => {


    const post = new Post(req.body)

    try {
        await post.save()
        res.status(201).send(post)
    } catch (e) {
        res.status(400).send(e)
    }
}
module.exports.deletePost = async(req, res) => {

    try {

        // console.log(req.user);

        // await req.user.currentTeam.remove()
        //     // await req.user.remove()
        //     // console.log("***********************************");
        // console.log(req.user.currentTeam);
        // res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }

}
module.exports.AllPosts = async(req, res) => {

    try {


        const post = await Post.find({})


        res.status(200).send(post)

    } catch (e) {

        res.status(500).send(e)

    }

}