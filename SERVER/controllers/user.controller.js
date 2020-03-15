const { User } = require('./../models/user.model');

//sing un operation  -- is done 
module.exports.signUp = async(req, res) => {

    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
}


//login operetions   --is done
module.exports.login = async(req, res) => {

    try {
        console.log("login :", req.body);

        const user = await User.findByCredentials(req.body.email, req.body.password) //which parameters will be taken drom the user

        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send("There was a error while trying to save db ")
    }

}


//logout operations   -- is not finsihed
module.exports.logout = async(req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send("Successfully logged out ")
    } catch (e) {
        res.status(500).send()
    }

}

//logoutAll operations   -- is not finsihed
module.exports.logoutAll = async(req, res) => {
    //user içinden token silinmeli
    try {
        req.user.tokens = []
        await req.user.save()
        res.send("Successfully logged out from all devices")
    } catch (e) {
        res.status(500).send()
    }

}

module.exports.Users = async(req, res) => {

    try {


        const users = await User.find({});

        res.status(200).send(users)

    } catch (e) {

        res.status(500).send(e)

    }

}
module.exports.getCurrentUser = async(req, res) => {
    try {

        res.send(req.user)


    } catch (e) {
        res.status(500).send(e)
    }

}

module.exports.updateAccount = async(req, res) => {
    console.log("reqbody  ", req.body)


    const updates = Object.keys(req.body)
    console.log("updatesssssssss : ", updates);

    const allowedUpdates = ['name', 'email', 'city', 'surname', 'password', 'phoneNumber', 'birthday', 'gender', 'biography']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports.updatePassword = async(req, res) => {

}

module.exports.deleteAccount = async(req, res) => {

    try {
        console.log(req.user);

        await req.user.remove()
        console.log("***********************************");

        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }

}