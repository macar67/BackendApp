const { NewsFeed } = require('./../models/newsFeed.model');
const { Post } = require('./../models/post.model');

module.exports.addNewsfeed = async(req, res) => {

    req.body.members = [req.user._id]
    const news = new NewsFeed(req.body)

    try {
        await news.save()
        res.status(201).send(news)
    } catch (e) {
        res.status(400).send(e)
    }
}
module.exports.allNews = async(req, res) => {

    try {
        console.log(req.user._id);

        const news = await NewsFeed.find({})


        res.status(200).send(news)

    } catch (e) {

        res.status(500).send(e)

    }

}

module.exports.removePost = async(req, res) => {

    try {

        await Post.findByIdAndRemove(req.params.postid);
        const newsfeed = await NewsFeed.findByIdAndUpdate(req.params.postid, { $pull: { posts: req.params.postid } }, { new: true });

        res.send(newsfeed);
    } catch (e) {
        res.status(500).send()
    }

}

/*
module.exports.deleteNews = async(req, res) => {

    try {

        console.log(req.user);

        // await req.user.currentTeam.remove()
        //     // await req.user.remove()
        //     // console.log("***********************************");
        // console.log(req.user.currentTeam);
        // res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }

}*/